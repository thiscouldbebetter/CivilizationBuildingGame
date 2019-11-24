
function ActivityDefn_UserInputAccept(actor, activity, parameters)
{
	var inputHelper = Globals.Instance.inputHelper;
	var actionsActiveForActor = actor.actorData.actionsActive;
	actionsActiveForActor.length = 0;

	var actionsActiveFromInputHelper = inputHelper.actionsActive;

	if (actionsActiveFromInputHelper.length > 0)
	{
		actionsActiveFromInputHelper.appendTo
		(
			actionsActiveForActor
		);
	}
}
