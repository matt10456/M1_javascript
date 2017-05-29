class Obstacle {
	constructor(x, y, vx, width, height, color)
	{
		this.x = x;
		this.y = y;
		this.vx = vx;
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
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.fillStyle = this.color;
		ctx.fill();

		// Restore the contex.
		ctx.restore();
	}
}

function bounceObstacle(tabObst, tabBalls)
{
	for(var i=0; i < tabBalls.length; i++) {
   		var ball = tabBalls[i];
   		// The ball must be alive or we will have a bug.
		if(ball.alive == 1)
		{
	   		for(var j=0; j < tabObst.length; j++) {
	   			var padd = tabObst[j];
	   			if(ball.x > tabObst[j].x && ball.x < tabObst[j].x + tabObst[j].width)
	   			{
	   				if(ball.y + ball.r > tabObst[j].y && ball.y - ball.r < tabObst[j].y + tabObst[j].height && ball.hit == 0)
	   				{

	   					ball.vY = -ball.vY - 1;
						ball.y += ball.vY;
	   					ball.hit = 1;
	   					ball.color = "rgb(40,200,+"+ ball.colorAdd(50) + ")";
	   					// ! Must change the direction of the ball to avoid bug.
	   					if(ball.direction == 0) {ball.direction = 1; }
	   					else {ball.direction = 0; }
	   				}
	   				
	   			}
	   		}
	   	}
   }
}

function drawObstacle(ctx, tab)
{
	for(var i=0; i < tab.length; i++) {
   		var p = tab[i];
   		p.draw(ctx);
   }
     	
}	

function moveObstacle(tabObst, width)
{
	for(var i=0; i < tabObst.length; i++) {
		var p = tabObst[i];
		if(p.x + p.width > width || p.x < 0) {
			p.vx = - p.vx;
		}
		p.x += p.vx;
	}
}