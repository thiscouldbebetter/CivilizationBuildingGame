
function ControlButton(name, controllable, style, size, pos, visual, click)
{
	this.name = name;
	this.controllable = controllable;
	this.style = style;
	this.size = size;
	this.pos = pos;
	this.visual = visual;
	this.click = click;

	this.hasBeenModified = true;
}

{
	ControlButton.prototype.htmlElementUpdate = function()
	{
		if (this.htmlElement == null)
		{
			var gridCellSizeInPixels = this.style.gridCellSize;

			var returnValue = document.createElement("button");

			returnValue.id = this.name;
			returnValue.control = this;

			var sizeInPixels = this.size.clone().multiply(gridCellSizeInPixels);
			var style = returnValue.style;
			style.width = sizeInPixels.x;
			style.height = sizeInPixels.y;
			var posInPixels = this.pos.clone().multiply(gridCellSizeInPixels);
			style.position = "absolute";
			style.left = posInPixels.x;
			style.top = posInPixels.y;
			returnValue.innerHTML = this.visual.htmlElementUpdate();
			returnValue.onclick = this.click;

			this.htmlElement = returnValue;
		}

		var posInPixels = this.pos.clone().multiply(this.style.gridCellSize);
		this.htmlElement.style.left = posInPixels.x;
		this.htmlElement.style.top = posInPixels.y;

		return this.htmlElement;
	}
}
