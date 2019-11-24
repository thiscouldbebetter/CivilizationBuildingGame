function main()
{
	var mapCellSizeInPixels = new Coords(16, 16);

	var universeDefn = Demo_UniverseDefnBuild(mapCellSizeInPixels);

	var inputs = new Input_Instances();

	universeDefn.actionsAll.addLookups("name");

	var bindingsAll =
	[ 
		new InputToActionBinding(inputs.W, "MoveNorth"),
		new InputToActionBinding(inputs.A, "MoveWest"),
		new InputToActionBinding(inputs.S, "MoveSouth"),
		new InputToActionBinding(inputs.D, "MoveEast"),
		new InputToActionBinding(inputs.E, "Delay"),
		new InputToActionBinding(inputs.P, "Pass"),
		new InputToActionBinding(inputs.Z, "Sleep"),
	];

	var inputHelper = new InputHelper
	(
		universeDefn.actionsAll, 
		bindingsAll
	);

	var mapSizeInCells = new Coords(16, 16);

	var worldBuilder = new WorldBuilder
	(
		"World", // name
		2, // numberOfFactions
		universeDefn.mapTerrains, 
		mapSizeInCells,
		mapCellSizeInPixels
	);

	var universe = new Universe
	(
		universeDefn,
		[ worldBuilder ], // venues
		worldBuilder.name // nameOfVenueInitial
	);

	var display = new Display
	(
		// displaySizeInPixels
		mapCellSizeInPixels.clone().multiply
		(
			mapSizeInCells
		),
		false // isColorEnabled
	);

	Globals.Instance.initialize
	(
		display,
		inputHelper,
		universe
	);
}
