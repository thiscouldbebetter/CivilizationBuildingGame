
function Action_Sleep()
{
	this.name = "Sleep";
}

{
	Action_Sleep.prototype.perform = function(actor)
	{
		// todo
		var entity = actor.factionData.factionableSelected();
		entity.turnableData.isDoneForThisTurn = true;
	}
}
