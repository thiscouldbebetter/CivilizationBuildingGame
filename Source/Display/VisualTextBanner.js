
function VisualTextBanner(text, sizeInPixels)
{
	this.text = text;
	this.sizeInPixels = sizeInPixels;
}
{
	VisualTextBanner.prototype.draw = function
	(
		display,
		size,
		drawPos,
		colorForFill,
		colorForTextAndBorder
	)
	{
		if (display.isColorEnabled == false)
		{
			colorForFill = "White";
			colorForTextAndBorder = "Gray";
		}

		var sizeInPixels = this.sizeInPixels;

		drawPos.multiplyScalar
		(
			2
		).add
		(
			size
		).subtract
		(
			sizeInPixels
		).divideScalar(2);

		var graphics = display.graphics;
		graphics.fillStyle = colorForFill;
		graphics.fillRect
		(
			drawPos.x, drawPos.y,
			sizeInPixels.x, sizeInPixels.y
		);

		graphics.strokeStyle = colorForTextAndBorder;
		graphics.strokeRect
		(
			drawPos.x, drawPos.y,
			sizeInPixels.x, sizeInPixels.y
		);

		graphics.fillStyle = colorForTextAndBorder;
		graphics.fillText
		(
			this.text,
			drawPos.x + sizeInPixels.x * .25,
			drawPos.y + sizeInPixels.y * .75
		);
	}

}
