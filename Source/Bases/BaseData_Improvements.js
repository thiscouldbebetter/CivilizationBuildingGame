
function BaseData_Improvements()
{
	this.namesOfImprovementsPresent = [];
}

{
	BaseData_Improvements.prototype.controlUpdate = function(base, style, pos)
	{
		if (this.control == null)
		{
			var control = new ControlContainer
			(
				"containerImprovements",
				this,
				style,
				new Coords(8, 6), // size
				pos,
				[
					new ControlLabel("labelImprovements", this, style, new Coords(1, 1), "Improvements:"),

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
