
function ControlTextBox(name, controllable, style, size, pos, isReadOnly, text)
{
	this.name = name;
	this.controllable = controllable;
	this.style = style;
	this.size = size;
	this.pos = pos;
	this.isReadOnly = isReadOnly;
	this.text = text;
}

{
	ControlTextBox.prototype.htmlElementUpdate = function()
	{
		if (this.htmlElement == null)
		{
			var gridCellSizeInPixels = this.style.gridCellSize;
	
			var returnValue = document.createElement("input");
			var style = returnValue.style;
			style.fontSize = this.style.fontSize;
			var sizeInPixels = this.size.clone().multiply(gridCellSizeInPixels);
			style.width = sizeInPixels.x;
			style.height = sizeInPixels.y;
			style.position = "absolute";
			var posInPixels = this.pos.clone().multiply(gridCellSizeInPixels);
			style.left = posInPixels.x;
			style.top = posInPixels.y;
			returnValue.readOnly = this.isReadOnly;
	
			this.htmlElement = returnValue;
		}

		this.htmlElement.value = this.text;

		return this.htmlElement;
	}
}
