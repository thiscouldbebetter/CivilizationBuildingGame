
function Action_Move(directionToMove)
{
	this.name = "Move" + directionToMove.name;
	this.directionToMove = directionToMove;
}

{
	Action_Move.prototype.perform = function(actor)
	{
		var entityToMove = actor.factionData.factionableSelected();
		entityToMove.actorData.activity.defnName = this.name;
		entityToMove.actorData.activity.isActive = true;
	}
}
