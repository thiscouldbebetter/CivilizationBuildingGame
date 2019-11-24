
function LocatableData(posInCells)
{
	this.posInCells = posInCells;
}

{
	LocatableData.prototype.initializeEntityForVenue = function(entity, venue)
	{
		var world = Globals.Instance.universe.world();

		this.posInPixels = this.posInCells.clone().multiply
		(
			world.map.cellSizeInPixels
		);

		var mapCellOccupied = world.map.cellAtPos
		(
			this.posInCells
		);
		mapCellOccupied.entitiesPresent.push(entity);

	}

	// controls

	LocatableData.prototype.controlUpdate = function(entity, style, pos)
	{
		if (entity.baseData != null)
		{
			this.control = entity.baseData.controlUpdate(entity, style, pos);
		}
		else if (entity.moverData != null)
		{
			this.control = entity.moverData.controlUpdate(entity, style, pos);
		};

		return this.control;
	}

}
