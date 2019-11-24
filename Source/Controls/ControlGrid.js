
function ControlGrid(name, controllable, style, size, pos, gridSizeInCells, children)
{
	this.name = name;
	this.controllable = controllable;
	this.style = style;
	this.size = size;
	this.pos = pos;
	this.gridSizeInCells = gridSizeInCells;
	this.children = children;

	this.hasBeenModified = true;
}

{
	// html

	ControlGrid.prototype.htmlElementUpdate = function()
	{
		if (this.htmlElement == null)
		{
			var styleGridCellSizeInPixels = this.style.gridCellSize;

			var returnValue = document.createElement("table");
			returnValue.id = this.name;
			returnValue.control = this;

			var sizeInPixels = this.size.clone().multiply(styleGridCellSizeInPixels);
			var cellSizeInPixels = sizeInPixels.clone().divide(this.size);
	
			returnValue.cellPadding = "0px";
			returnValue.cellSpacing = "0px";

			var style = returnValue.style;
			style.border = "1px solid";

			style.position = "absolute";
			var posInPixels = this.pos.clone().multiply(styleGridCellSizeInPixels);
			style.left = posInPixels.x;
			style.top = posInPixels.y;

			var childIndex = 0;
			var cellPos = new Coords(0, 0);

			for (var y = 0; y < this.gridSizeInCells.y; y++)
			{
				cellPos.y = y;

				var trForRow = document.createElement("div");
				trForRow.style.flow = "horizontal";
				trForRow.style.width = sizeInPixels.x;
				
				for (var x = 0; x < this.gridSizeInCells.x; x++)
				{
					cellPos.x = x;

					var tdForCell = document.createElement("div");
					tdForCell.style.width = cellSizeInPixels.x;
					tdForCell.style.height = cellSizeInPixels.y;
					tdForCell.style.display = "inline-block";
					//tdForCell.style.overflow = "hidden";

					var childForCell = this.children[childIndex];
					childIndex++;

					var htmlElementForChild;
					if (childForCell == null)
					{
						htmlElementForChild.innerHTML = "x";
					}
					else
					{
						htmlElementForChild = childForCell.htmlElementUpdate();
					}
					tdForCell.appendChild(htmlElementForChild);

					trForRow.appendChild(tdForCell);
				}

				returnValue.appendChild(trForRow);
			}
	
			this.htmlElement = returnValue;
		}

		// todo - cloned from ControlContainer

		/*
		var childrenOfHTMLElement = this.htmlElement.children;
		var childrenToRemove = [];
	
		for (var i = 0; i < childrenOfHTMLElement.length; i++)
		{
			var childOfHTMLElement = childrenOfHTMLElement[i];

			var controlForHTMLElement = childOfHTMLElement.control;
	
			if (this.children.indexOf(controlForHTMLElement) < 0)
			{
				childrenToRemove.push(childOfHTMLElement);
			}
		}
	
		for (var i = 0; i < childrenToRemove.length; i++)
		{
			var childToRemove = childrenToRemove[i];
			this.htmlElement.removeChild(childToRemove);	
		}
	
		for (var i = 0; i < this.children.length; i++)
		{
			var child = this.children[i];

			if (child.hasBeenModified == true)
			{
				child.hasBeenModified = false;
				child.htmlElementUpdate();
			}

			if (this.htmlElement.children[child.name] == null)
			{
				this.htmlElement.appendChild(child.htmlElement);
			}
		}	
		*/
	
		return this.htmlElement;	
	}
}
