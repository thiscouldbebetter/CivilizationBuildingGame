
function FactionableData(factionName)
{
	this.factionName = factionName;
}

{
	FactionableData.prototype.faction = function()
	{
		return Globals.Instance.universe.world().factions()[this.factionName];
	}

	FactionableData.prototype.updateEntityForTurn = function(entity)
	{
		// todo
	}
}
