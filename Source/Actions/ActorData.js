
function ActorData(activity)
{
	this.activity = activity;
	this.actionsActive = [];
}

{
	ActorData.prototype.updateEntityForTimerTick = function(entity)
	{
		this.activity.perform(entity);

		var actionsActive = this.actionsActive;
		for (var i = 0; i < actionsActive.length; i++)
		{
			actionsActive[i].perform(entity);
		}
	}
}
