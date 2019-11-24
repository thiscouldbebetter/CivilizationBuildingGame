
function ControlHelper()
{
	this.controllables = [];
	this.listToAddTo = [];
}

{
	ControlHelper.updateControlsForControllablesAndAddToList = function
	(
		controllables, listToAddTo
	)
	{
		for (var i = 0; i < controllables.length; i++)
		{
			var controllable = controllables[i];
			var control = controllable.controlUpdate();
			listToAddTo.push(control);
		}

		return listToAddTo;
	}
}
