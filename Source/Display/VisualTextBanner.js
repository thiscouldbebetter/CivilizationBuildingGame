
function VisualTextBanner(text)
{
	this.text = text;
}
{
	VisualTextBanner.prototype.draw = function
	(
		display, size, drawPos
	)
	{
		var sizeInPixels = size;

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
		graphics.fillRect
		(
			drawPos.x, drawPos.y,
			sizeInPixels.x, sizeInPixels.y
		);

		graphics.strokeRect
		(
			drawPos.x, drawPos.y,
			sizeInPixels.x, sizeInPixels.y
		);

		var fillStyleToRestore = graphics.fillStyle;
		graphics.fillStyle = graphics.strokeStyle;
		graphics.fillText
		(
			this.text,
			drawPos.x + sizeInPixels.x * .25,
			drawPos.y + sizeInPixels.y * .75
		);
		graphics.fillStyle = fillStyleToRestore;
	}

}
