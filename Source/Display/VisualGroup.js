
function VisualGroup(children)
{
	this.children = children;
}

{
	VisualGroup.prototype.draw = function(display, size, drawPos)
	{
		for (var i = 0; i < this.children.length; i++)
		{
			var child = this.children[i];
			child.draw(display, size, drawPos);
		}
	}
}
