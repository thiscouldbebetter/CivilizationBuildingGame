
function VisualColors(colorFill, colorStroke, child)
{
	this.colorFill = colorFill;
	this.colorStroke = colorStroke;
	this.child = child;
}

{
	VisualColors.prototype.draw = function(display, size, drawPos)
	{
		var graphics = display.graphics;

		var fillStyleToRestore = graphics.fillStyle;
		var strokeStyleToRestore = graphics.strokeStyle;

		graphics.fillStyle = this.colorFill;
		graphics.strokeStyle = this.colorStroke;

		this.child.draw(display, size, drawPos);

		graphics.fillStyle = fillStyleToRestore;
		graphics.strokeStyle = strokeStyleToRestore;
	}
}
