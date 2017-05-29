class Ball {
	constructor(x, y, ivX, ixY, r,color)
	{
		this.x = x;
		this.y = y;
		this.r = r;
		this.color = color;
		this.vX = ivX;
		this.vY = ixY
		this.speed = 1;
		this.alive = 1;
		this.value = 10;
		this.direction = 0;
		// Hit an obstacle.
		this.hit = 0;
	}

	colorAdd(addColor)
	{
		if(this.value > 200)
		{
			this.value += addColor;
			return 255;
		}
		else
		{
			this.value += addColor;
			return this.value;
		}
	}

	die(tabBalls,w,h)
	{

    	var way = Math.random() * (1 - 0) + 0;
		this.alive = 0;
		// Set a new ball.
		var last = tabBalls.length;
		tabBalls[last] = new Ball(Math.floor(w*Math.random()),
                                 Math.floor(h*Math.random()),
                                 Math.floor(1+Math.random()*2),
                                 Math.floor(1+Math.random()*2),
                                 Math.floor(10+Math.random()*3),
                                "rgb(40,200,20)");
	}

	draw(ctx)
	{
		// Take the current contex and draw the ball.
		// We start be saving the contex (good pratice).
		ctx.save();
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r,
			    0, 2*Math.PI);
		ctx.fillStyle = this.color;
		ctx.fill();

		ctx.restore();
	}

	changeDirection() {

	}
}

function initBalls(n) {
   for(var i=0; i < n; i++) {
    tabBalls[i] = new Ball(Math.floor(w*Math.random()),
                                 Math.floor(h*Math.random()),
                                 Math.floor(1+Math.random()*2),
                                 Math.floor(1+Math.random()*2),
                                 Math.floor(10+Math.random()*3),
                                "rgb(40,200,10)");
  }
}

function drawBalls(ctx, tab) {
   for(var i=0; i < tab.length; i++) {
   		var b = tab[i];
   		if(b.alive == 1)
   		{
     		b.draw(ctx);
     	}
   }
}

function moveBalls(ctx, tab) {
   for(var i=0; i < tab.length; i++) 
   {
   		var b = tab[i];
   		if(b.alive)
   		{
   			b.x += b.vX;
      		b.y += b.vY;
      	}
   	}
 }

 function bounceBalls(ctx, tab, tabPadd, gameWidth, gameHeight, lifes)
 {
 	for(var i=0; i < tab.length; i++)
 	{
 		var b = tab[i];
 		// The ball must be alive or we will have a bug.
 		if(b.alive == 1)
 		{
 			// Hit the bottom = die.
	 		if((gameHeight - b.y < b.r) && b.alive == 1)
	 		{
	 			b.die(tab, gameWidth, gameHeight);
	 			this.lifes -= 1;
	 		}
	 		// Hit the top = die.
	 		if((b.y - b.r < 0) && b.alive == 1)
	 		{
	 			b.die(tab, gameWidth, gameHeight);
	 			this.lifes -= 1;
	 		}
	   		if (b.x + b.vX  > gameWidth || b.x + b.vX  < 0)
	   		{
	        	b.vX = -b.vX - 1;
	        	// Value is higher and color is more blue.
	        	b.color = "rgb(40,200,+"+ b.colorAdd(30) + ")";
	   		}
        }
    }

 }