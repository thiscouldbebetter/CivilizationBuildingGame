
function ActorDefn(activityDefnName, actionNameToButtonMappings)
{
	this.activity = new Activity(activityDefnName);
	this.actionNameToButtonMappings = actionNameToButtonMappings;

	this.actionNamesAvailable = this.actionNameToButtonMappings.addPropertyWithNameFromEachItemToList
	(
		"actionName", []
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
