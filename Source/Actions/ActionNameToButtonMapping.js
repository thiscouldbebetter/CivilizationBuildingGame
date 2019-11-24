
function ActionNameToButtonMapping(actionName, buttonSize, buttonPos, buttonText)
{
	this.actionName = actionName;
	this.buttonSize = buttonSize;
	this.buttonPos = buttonPos;
	this.buttonText = buttonText;	
}

{
	// controllable

	ActionNameToButtonMapping.prototype.controlUpdate = function()
	{
		if (this.control == null)
		{
			var style = ControlStyle.Instances().Default;

			this.control = new ControlButton
			(
				"buttonAction" + this.actionName,
				this, // controllable
				style,
				this.buttonSize,
				this.buttonPos, // pos
				new VisualText(this.buttonText),
				null // click
			);

			this.control.controllable = this;
		}

		return this.control;
	}
}
