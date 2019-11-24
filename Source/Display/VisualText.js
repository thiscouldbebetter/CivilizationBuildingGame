
function VisualText(text)
{
	this.text = text;
}

{
	VisualText.prototype.draw = function(display, size, drawPos)
	{
		var graphics = display.graphics;
		graphics.fillStyle = "Gray";
		graphics.fillText
		(
			this.text,
			drawPos.x + size.x / 3,
			drawPos.y + size.y * .75
		);
	}

	VisualText.prototype.htmlElementUpdate = function()
	{
		return this.text;
	}
}
