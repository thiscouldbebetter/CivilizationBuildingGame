
function TurnableDefn(updateEntityForTurn)
{
	this.updateEntityForTurn = updateEntityForTurn;
}

{
	TurnableDefn.prototype.initializeEntityForVenue = function(entity, venue)
	{
		entity.turnableData = new TurnableData();
	}
}
