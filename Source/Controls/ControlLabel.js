
function ControlLabel(name, controllable, style, pos, text)
{
	this.name = name;
	this.style = style;
	this.pos = pos;
	this.text = text;

	this.hasBeenModified = true;
}

{
	ControlLabel.prototype.text_Set = function(value)
	{
		this.text = value;
		Control.setHasBeenModified(this);
	}

	// html

	ControlLabel.prototype.htmlElementUpdate = function()
	{
		if (this.htmlElement == null)
		{
			var gridCellSizeInPixels = this.style.gridCellSize;

			var returnValue = document.createElement("div");
			returnValue.id = this.name;
			returnValue.control = this;
	
			var style = returnValue.style;
			style.fontSize = this.style.fontSize;

			if (this.pos != null)
			{
				var posInPixels = this.pos.clone().multiply(gridCellSizeInPixels);
				style.position = "absolute";
				style.left = posInPixels.x;
				style.top = posInPixels.y;
			}

			this.htmlElement = returnValue;
		}

		this.htmlElement.innerHTML = this.text;

		return this.htmlElement;
	}
}
