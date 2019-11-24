
function TurnableData()
{
	this.isDoneForThisTurn = false;
}

{
	TurnableData.prototype.updateEntityForTurn = function(entity)
	{
		this.isDoneForThisTurn = false;
	}
}
