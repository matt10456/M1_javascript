window.addEventListener("load", init);

var canvas, ctx, h, w;
var player1, player2;
var score1 = 0;
var score2 = 0;
var numberOfPlayers = 2;
var tabBalls = [];
var tabPadd = [];
var tabObstacles = [];
var etat = 0;
var lifes = 100;
// vars for handling inputs
var inputStates = {};
var socket;
var posPaddle1;
var posPaddle2;
var requestCount = 0;
var me;
var level = 1;

// init function.
function init() {
	// called by the init listener.
    // syntax : css3 selector
	canvas = document.querySelector("#canvas");
	ctx = canvas.getContext("2d"); // get 2D contex.
	menu = document.querySelector("#menu");
	ctm = menu.getContext("2d"); // get 2D contex.

	// get handles on various GUI components
	var conversation, data, datasend, users;
	conversation = document.querySelector("#conversation");
  	data = document.querySelector("#data");
  	datasend = document.querySelector("#datasend");
  	users = document.querySelector("#users");

	w = canvas.width;
 	h = canvas.height;
 	ihm.drawInfo(ctm);
 	ihm.showRules(ctx);


 	// Initializing with 4 balls.
 	initBalls(4);

 	// Initalizing with two players.
 	initPaddle(2,w,h);

 	// Listener for send button
	datasend.addEventListener("click", function(evt) {
      sendMessage();
	});

	// detect if enter key pressed in the input field
	data.addEventListener("keypress", function(evt) {
 		// if pressed ENTER, then send
    	if(evt.keyCode == 13) {
			this.blur();
        	sendMessage();
    	}
	});

	// sends the chat message to the server
	function sendMessage() {
  		var message = data.value;
		data.value = "";
		// tell server to execute 'sendchat' and send along one parameter
		socket.emit('sendchat', message);
	};

	var username = prompt("What's your name?");
	socket = io.connect();

	// on connection to server, ask for user's name with an anonymous callback
	socket.on('connect', function(){
		// call the server-side function 'adduser' and send one parameter (value of prompt)
		socket.emit('adduser', username);
	});

	

	// listener, whenever the server emits 'updatechat', this updates the chat body 
	socket.on('updatechat', function (username, data) {
		var chatMessage = "<b>" + username + ":</b> " + data + "<br>";
		conversation.innerHTML += chatMessage; 
	});

    // just one player moved
	socket.on('setNumberUser', function (u) {
		me = u%2;
	});

	// listener, whenever the server emits 'updateusers', this updates the username list
	socket.on('updateusers', function(listOfUsers) {
		users.innerHTML = "";
		for(var name in listOfUsers) {
    		var userLineOfHTML = '<div>' + name + '</div>';
    		users.innerHTML += userLineOfHTML;
  		}
	});

	// update the whole list of players, useful when a player
	// connects or disconnects, we must update the whole list
	socket.on('updatePlayers', function(listOfplayers) {
		updatePlayers(listOfplayers);
	});

	socket.on('updatePaddlepos', function(pos1, pos2){
		if(requestCount % 5 == 0)
		{
			if(me%2 == 1)
			{
				tabPadd[0].x = pos1;
			}
			else
			{
				tabPadd[1].x = pos2;
			}
		}
		requestCount++;
	});

	// Add the listener to the main, window object, and update the states
	window.addEventListener('keydown', function(event){
	    if (event.keyCode === 65) {
	      	// Start the game.
	        if(etat == 0)
			{
				etat = 1;
				canvas.style.backgroundImage = 'url("")';
				animate(socket);
			}
	    } else if (event.keyCode === 37) {
	        inputStates.paddle1_left = true;
	    } else if (event.keyCode === 39) {
	        inputStates.paddle1_right = true;
	    } else if (event.keyCode === 81) {
	        inputStates.paddle2_left = true;
	    } else if (event.keyCode === 83) {
	        inputStates.paddle2_right = true;
	    }
	}, false);

	// If the key is released, change the states object
	window.addEventListener('keyup', function(event){
		if (event.keyCode === 37) {
	        inputStates.paddle1_left  = false;
	    } else if (event.keyCode === 39) {
	        inputStates.paddle1_right = false;
	    } else if (event.keyCode === 81) {
	        inputStates.paddle2_left = false;
	    } else if (event.keyCode === 83) {
	        inputStates.paddle2_right = false;
	    }
	}, false);

 }

 function animate(time) {
 	// 1 - First empty the canvas.
    ctx.clearRect(0, 0, w, h);

    // 2 - Draw objects.
    drawBalls(ctx, tabBalls);
    drawPaddles(ctx, tabPadd);
    drawObstacle(ctx, tabObstacles);
    ihm.drawMiddleLine(ctx, h, w, level);
    ihm.drawCriticalLines(ctx, h, w, numberOfPlayers);
    ihm.drawScore(ctm,h,w,score1,score2, lifes);

    // 3 - Move objects.
    moveBalls(ctx, tabBalls);
    moveObstacle(tabObstacles, w);
    keyPress();

    // 4 - Update from server.
    updatePaddlePos();

    // 5 - Colissions.
    bounceBalls(ctx, tabBalls, tabPadd, w, h, score1, score2, lifes);
    // Between Padds and Balls.
    bouncePadd(ctx, tabBalls, tabPadd, h);
    // Between obstacles and Balls.
    bounceObstacle(tabObstacles, tabBalls);

    // 6 - Update game function.
    updateGame();

    // Reload animation.
  	// In 1/60ème sec (16.6ms).
  	if(etat == 1)
  	{
 		requestAnimationFrame(animate);
 	}
 }

// Update tab of players.
function updatePlayers(listOfPlayers) {
  allPlayers = listOfPlayers;
}

function keyPress()
{
	// PLAYERS
	// Left.
	if(inputStates.paddle1_left)
	{
		// -20 x.
		if(tabPadd[me].x > 0)
		{
			movePaddles(tabPadd, me%2, -10, w);
			socket.emit('movePaddle', me%2, tabPadd[me].x-10);
		}	
	}
	// Right.
	if(inputStates.paddle1_right)
	{
		// +20 x.
		if(tabPadd[me].x < w-60)
		{
			movePaddles(tabPadd, me%2, 10, w);
			socket.emit('movePaddle', me%2, tabPadd[me].x+10);
		}
	}
}

// Update game function.
function updateGame()
{
	if(lifes < 0)
	{
		ctx.clearRect(0, 0, w, h);
		etat = 0;
		ihm.gameOver(ctx,score1,score2);
		// Paddle reset.
		socket.emit('resetPaddles');
	}

	if(lifes < 81 && lifes > 77)
	{
		ihm.showText(ctx,"Niveau 2");
	}

	if(lifes < 80 && level < 2)
	{
		level++;
		canvas.style.backgroundColor = "#FE9001";
		// Add 2 balls.
		initBalls(2);
		tabObstacles[0] = new Obstacle(w/2-50,h/2-30, 4, 50, 10, "white");
		tabObstacles[1] = new Obstacle(w/2+50,h/2+30, -4, 50, 10, "white");
	}

	if(lifes < 41 && lifes > 37)
	{
		ihm.showText(ctx,"Niveau 3");
	}

	if(lifes < 40 && level < 3)
	{
		level++;
		tabObstacles = [];
		tabObstacles[0] = new Obstacle(w/2-100,h/2, 10, 130, 20, "black");
		canvas.style.backgroundColor = "#E9C29F";
	}
}

function updatePaddlePos()
{
	socket.emit('updatePaddle');
}