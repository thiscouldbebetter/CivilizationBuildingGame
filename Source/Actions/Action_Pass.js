
function Action_Pass()
{
	this.name = "Pass";
}

{
	Action_Pass.prototype.perform = function(actor)
	{
		var entity = actor.factionData.factionableSelected();
		// hack
		if (entity != null)
		{
			entity.turnableData.isDoneForThisTurn = true;
		}
	}
}
