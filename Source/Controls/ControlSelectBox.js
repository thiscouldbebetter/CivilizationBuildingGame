
function ControlSelectBox
(
	name, 
	controllable, 
	style, 
	size, 
	pos, 
	sizePerItem, 
	items, 
	selectedItemChanged, 
	bindingPath,
	idPathForSelectables
)
{
	this.name = name;
	this.controllable = controllable;
	this.style = style;
	this.size = size;
	this.pos = pos;
	this.sizePerItem = sizePerItem;
	this.items = items;
	this.selectedItemChanged = selectedItemChanged;
	this.bindingPath = bindingPath;
	this.idPathForSelectables = idPathForSelectables;

	for (var i = 0; i < this.items.length; i++)
	{
		var item = this.items[i];

		var itemID = item[this.nameOfPropertyForItemID];

		item.parent = this;

	}

	this.hasBeenModified = true;
}

{
	ControlSelectBox.prototype.controllablesForItemsSelected = function()
	{
		var returnValues = [];

		for (var i = 0; i < this.items.length; i++)
		{
			var item = this.items[i];
			if (item.htmlElement.selected == true)
			{
				returnValues.push(item.controllable);
			}
		}

		return returnValues;
	}

	ControlSelectBox.prototype.itemSelected = function()
	{
		var selectedIndex = this.htmlElement.selectedIndex;
		return (selectedIndex == null ? null : this.items[selectedIndex]);
	}

	// html

	ControlSelectBox.prototype.handleEventSelectionChanged = function(event)
	{
		var valueSelected = this.htmlElement.selectedOptions[0].control.controllable;

		if (this.idPathForSelectables != null)
		{
			valueSelected = valueSelected[this.idPathForSelectables];
		}

		Control.setPropertyOnObjectAtBindingPathToValue
		(
			this.controllable, 
			this.bindingPath, 
			valueSelected
		)

		if (this.selectedItemChanged != null)
		{
			this.selectedItemChanged(this);
		}
		Control.setHasBeenModified(this);
	}

	ControlSelectBox.prototype.htmlElementUpdate = function()
	{
		if (this.htmlElement == null)
		{
			var gridCellSizeInPixels = this.style.gridCellSize;
	
			var returnValue = document.createElement("select");
	
			var style = returnValue.style;
			style.fontSize = this.style.fontSize;
			style.border = "1px solid";
			var sizeInPixels = this.size.clone().multiply(gridCellSizeInPixels);
			style.width = sizeInPixels.x;
			style.height = sizeInPixels.y;
			var posInPixels = this.pos.clone().multiply(gridCellSizeInPixels);
			style.position = "absolute";
			style.left = posInPixels.x;
			style.top = posInPixels.y;
	
			returnValue.size = Math.floor
			(
				this.size.y / this.sizePerItem.y
			);

			for (var i = 0; i < this.items.length; i++)
			{
				var child = this.items[i];
	
				child.htmlElementUpdate();
				returnValue.appendChild(child.htmlElement);
			}	

			returnValue.onchange = this.handleEventSelectionChanged.bind(this);			
	
			this.htmlElement = returnValue;
		}

		if (this.bindingPath != null)
		{
			var valueToSelect = Control.getValueOfPropertyOnObjectAtBindingPath
			(
				this.controllable, 
				this.bindingPath
			);
			
			var indexToSelect;
			if (this.idPathForSelectables == null)
			{
				indexToSelect = this.items.indexOf(valueToSelect);
			}
			else
			{
				for (var i = 0; i < this.items.length; i++)
				{
					var item = this.items[i];
					var itemID = item.controllable[this.idPathForSelectables];

					if (itemID == valueToSelect)
					{
						indexToSelect = i;
						break;
					}
				}
			}
			this.htmlElement.selectedIndex = indexToSelect;
		}
	
		return this.htmlElement;
	}
}
