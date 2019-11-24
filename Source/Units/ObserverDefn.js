
function ObserverDefn(sightRangeInCells)
{
	this.sightRangeInCells = sightRangeInCells;
}

{
	ObserverDefn.prototype.initializeEntityForVenue = function(entity)
	{
		entity.propertyAdd(new ObserverData());
	}	
}
