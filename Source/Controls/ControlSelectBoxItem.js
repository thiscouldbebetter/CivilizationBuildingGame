
function ControlSelectBoxItem(controllable, style, text)
{
	this.controllable = controllable;
	this.style = style;
	this.text = text;
}

{
	ControlSelectBoxItem.buildManyFromSelectables = function(style, includeOptionForNone, selectables)
	{
		var returnValues = [];

		if (includeOptionForNone == true)
		{
			var listBoxItem = new ControlSelectBoxItem
			(
				this,
				style,
				"[none]"
			)

			returnValues.push(listBoxItem);
		}

		for (var i = 0; i < selectables.length; i++)
		{
			var selectable = selectables[i];

			var listBoxItem = new ControlSelectBoxItem
			(
				selectable,
				style,
				selectable.buildTextAsSelectable()
			)

			returnValues.push(listBoxItem);
		}

		return returnValues;
	}

	ControlSelectBoxItem.prototype.htmlElementUpdate = function(size)
	{
		if (this.htmlElement == null)
		{
			var returnValue = document.createElement("option");

			returnValue.control = this;

			var gridCellSize = this.style.gridCellSize;

			var style = returnValue.style;
			//style.width = size.x * gridCellSize.x;
			//style.height = size.y * gridCellSize.y;
			returnValue.value = this.text;
			returnValue.innerHTML = this.text;

			this.htmlElement = returnValue;
		}

		return this.htmlElement;
	}
}
