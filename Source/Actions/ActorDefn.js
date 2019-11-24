
function ActorDefn(activityDefnName, actionNameToButtonMappings)
{
	this.activity = new Activity(activityDefnName);
	this.actionNameToButtonMappings = actionNameToButtonMappings;

	this.actionNamesAvailable = ArrayHelper.addPropertyWithNameFromEachItemInArrayToList
	(
		"actionName",			
		this.actionNameToButtonMappings,
		[]
	);
}

{
	ActorDefn.prototype.initializeEntityForVenue = function(entity, venue)
	{
		entity.propertyAdd
		(
			new ActorData
			(
				this.activity.clone()
			)
		);
	}
}
