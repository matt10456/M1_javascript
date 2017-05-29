class Paddle {
	constructor(x, y, width, height, color)
	{
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.color = color;
	}

	draw(ctx)
	{
		// Take the current contex and draw the paddle.
		// We start be saving the contex (good pratice).
		ctx.save();
		ctx.beginPath();
		ctx.rect(this.x, this.y, this.height,
			    this.width);
		ctx.fillStyle = this.color;
		ctx.fill();

		// Restore the contex.
		ctx.restore();
	}
}

function initPaddle(player, heightGame, widthGame)
{
	if(player == 1)
	{
		// One player.
		tabPadd[0] = new Paddle((widthGame/2)-30,heightGame-20,10,60,"blue");
	}
	else if (player == 2)
	{
		// two players.
		tabPadd[0] = new Paddle((widthGame/2)-30,heightGame-20,10,60,"blue");
		tabPadd[1] = new Paddle((widthGame/2)-30,20,10,60,"red");
	}
}

function drawPaddles(ctx, tab)
{
	for(var i=0; i < tab.length; i++) {
   		var p = tab[i];
   		p.draw(ctx);
   }
     	
}	

function movePaddles(tab, pad, pos, width)
{
	var p = tab[pad];
		p.x += pos;
}


function bouncePadd(ctx, tabBalls, tabPadd, height, score1, score2)
{
	// Is the y of the ball is < to 40 and the x is between [-15,15] of paddle's position, we bounce.
	var paddle1 = tabPadd[0];
	var paddle2 = tabPadd[1];
	for(var i = 0; i< tabBalls.length; i++)
	{
		// For each Balls.
		var b = tabBalls[i];
		// The ball must be alive or we will have a bug.
		if(b.alive == 1)
		{
			// Hit the bottom padd.
			if((b.y > height-30 && (b.x > (paddle1.x - 30) && b.x < (paddle1.x + 60))) && b.direction == 0)
			{
				b.vY = -b.vY - 1;
				b.y += b.vY;
	        	b.color = "rgb(40,200,"+ b.colorAdd(30) +")";
	        	this.score1 += b.value;
	        	b.direction = 1;
	        	b.hit = 0;
			}

			// Hit the top padd.
			if((b.y < 40 && (b.x > (paddle2.x - 30) && b.x < (paddle2.x + 60))) && b.direction == 1)
			{
				b.vY = -b.vY - 1;
				b.y += b.vY;
	        	b.color = "rgb(40,200,"+ b.colorAdd(30) +")";
	        	this.score2 += b.value;
	        	b.direction = 0;
	        	b.hit = 0;
			}
		}
	}

}