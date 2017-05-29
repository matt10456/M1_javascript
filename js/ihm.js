// Static object
var ihm = {
	drawMiddleLine(ctx, height, width, level)
	{
		if(level == 1)
		{
			ctx.save();
			ctx.beginPath();
			ctx.rect(0, (width/2)-10, width,  5);
			ctx.fillStyle = "black";
			ctx.fill();

			ctx.restore();
		}
		else if(level == 2)
		{
			ctx.save();
			ctx.beginPath();
			ctx.rect(0, (width/2)-150, width,  5);
			ctx.rect(0, (width/2)+150, width,  5);
			ctx.fillStyle = "#EAEAEA";
			ctx.fill();
			ctx.restore();	
		}
	},


	drawCriticalLines(ctx, height, width, numberOfPlayers)
	{
		ctx.save();
		ctm.font="18px serif";
		ctx.beginPath();
		ctx.rect(0, height-2, width,  2);
		ctx.fillStyle = "blue";
		ctx.fill();

		if(numberOfPlayers == 2)
		{
			ctx.save();
			ctm.font="18px serif";
			ctx.beginPath();
			ctx.rect(0, 0, width,  2);
			ctx.fillStyle = "red";
			ctx.fill();
		}
	},

	drawScore(ctm, height, width, score1, score2, lifes)
	{
		ctm.clearRect(250, 0, width, height);

		ctm.save();
		ctm.beginPath();
		ctm.font="18px Georgia";
		ctm.fillText("P1 Score: "+ score1,250,55);
		ctm.fill();
		ctm.restore();

		ctm.save();
		ctm.beginPath();
		ctm.font="18px Georgia";
		ctm.fillText("P2 Score: "+ score2,250,105);
		ctm.fill();
		ctm.restore();

		ctm.save();
		ctm.font="30px Arial";
		ctm.fillText("Completed at "+ (100 - lifes) +"%",180,160);
		ctm.fill();
		ctm.restore();
	},

	gameOver(ctx, score1, score2)
	{
		ctx.save();
		ctx.beginPath();
		ctx.font="18px Georgia";
		ctx.fillStyle = "black";
		ctx.fillText("GAME OVER",125,175);
		ctx.fillText("P1 Score: "+ score1,250,255);
		ctx.fillText("P2 Score: "+ score2,250,205);
		ctx.fill();
		ctx.restore();

	},

	showRules(ctx)
	{
		var img = new Image();
    	img.src = '../img/rules.png';
    	ctx.drawImage(img, 0, 0);
	},

	showText(ctx, text)
	{
		ctx.save();
		ctx.beginPath();
		ctx.font="100px Georgia";
		ctx.fillStyle = "black";
		ctx.fillText(text,50,200);
		ctx.fill();
		ctx.restore();
	},

	drawInfo(ctm)
	{
		ctm.save();
		ctm.font="18px Georgia";
		ctm.fillText("Fast and high value",50,55);
		ctm.fillText("Slow but low value",50,105);
		ctm.beginPath();
		ctm.fillStyle = "rgb(40,200,200)";
		ctm.arc(20, 50, 10, 0, 2*Math.PI);
		ctm.fill();

		ctm.beginPath();
		ctm.fillStyle = "rgb(40,200,25)";
		ctm.arc(20, 95, 10, 0, 2*Math.PI);
		ctm.fill();

		ctm.restore();
		ctm.save();
		ctm.font="30px Arial";
		ctm.fillText("Start (A)",20,160);
		ctm.restore();
	}
}