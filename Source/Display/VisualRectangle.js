
function VisualRectangle(color)
{
	this.color = color;
}

{
	VisualRectangle.prototype.draw = function(display, size, drawPos)
	{
		var graphics = display.graphics;
		graphics.fillStyle = this.color;
		graphics.fillRect(drawPos.x, drawPos.y, size.x, size.y);
	}
}
