
function ControlCheckbox(name, controllable, style, pos, isChecked)
{
	this.name = name;
	this.controllable = controllable;
	this.style = style;
	this.pos = pos;
	this.isChecked = isChecked;

	this.hasBeenModified = true;
}

{
	ControlCheckbox.prototype.htmlElementUpdate = function()
	{
		if (this.htmlElement == null)
		{
			var gridCellSizeInPixels = this.style.gridCellSize;
	
			var returnValue = document.createElement("input");
	
			returnValue.id = this.name;
			returnValue.type = "checkbox";
			returnValue.checked = this.isChecked;
			returnValue.control = this;

			var style = returnValue.style;

			if (this.pos != null)
			{
				var posInPixels = this.pos.clone().multiply(gridCellSizeInPixels);

				style.position = "absolute";
				style.left = posInPixels.x;
				style.top = posInPixels.y;
			}
	
			this.htmlElement = returnValue;
		}

		return this.htmlElement;
	}
}
