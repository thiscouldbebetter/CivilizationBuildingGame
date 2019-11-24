
// classes


function Action_Delay()
{
	this.name = "Delay";
}

{
	Action_Delay.prototype.perform = function()
	{
		// todo
		var entity = actor.factionData.factionableSelected();
		entity.turnableData.isDoneForThisTurn = true;
	}
}
