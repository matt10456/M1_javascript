// We need to use the express framework: have a real web servler that knows how to send mime types etc.
var express=require('express');

// Init globals variables for each module required
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server);

// launch the http server on given port
server.listen(8082);

// Indicate where static files are located. Without this, no external js file, no css...  
app.use(express.static(__dirname + '/'));    

// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// usernames which are currently connected to the chat
var usernames = {};
var listOfPlayers = [];
var playersConnected = 0;
// Padds.
var Pospadd1 = 215;
var Pospadd2 = 215;
// Number of users.
var numberUsers = 0;

io.sockets.on('connection', function (socket) {

	// when the client emits 'sendchat', this listens and executes
	socket.on('sendchat', function (data) {
		// we tell the client to execute 'updatechat' with 2 parameters
		io.sockets.emit('updatechat', socket.username, data);
	});

	socket.on('movePaddle', function (user, move) {
		// update the paddles positions.
		if(user == 0)
		{
			Pospadd1 = move;
		}
		else
		{
			Pospadd2 = move;
		}
	});

	socket.on('updatePaddle', function () {
		// we tell the client to execute 'updatePaddlepos' with 2 parameters
		io.sockets.emit('updatePaddlepos', Pospadd1, Pospadd2);
	});

	socket.on('resetPaddle', function () {
		Pospadd1 = 215;
		Pospadd2 = 215;
	});

	socket.on('sendpos', function (newPos) {
		// we tell the client to execute 'updatepos' with 2 parameters
		//console.log("recu sendPos");
		socket.broadcast.emit('updatepos', socket.username, newPos);
	});

	// when the client emits 'adduser', this listens and executes
	socket.on('adduser', function(username){
		// we store the username in the socket session for this client
		// the 'socket' variable is unique for each client connected,
		// so we can use it as a sort of HTTP session
		socket.username = username;
		// add the client's username to the global list
		// similar to usernames.michel = 'michel', usernames.toto = 'toto'
		usernames[username] = numberUsers;
		// echo to the current client that he is connecter
		socket.emit('updatechat', 'SERVER', 'you have connected');
		// Token for the current user.
		socket.emit('setNumberUser', numberUsers);
		// echo to all client except current, that a new person has connected
		socket.broadcast.emit('updatechat', 'SERVER', username + ' has connected');
		// tell all clients to update the list of users on the GUI
		io.sockets.emit('updateusers', usernames);

		// Create a new player and store his position too... for that
		// we have an object that is a "list of players" in that form
		// listOfPlayer = {'michel':{'x':0, 'y':0, 'v':0}, 
		// 							john:{'x':10, 'y':10, 'v':0}}
		// for this example we have x, y and v for speed... ?
		var player = {'x':100, 'y':10, color:"red"};
		listOfPlayers[playersConnected] = player;
		io.sockets.emit('updatePlayers',listOfPlayers);

		numberUsers+=1;
		
	});

	// when the user disconnects.. perform this
	socket.on('disconnect', function(){
		// remove the username from global usernames list
		delete usernames[socket.username];
				// update list of users in chat, client-side
		io.sockets.emit('updateusers', usernames);

		// Remove the player too
		delete listOfPlayers[playersConnected];		
		io.sockets.emit('updatePlayers',listOfPlayers);
		
		// echo globally that this client has left
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
	});
});