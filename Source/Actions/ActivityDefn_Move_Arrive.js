
function ActivityDefn_Move_Arrive
(
	map, 
	entitySelected,
	entitySelectedPosInCells,
	destinationPosInCells
)
{
	var mapCellToMoveFrom = map.cellAtPos(entitySelectedPosInCells);
	var indexOfEntitySelected = mapCellToMoveFrom.entitiesPresent.indexOf(entitySelected);
	mapCellToMoveFrom.entitiesPresent.splice(indexOfEntitySelected, 1);
	
	var mapCellToMoveTo = map.cellAtPos(destinationPosInCells);
	var entitiesAlreadyAtDestination = mapCellToMoveTo.entitiesPresent;
	for (var i = 0; i < entitiesAlreadyAtDestination.length; i++)
	{
		var entityAlreadyAtDestination = entitiesAlreadyAtDestination[i];
		if (entitySelected.factionName != entityAlreadyAtDestination.factionName)
		{
			var attackerDefn = entitySelected.defn().moverDefn;
			var defenderDefn = entityAlreadyAtDestination.defn().moverDefn;

			var attackStrengthOfAttacker = attackerDefn.attacks[0].strength; // todo
			var defenseStrengthOfDefender = defenderDefn.defenses[0].strength; // todo	

			var totalOfCombatStrengths = 
				attackStrengthOfAttacker
				+ defenseStrengthOfDefender;
	
			var randomValue = Math.random();
				
			if (randomValue < attackStrengthOfAttacker / totalOfCombatStrengths)
			{
				entityAlreadyAtDestination.killableData.integrity = 0;
			}
			else
			{
				entitySelected.killableData.integrity = 0;
			}
		}
	}
	entitiesAlreadyAtDestination.push(entitySelected);
	var terrainToMoveOnto = mapCellToMoveTo.terrain();
	var movementTypeName = entitySelected.defn().moverDefn.movementTypeName;
	var movesToTraverse = terrainToMoveOnto.movementCosts[movementTypeName].movesToTraverse;
	var moverData = entitySelected.moverData;
	if (moverData.movesThisTurn >= movesToTraverse)
	{
		moverData.movesThisTurn -= movesToTraverse;
		Control.setHasBeenModified(entitySelected.control);
		entitySelected.controlUpdate();

		entitySelected.observerData.removeCellsInObserverViewFromFactionMapKnown
		(
			entitySelected
		);

		entitySelected.locatableData.posInCells.overwriteWith(destinationPosInCells);

		entitySelected.observerData.addCellsInObserverViewToFactionMapKnown
		(
			entitySelected
		);
			
		if (moverData.movesThisTurn <= 0)
		{
			entitySelected.turnableData.isDoneForThisTurn = true;
		}
	}

	entitySelected.actorData.activity.defnName = null;
	entitySelected.actorData.activity.isActive = false;
	entitySelected.locatableData.posInPixels.overwriteWith
	(
		entitySelectedPosInCells
	).multiply
	(
		map.cellSizeInPixels
	);
}
