
function VisualText(text)
{
	this.text = text;
}

{
	VisualText.prototype.htmlElementUpdate = function()
	{
		return this.text;
	}
}
