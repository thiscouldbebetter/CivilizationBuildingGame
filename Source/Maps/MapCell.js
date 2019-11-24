
function MapCell(terrainCodeChar, improvementsPresent, entitiesPresent)
{
	this.terrainCodeChar = terrainCodeChar;
	this.improvementsPresent = improvementsPresent;
	this.entitiesPresent = entitiesPresent;

	if (this.entitiesPresent == null)
	{
		this.entitiesPresent = [];
	}
}

{
	MapCell.prototype.terrain = function()
	{
		return Globals.Instance.universe.world().map.terrains[this.terrainCodeChar];
	}

	// cloneable

	MapCell.prototype.clone = function()
	{
		return new MapCell
		(
			this.terrainCodeChar,
			this.improvementsPresent.slice(0),
			this.entitiesPresent.slice(0)
		)
	}

	MapCell.prototype.overwriteWith = function(other)
	{
		this.terrainCodeChar = other.terrainCodeChar;

		this.improvementsPresent.length = 0;
		other.improvementsPresent.appendTo
		(
			this.improvementsPresent
		);

		this.entitiesPresent.length = 0;
		other.entitiesPresent.appendTo
		(
			this.entitiesPresent
		);
	}
}
