
function ControlContainer(name, controllable, style, size, pos, children)
{
	this.name = name;
	this.controllable = controllable;
	this.style = style;
	this.size = size;
	this.pos = pos;
	this.children = [];

	for (var i = 0; i < children.length; i++)
	{
		var child = children[i];
		this.childAddOrReplace(child);
	}

	this.hasBeenModified = true;
}

{
	ControlContainer.prototype.childAddOrReplace = function(child)
	{
		var childName = child.name;

		var existingChild = this.children[childName];
		if (existingChild != child)
		{
			child.parent = this;

			if (existingChild != null)
			{
				var indexOfExistingChild = this.children.indexOf(existingChild);
				this.children.splice(indexOfExistingChild, 1);
				this.children[childName] = null;
			}

			this.children.push(child);
			this.children[childName] = child;

			Control.setHasBeenModified(this);
		}

		this.htmlElementUpdate();
	}

	ControlContainer.prototype.childrenRespace = function(startPos, spaceBetweenChildren)
	{
		var currentPos = startPos.clone();

		for (var i = 0; i < this.children.length; i++)
		{
			var child = this.children[i];
			child.pos.overwriteWith(currentPos);
			Control.setHasBeenModified(child);
			currentPos.add(spaceBetweenChildren);
		}
	}

	// html

	ControlContainer.prototype.htmlElementUpdate = function()
	{
		if (this.htmlElement == null)
		{
			var gridCellSizeInPixels = this.style.gridCellSize;

			var returnValue = document.createElement("div");
			returnValue.id = this.name;
			returnValue.control = this;

			var style = returnValue.style;
			style.border = "1px solid";
			var sizeInPixels = this.size.clone().multiply(gridCellSizeInPixels);
			style.width = sizeInPixels.x;
			style.height = sizeInPixels.y;
			style.position = "absolute";
			var posInPixels = this.pos.clone().multiply(gridCellSizeInPixels);
			style.left = posInPixels.x;
			style.top = posInPixels.y;

			for (var i = 0; i < this.children.length; i++)
			{
				var child = this.children[i];
				var htmlElementForChild = child.htmlElementUpdate();
				returnValue.appendChild(htmlElementForChild);
			}

			this.htmlElement = returnValue;
		}

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
				//child.hasBeenModified = false;
				child.htmlElementUpdate();
			}

			if (this.htmlElement.children[child.name] == null)
			{
				this.htmlElement.appendChild(child.htmlElement);
			}
		}

		return this.htmlElement;
	}
}
