
function ActivityDefn_Move(actor, activity, parameters)
{
	var world = Globals.Instance.universe.world();
	var directionToMove = parameters["DirectionToMove"].value;

	var map = world.map;
	var entitySelected = actor;
	var entitySelectedPosInCells = entitySelected.locatableData.posInCells;

	var destinationPosInCells = entitySelectedPosInCells.clone().add
	(
		directionToMove.offset
	);
	var destinationPosInPixels = destinationPosInCells.clone().multiply
	(
		map.cellSizeInPixels
	);
	var displacementFromDestinationInPixels = destinationPosInPixels.clone().subtract
	(
		entitySelected.locatableData.posInPixels
	);
	var distanceFromDestinationInPixels = displacementFromDestinationInPixels.magnitude();

	var pixelsToMovePerTick = map.cellSizeInPixels.x / 4;

	if (distanceFromDestinationInPixels > pixelsToMovePerTick)
	{
		entitySelected.locatableData.posInPixels.add
		(
			directionToMove.offset.clone().multiplyScalar
			(
				pixelsToMovePerTick
			)
		);
	}
	else
	{
		ActivityDefn_Move_Arrive
		(
			map,
			entitySelected,
			entitySelectedPosInCells,
			destinationPosInCells
		);
	}
}
