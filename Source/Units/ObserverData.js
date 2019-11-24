
function ObserverData()
{}
{
	ObserverData.prototype.addCellsInObserverViewToFactionMapKnown = function(observer)
	{
		var factionMapKnown = observer.factionableData.faction().factionData.mapKnown;

		var viewRangeInCells = observer.defn().observerDefn.sightRangeInCells;
		var viewSizeHalfInCells = new Coords(viewRangeInCells, viewRangeInCells);

		var posInCells = observer.locatableData.posInCells;

		var viewBoundsInCells = new Bounds
		(
			posInCells.clone().subtract
			(
				viewSizeHalfInCells	
			).trimToRangeMax
			(
				factionMapKnown.sizeInCellsMinusOnes
			),

			posInCells.clone().add
			(
				viewSizeHalfInCells
			).trimToRangeMax
			(
				factionMapKnown.sizeInCellsMinusOnes
			)
		);

		factionMapKnown.overwriteWithCellsFromMapWithinBounds
		(
			Globals.Instance.universe.world().map,
			viewBoundsInCells
		);

		// todo
	}

	ObserverData.prototype.removeCellsInObserverViewFromFactionMapKnown = function(observer)
	{
		var factionMapKnown = observer.factionableData.faction().factionData.mapKnown;

		var viewRangeInCells = observer.defn().observerDefn.sightRangeInCells;
		var viewSizeHalfInCells = new Coords(viewRangeInCells, viewRangeInCells);

		var posInCells = observer.locatableData.posInCells;

		var viewBoundsInCells = new Bounds
		(
			posInCells.clone().subtract
			(
				viewSizeHalfInCells	
			).trimToRangeMax
			(
				factionMapKnown.sizeInCellsMinusOnes
			),

			posInCells.clone().add
			(
				viewSizeHalfInCells
			).trimToRangeMax
			(
				factionMapKnown.sizeInCellsMinusOnes
			)
		);

		// todo
	}

	ObserverData.prototype.initializeEntityForVenue = function(entity, venue)
	{
		this.addCellsInObserverViewToFactionMapKnown(entity);
	}

	ObserverData.prototype.updateEntityForTimerTick = function(entity)
	{
		this.addCellsInObserverViewToFactionMapKnown(entity);
	}
}
