
function ControlNumberBox(name, controllable, style, size, pos, min, max, bindingPath)
{
	this.name = name;
	this.controllable = controllable;
	this.style = style;
	this.size = size;
	this.pos = pos;
	this.min = min;
	this.max = max;
	this.bindingPath = bindingPath;

	this.hasBeenModified = true;
}

{
	// html

	ControlNumberBox.prototype.handleEventValueChanged = function(event)
	{
		Control.setPropertyOnObjectAtBindingPathToValue
		(
			this.controllable,
			this.bindingPath, 
			parseInt(this.htmlElement.value)
		);
	}

	ControlNumberBox.prototype.htmlElementUpdate = function()
	{
		if (this.htmlElement == null)
		{
			var gridCellSizeInPixels = this.style.gridCellSize;

			var returnValue = document.createElement("input");
			returnValue.type = "number";
			returnValue.min = this.min;
			returnValue.max = this.max;
			returnValue.step = 1;
			var style = returnValue.style;
			style.fontSize = this.style.fontSize;
			var sizeInPixels = this.size.clone().multiply(gridCellSizeInPixels);
			style.width = sizeInPixels.x;
			style.height = sizeInPixels.y;
			style.position = "absolute";
			var posInPixels = this.pos.clone().multiply(gridCellSizeInPixels);
			style.left = posInPixels.x;
			style.top = posInPixels.y;
			returnValue.onchange = this.handleEventValueChanged.bind(this);

			this.htmlElement = returnValue;
		}

		this.htmlElement.value = Control.getValueOfPropertyOnObjectAtBindingPath
		(
			this.controllable,
			this.bindingPath
		);

		return this.htmlElement;
	}
}
