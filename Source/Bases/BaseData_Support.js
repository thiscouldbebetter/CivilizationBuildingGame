
function BaseData_Support()
{
	this.moversSupported = [];
}

{
	BaseData_Support.prototype.industryConsumedByMoversSupported = function()
	{
		var industryConsumed = 0;

		var numberOfMoversSupported = this.moversSupported.length;
		var numberOfMoversSupportedForFree = 2; // todo
		var numberOfMoversConsumingIndustry = 
			numberOfMoversSupported
			- numberOfMoversSupportedForFree;

		if (numberOfMoversConsumingIndustry > 0)
		{
			var industryConsumedPerMoverSupported = 2; // todo
			industryConsumed = 
				numberOfMoversConsumingIndustry 
				* industryConsumedPerMoverSupported;
		} 

		return industryConsumed;
	}

	// controllable

	BaseData_Support.prototype.controlUpdate = function(base, style, pos)
	{
		if (this.control == null)
		{
			var control = new ControlContainer
			(
				"containerSupport",
				this,
				style,
				new Coords(8, 6), // size
				pos,
				[
					new ControlLabel("labelEntitiesSupported", this, style, new Coords(1, 1), "Entities Supported:"),

					// todo
				]
			);

			this.control = control;
		}

		if (this.control.hasBeenModified == true)
		{
			this.control.hasBeenModified = false;

			// todo

			this.control.htmlElementUpdate();
		}

		return this.control;
	}
}
