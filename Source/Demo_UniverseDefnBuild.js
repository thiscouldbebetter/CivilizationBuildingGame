
// demo

function Demo_UniverseDefnBuild(mapCellSizeInPixels)
{
	var activityDefns = 
	[
		new ActivityDefn("DoNothing", [], function() {}),
		new ActivityDefn
		(
			"MoveEast", 
			[ new NameValuePair("DirectionToMove", Direction.Instances.East) ],
			ActivityDefn_Move
		),
		new ActivityDefn
		(
			"MoveNorth", 
			[ new NameValuePair("DirectionToMove", Direction.Instances.North) ],
			ActivityDefn_Move
		),
		new ActivityDefn
		(
			"MoveSouth", 
			[ new NameValuePair("DirectionToMove", Direction.Instances.South) ],
			ActivityDefn_Move
		),
		new ActivityDefn
		(
			"MoveWest", 
			[ new NameValuePair("DirectionToMove", Direction.Instances.West) ],
			ActivityDefn_Move
		),
		new ActivityDefn
		(
			"UserInputAccept",
			[],
			ActivityDefn_UserInputAccept
		),
	];

	var resourceDefns = 
	[
		new ResourceDefn("Commerce"),
		new ResourceDefn("Food"),
		new ResourceDefn("Industry"),
		new ResourceDefn("Research"),
	];

	ArrayHelper.addLookupsToArray(resourceDefns, "name");

	var ed = EmplacementDefn;

	var emplacementDefns = 
	[
		new ed("Airstrip", 	new VisualText("a") ),
		new ed("Fortress", 	new VisualText("f") ),
		new ed("Irrigation", 	new VisualText("i") ),
		new ed("Mines", 	new VisualText("m") ),
		new ed("Rivers",	new VisualText("w") ),
		new ed("Roads",		new VisualText("r") ),
	];

	var movementTypes = 
	[
		new MovementType("Air"),
		new MovementType("Ground"),
		new MovementType("Water"),
	];

	function buildMapTerrain
	(
		name, 
		codeChar, 
		color, 
		textForVisual,
		defenseMultiplier, 
		movementCostsGroundAndWater,
		commerceFoodIndustryPerTurn, 
		bonusesFromRoadsIrrigationMines,
		turnsToBuildRoadsIrrigationMines
	)
	{
		var movementCosts = [new MovementCost("Air", 1)];
		
		var movementCostGround = movementCostsGroundAndWater[0];
		var movementCostWater = movementCostsGroundAndWater[1];

		if (movementCostGround != 0)
		{
			movementCosts.push
			(
				new MovementCost("Ground", movementCostGround)
			);
		}

		if (movementCostWater != 0)
		{
			movementCosts.push
			(
				new MovementCost("Water", movementCostWater)
			);
		}

		var returnValue = new MapTerrain
		(
			name, 
			codeChar, 
			color, 
			new VisualText(textForVisual),
			defenseMultiplier, 
			movementCosts,
			[
				new Resource("Commerce", commerceFoodIndustryPerTurn[0]), 
				new Resource("Food", 	 commerceFoodIndustryPerTurn[1]), 
				new Resource("Industry", commerceFoodIndustryPerTurn[2]),
			]
			// todo - bonuses and times to build upgrades
		);

		return returnValue;
	}

	var bmt = buildMapTerrain;

	var mapTerrains =
	[
		//   name     		code    color		vis  df 	mg mw 	 c  f  i   cr fi im   tr ti tm
		bmt("Desert", 		"d",  	"Tan", 		"d", 1, 	[1, 0], [0, 0, 1], [1, 1, 1], [2, 5, 5]),
		bmt("Desert-Oasis",  	"do", 	"Tan", 		"o", 1, 	[1, 0], [0, 3, 1], [1, 1, 1], [5, 5, 2]),
		bmt("Desert-Oil",	"dp", 	"Tan", 		"p", 1, 	[1, 1], [0, 0, 4], [1, 1, 1], [5, 5, 2]),
		bmt("Glacier",		"g",   	"White", 	"g", 1, 	[2, 0], [0, 0, 0], [0, 0, 1], [2, 5, 15]),
		bmt("Glacier-Ivory",  	"gi", 	"White", 	"i", 1, 	[2, 0], [4, 1, 1], [0, 0, 1], [2, 5, 15]),
		bmt("Glacier-Oil",	"gp", 	"White",  	"gp",1, 	[2, 0], [0, 0, 4], [0, 0, 1], [2, 5, 15]),
		bmt("Forest", 		"f",  	"DarkGreen", 	"f", 1.5, 	[2, 0], [0, 1, 2], [0, 0, 0], [0, 0, 0]),
		bmt("Forest-Birds",	"fb", 	"DarkGreen", 	"fb",1.5,	[2, 0], [0, 3, 2], [0, 0, 0], [0, 0, 0]), 
		bmt("Forest-Silk",	"fs", 	"DarkGreen", 	"fs",1.5, 	[2, 0], [3, 1, 2], [0, 0, 0], [0, 0, 0]), 
		bmt("Grassland", 	".", 	"Green", 	"g", 1, 	[1, 0], [0, 2, 0], [0, 0, 0], [0, 0, 0]),
		bmt("Grassland-Rich", 	".r", 	"Green", 	"gr",1, 	[1, 0], [0, 2, 1], [1, 1, 0], [2, 5, 0]),	
		bmt("Hills", 		"h", 	"Green", 	"h", 2,		[2, 0], [0, 1, 0], [0, 1, 3], [2, 10, 10]), 
		bmt("Hills-Coal",	"hc", 	"Green", 	"hc", 2,	[2, 0], [0, 1, 2], [0, 1, 3], [2, 10, 10]), 
		bmt("Hills-Wine", 	"hw", 	"Green", 	"hw", 2,	[2, 0], [4, 1, 0], [0, 1, 3], [2, 10, 10]), 
		bmt("Jungle", 		"j", 	"DarkGreen", 	"j", 1.5,	[2, 0], [0, 1, 0], [0, 0, 0], [0, 0, 0]),
		bmt("Jungle-Gems", 	"jg", 	"DarkGreen", 	"jg", 1.5,	[2, 0], [4, 1, 0], [0, 0, 0], [0, 0, 0]),
		bmt("Jungle-Fruit", 	"jf", 	"DarkGreen", 	"jf", 1.5,	[2, 0], [1, 4, 0], [0, 0, 0], [0, 0, 0]),
		bmt("Mountain", 	"m", 	"Gray",		"m", 3, 	[3, 0], [0, 0, 1], [0, 0, 1], [0, 0, 10]),
		bmt("Mountain-Gold", 	"mg", 	"Gray",		"mg", 3, 	[3, 0], [6, 0, 1], [0, 0, 1], [0, 0, 10]),
		bmt("Mountain-Iron", 	"mi", 	"Gray",		"mi", 3, 	[3, 0], [0, 0, 4], [0, 0, 1], [0, 0, 10]),
		bmt("Ocean", 		"~", 	"Blue", 	"~", 1, 	[0, 1], [2, 1, 0], [0, 0, 0], [0, 0, 0]),
		bmt("Ocean-Fish", 	"~f", 	"Blue", 	"~f", 1, 	[0, 1], [2, 3, 0], [0, 0, 0], [0, 0, 0]),
		bmt("Ocean-Whales", 	"~w", 	"Blue", 	"~w", 1, 	[0, 1], [3, 2, 2], [0, 0, 0], [0, 0, 0]),
		bmt("Plains",		"p",	"Yellow", 	"p", 1,		[1, 0], [0, 1, 1], [1, 1, 0], [2, 5, 0]),
		bmt("Plains-Buffalo",	"pb",	"Yellow", 	"pb", 1,	[1, 0], [0, 1, 3], [1, 1, 0], [2, 5, 0]),
		bmt("Plains-Wheat",	"pw",	"Yellow", 	"pw", 1,	[1, 0], [0, 3, 1], [1, 1, 0], [2, 5, 0]),
		bmt("Swamp", 		"s",	"DarkGreen", 	"s", 1.5, 	[2, 0], [0, 1, 0], [0, 0, 0], [0, 0, 0]),
		bmt("Swamp-Peat", 	"sp",	"DarkGreen", 	"sp", 1.5, 	[2, 0], [0, 1, 4], [0, 0, 0], [0, 0, 0]),
		bmt("Swamp-Spice", 	"ss",	"DarkGreen", 	"ss", 1.5, 	[2, 0], [4, 3, 0], [0, 0, 0], [0, 0, 0]),
		bmt("Tundra", 		"t", 	"LightGray", 	"t", 1, 	[1, 0], [0, 1, 0], [0, 1, 0], [0, 5, 0]),
		bmt("Tundra-Oxen", 	"to", 	"LightGray", 	"to", 1, 	[1, 0], [0, 3, 1], [0, 1, 0], [0, 5, 0]),
		bmt("Tundra-Furs", 	"tf", 	"LightGray", 	"tf", 1, 	[1, 0], [3, 2, 0], [0, 1, 0], [0, 5, 0]),
	];

	ArrayHelper.addLookupsToArray(mapTerrains);

	Direction.Instances = new Direction_Instances();

	var directions = Direction.Instances._All;

	var actionsAll = 
	[
		new Action_Delay(),
		new Action_Move(directions["East"]),
		new Action_Move(directions["North"]),
		new Action_Move(directions["South"]),
		new Action_Move(directions["West"]),
		new Action_Pass(),
		new Action_Sleep(),
	];

	var buttonSizeSmall = new Coords(2, 2);
	var buttonSize = new Coords(6, 2);

	var actionNameToButtonMappingsForMovers =
	[
		new ActionNameToButtonMapping("MoveEast", 	buttonSizeSmall,new Coords(5, 3), ">"),
		new ActionNameToButtonMapping("MoveNorth", 	buttonSizeSmall,new Coords(3, 1), "^"),
		new ActionNameToButtonMapping("MoveSouth", 	buttonSizeSmall,new Coords(3, 5), "v"),
		new ActionNameToButtonMapping("MoveWest", 	buttonSizeSmall,new Coords(1, 3), "<"),

		new ActionNameToButtonMapping("Delay", 		buttonSize, 	new Coords(1, 8), "Delay"),
		new ActionNameToButtonMapping("Pass", 		buttonSize, 	new Coords(1, 10), "Pass"),
		new ActionNameToButtonMapping("Sleep", 		buttonSize, 	new Coords(1, 12), "Sleep"),
	];

	var governmentDefns = 
	[
		new GovernmentDefn
		(
			"Despotism", // name,
			false, // hasSenate,
			3, // maxCitizensPerBaseBeforeUnhappiness,
			3, // maxCitizensPerBaseMadeContentByGarrison,
			0, // numberOfCitizensMadeUnhappyPerDeployedArmy,	
			0, // foodAddedPerCellWithIrrigation,
			0, // commerceAddedPerCellWithCommerce,
			0, // fractionOfCommercePerBaseWastedFlat,
			.3 // commercePerBaseWastedPerCellDistanceFromCapital,
		),

		new GovernmentDefn
		(
			"Monarchy", // name,
			false, // hasSenate,
			2, // maxCitizensPerBaseBeforeUnhappiness,
			3, // maxCitizensPerBaseMadeContentByGarrison,
			0, // numberOfCitizensMadeUnhappyPerDeployedArmy,	
			1, // foodAddedPerCellWithIrrigation,
			0, // commerceAddedPerCellWithCommerce,
			0, // fractionOfCommercePerBaseWastedFlat,
			.2 // commercePerBaseWastedPerCellDistanceFromCapital,
		),

		new GovernmentDefn
		(
			"Republic", // name,
			true, // hasSenate,
			1, // maxCitizensPerBaseBeforeUnhappiness,
			0, // maxCitizensPerBaseMadeContentByGarrison,
			1, // numberOfCitizensMadeUnhappyPerDeployedArmy,	
			1, // foodAddedPerCellWithIrrigation,
			1, // commerceAddedPerCellWithCommerce,
			0, // fractionOfCommercePerBaseWastedFlat,
			.1 // commercePerBaseWastedPerCellDistanceFromCapital,
		),

		new GovernmentDefn
		(
			"Democracy", // name,
			true, // hasSenate,
			0, // maxCitizensPerBaseBeforeUnhappiness,
			0, // maxCitizensPerBaseMadeContentByGarrison,
			2, // numberOfCitizensMadeUnhappyPerDeployedArmy,	
			1, // foodAddedPerCellWithIrrigation,
			2, // commerceAddedPerCellWithCommerce,
			0, // fractionOfCommercePerBaseWastedFlat,
			0 // commercePerBaseWastedPerCellDistanceFromCapital,
		),

		new GovernmentDefn
		(
			"Communism", // name,
			false, // hasSenate,
			0, // maxCitizensPerBaseBeforeUnhappiness,
			3, // maxCitizensPerBaseMadeContentByGarrison,
			0, // numberOfCitizensMadeUnhappyPerDeployedArmy,	
			1, // foodAddedPerCellWithIrrigation,
			0, // commerceAddedPerCellWithCommerce,
			.1, // fractionOfCommercePerBaseWastedFlat,
			0 // commercePerBaseWastedPerCellDistanceFromCapital,
		),
	];

	var entityDefnsForGovernmentDefns = EntityDefn.buildManyForProperties
	(
		governmentDefns
	);

	var id = ImprovementDefn;

	var improvementDefns = 
	[
		new id("Airport", 		1, 0, null, null, null			),
		new id("Aqueduct", 		1, 0, null, null, null			),
		new id("Bank", 			1, 0, null, null, [ "Marketplace" ]	),
		new id("Barracks", 		1, 0, null, null, null			),
		new id("Cathedral",		1, 0, null, null, [ "Temple" ] 		),
		new id("City Walls", 		3, 0, null, null, null			),
		new id("Coastal Fortress", 	1, 0, null, null, null			),
		new id("Colosseum",		3, 0, null, null, null			),
		new id("Courthouse", 		1, 0, null, null, null			),
		new id("Factory", 		1, 0, null, null, null			),
		new id("Harbor", 		1, 0, null, null, null			),
		new id("Hydroelectric Plant", 	1, 0, null, null, null			),
		new id("Library",		1, 0, null, null, null			),
		new id("Granary",		1, 0, null, null, null			),
		new id("Manufacturing Plant", 	1, 0, null, null, null			),
		new id("Marketplace",		1, 0, null, null, null			),
		new id("Mass Transit",		1, 0, null, null, null			),
		new id("Missile Battery", 	1, 0, null, null, null			),
		new id("Nuclear Plant", 	1, 0, null, null, null			),
		new id("Offshore Platform", 	1, 0, null, null, null			),
		new id("Police Station",	1, 0, null, null, null			),
		new id("Port Facility", 	1, 0, null, null, null			),
		new id("Power Plant", 		1, 0, null, null, null			),
		new id("Recycling Center", 	1, 0, null, null, null			),
		new id("Research Lab", 		1, 0, null, null, null			),
		new id("SDI Defense", 		1, 0, null, null, null			),
		new id("Sewer System",		1, 0, null, null, [ "Aqueduct" ]	),
		new id("Solar Plant", 		1, 0, null, null, null			),
		new id("Stock Exchange", 	1, 0, null, null, [ "Bank" ]		),
		new id("Superhighways", 	1, 0, null, null, null			),
		new id("Temple",		1, 0, null, null, null			),
		new id("University", 		1, 0, null, null, [ "Library" ]	),
	];

	var entityDefnsForImprovementDefns = EntityDefn.buildManyForProperties
	(
		improvementDefns
	);	

	var entityDefnForBase = new EntityDefn
	(
		"Base",
		[
			new ActorDefn
			(
				null, // activityDefnName
				[					
					new ActionNameToButtonMapping("Pass", new Coords(3, 2), new Coords(1, 1), "Pass"),
				]
			),
			new BaseDefn(),
			new DrawableDefn(new VisualTextBanner("B", mapCellSizeInPixels)),
			new ObserverDefn(2),
			new TurnableDefn(BaseData.updateEntityForTurn)
		]
	);

	var unitSizeInPixels = mapCellSizeInPixels.clone().multiplyScalar(.75);

	var observerDefn1 = new ObserverDefn(1);
	var killableDefn1 = new KillableDefn(1);
	var turnableDefnForMovers = new TurnableDefn
	(
		MoverData.updateEntityForTurn	
	);

	function buildEntityDefnForMover
	(
		name, 
		industryToBuild, 
		attackDefendTypeName,
		attackStrength, 
		defenseStrength,
		movementTypeName,
		movesPerTurn
	)
	{
		var returnValue = new EntityDefn
		(
			name,
			[
				new ActorDefn(null, actionNameToButtonMappingsForMovers),
				new BuildableDefn
				(
					industryToBuild, 
					MoverData.buildEntityForDefnByBuilder
				),
				new DrawableDefn
				(
					new VisualTextBanner
					(
						name.substring(0, 3), 
						unitSizeInPixels
					)
				),
				killableDefn1,
				new MoverDefn
				(
					[ new AttackDefense(attackDefendTypeName, attackStrength) ],
					[ new AttackDefense(attackDefendTypeName, defenseStrength) ],
					movementTypeName,
					movesPerTurn
				),
				observerDefn1,
				turnableDefnForMovers,
			]
		);

		return returnValue;
	}

	var air 	= "Air";
	var ground 	= "Ground";
	var melee 	= "Melee";
	var water 	= "Water";

	var bedfm = buildEntityDefnForMover;

	var entityDefnsForLocatables = 
	[
		entityDefnForBase,

		bedfm("AEGIS Cruiser",		100, melee, 8,	8, water, 5),
		bedfm("Alpine Troopers",	50, melee, 5, 	5, ground, 1),
		bedfm("Archers", 		30, melee, 3, 	2, ground, 1),
		bedfm("Artillery", 		50, melee, 10, 	1, ground, 1),
		bedfm("Battleship",		160, melee, 12, 12, water, 4),
		bedfm("Bomber",			120, melee, 12, 1, air, 8),
		bedfm("Cannon", 		40, melee, 8, 	1, ground, 1),
		bedfm("Caravan", 		50, melee, 0, 	1, ground, 1),
		bedfm("Caravel",		40, melee, 2, 	1, water, 3),
		bedfm("Carrier",		160, melee, 1, 	9, water, 5),
		bedfm("Catapult", 		40, melee, 6,	1, ground, 1),
		bedfm("Cavalry",		60, melee, 8, 	3, ground, 2),
		bedfm("Chariots", 		30, melee, 3, 	1, ground, 2),
		bedfm("Cruise Missile",		60, melee, 18, 	0, air, 12),
		bedfm("Cruiser",		80, melee, 6, 	6, water, 5),
		bedfm("Crusaders", 		40, melee, 5, 	1, ground, 2),
		bedfm("Destroyer",		60, melee, 4, 	4, water, 6),
		bedfm("Diplomat", 		30, null,  0, 	0, ground, 2),
		bedfm("Dragoons", 		50, null,  5, 	2, ground, 2),
		bedfm("Elephants",		40, melee, 4, 	1, ground, 2),
		bedfm("Engineers",		40, melee, 0, 	2, ground, 2),
		bedfm("Explorer",		30, melee, 0, 	1, ground, 3),
		bedfm("Fanatics", 		20, melee, 4, 	4, ground, 1),
		bedfm("Fighter",		60, melee, 4, 	3, air, 10),
		bedfm("Freight", 		50, melee, 0, 	1, ground, 2),
		bedfm("Frigate", 		50, melee, 4, 	2, water, 4),
		bedfm("Galleon",		40, melee, 0, 	2, water, 4),
		bedfm("Helicopter",		100, melee, 10, 3, air, 6),
		bedfm("Hoplites",		20, melee, 1, 	2, ground, 1),
		bedfm("Howitzer",		70, melee, 12, 	2, ground, 2),
		bedfm("Ironclad",		60, melee, 4, 	4, water, 4),
		bedfm("Knights",		40, melee, 4, 	2, ground, 2),
		bedfm("Marines", 		60, melee, 8, 	5, ground, 2),
		bedfm("Mechanized Infantry",  	50, melee, 6, 	6, ground, 3),
		bedfm("Musketeers", 		30, melee, 3, 	3, ground, 1),
		bedfm("Nuclear Missile",	160, melee, 0, 	0, air, 16),
		bedfm("Paratroopers",		60, melee, 6, 	4, ground, 1),
		bedfm("Partisans",		50, melee, 4, 	4, ground, 1),
		bedfm("Pikemen",		20, melee, 1, 	2, ground, 1),
		bedfm("Riflemen", 		40, melee, 5, 	4, ground, 1),
		bedfm("Riders",			20, melee, 2,   1, ground, 2),
		bedfm("Settlers",		40, melee, 0, 	1, ground, 1),
		bedfm("Spy",			30, melee, 0, 	0, ground, 3),
		bedfm("Stealth Fighter",	80, melee, 8, 	4, air, 14),
		bedfm("Stealth Bomber",		160, melee, 14, 5, air, 12),
		bedfm("Submarine",		60, melee, 10, 	2, water, 3),
		bedfm("Swordsmen",		40, melee, 4, 	2, ground, 1),
		bedfm("Tanks",			80, melee, 10, 	5, ground, 3),
		bedfm("Transport",		50, melee, 0, 	3, water, 5),
		bedfm("Trireme",		40, melee, 1, 	1, water, 3),
		bedfm("Warriors",		10, melee, 1, 	1, ground, 1),
	];

	var td = TechnologyDefn;

	var technologyDefns = 
	[
		new td("Basic", 		10, [], 					[ "Barracks", "Riders", "Settlers", "Warriors" ]),  

		new td("Advanced Flight", 	10, [ "Machine Tools", "Radio" ], 		[ "Bomber" ]					),
		new td("Alphabet", 		10, [], 					[ ] 						),  
		new td("Amphibious Warfare",	10, [ "Navigation", "Tactics" ], 		[ ]						),
		new td("Astronomy", 		10, [ "Mathematics", "Mysticism" ], 		[ ]						),
		new td("Atomic Theory", 	10, [ "Physics", "Theory of Gravity" ], 	[ ]						),
		new td("Automobile",		10, [ "Combustion", "Steel" ], 			[ ]						),
		new td("Banking", 		10, [ "The Republic", "Trade" ], 		[ ]						),
		new td("Bridge Building", 	10, [ "Construction", "Iron Working" ], 	[ ]						),
		new td("Bronze Working", 	10, [], 					[ "Hoplites" ]					),
		new td("Ceremonial Burial", 	10, [], 					[ "Temple" ]		 			),
		new td("Chemistry",		10, [ "Medicine", "University" ], 		[ ]						),
		new td("Chivalry",		10, [ "Feudalism", "Horseback Riding" ], 	[ "Knights" ]					),
		new td("Code of Laws", 		10, [ "Alphabet" ], 				[ "Courthouse" ] 				),
		new td("Combined Arms",		10, [ "Advanced Flight", "Mobile Warfare" ], 	[ ]						),
		new td("Combustion",		10, [ "Explosives", "Refining" ], 		[ ]						),
		new td("Communism",		10, [ "Industrialization", "Philosophy" ], 	[ ]						),
		new td("Computers",		10, [ "Mass Production", "Miniaturization" ], 	[ ]						),
		new td("Conscription", 		10, [ "Democracy", "Metallurgy" ], 		[ ]						),
		new td("Construction", 		10, [ "Currency", "Masonry" ], 			[ "Aqueduct", "Colosseum" ]			),
		new td("The Corporation", 	10, [ "Economics", "Industrialization" ], 	[ ]						),
		new td("Currency", 		10, [ "Bronze Working" ], 			[ "Marketplace" ] 				),
		new td("Democracy",		10, [ "Banking", "Invention" ], 		[ ]						),
		new td("Economics", 		10, [ "Banking", "University" ],		[ ]						),
		new td("Electricity", 		10, [ "Magnetism", "Metallurgy" ], 		[ ]						),
		new td("Electronics", 		10, [ "Electricity", "" ], 			[ ]						),
		new td("Engineering", 		10, [ "Construction", "The Wheel" ], 		[ ]						),
		new td("Environmentalism", 	10, [ "Recycling", "Space Flight" ], 		[ ]						),
		new td("Espionage", 		10, [ "Communism", "Democracy" ], 		[ ]						),
		new td("Explosives", 		10, [ "Chemistry", "Gunpowder" ], 		[ ]						),
		new td("Feudalism",		10, [ "Monarchy", "Warrior Code" ], 		[ ]						),
		new td("Flight", 		10, [ "Combustion", "Theory of Gravity" ],	[ "Fighter" ]					),
		new td("Fundamentalism", 	10, [ "Conscription", "Monotheism" ], 		[ ]						),
		new td("Fusion Power", 		10, [ "Nuclear Power", "Superconductor" ], 	[ ]						),
		new td("Genetic Engineering",	10, [ "The Corporation", "Recycling" ], 	[ ]						),
		new td("Guerilla Warfare", 	10, [ "Communism", "Tactics" ], 		[ ]						),
		new td("Gunpowder", 		10, [ "Invention", "Iron Working" ], 		[ "Musketeers" ]				),
		new td("Horseback Riding", 	10, [], 					[ "Riders" ]		 			),
		new td("Industrialization", 	10, [ "Banking", "Railroad" ], 			[ ]						),
		new td("Invention", 		10, [ "Engineering", "Literacy" ], 		[ ]						),
		new td("Iron Working", 		10, [ "Bronze Working" ], 			[ "Swordsmen" ] 				),		
		new td("Labor Union", 		10, [ "Guerilla Warfare", "Mass Production" ], 	[ ]						),
		new td("The Laser",		10, [ "Mass Production", "Nuclear Power" ], 	[ ]						),
		new td("Leadership",		10, [ "Chivalry", "Gunpowder" ], 		[ ]						),
		new td("Literacy",		10, [ "Code of Laws", "Writing" ], 		[ ]						),
		new td("Machine Tools", 	10, [ "Steel", "Tactics" ], 			[ ]						),
		new td("Magnetism",	 	10, [ "Iron Working", "Physics" ], 		[ ]						),
		new td("Map Making", 		10, [ "Alphabet" ], 				[ "Trireme" ] 					),
		new td("Masonry", 		10, [ ], 					[ "City Wall" ]					),
		new td("Mass Production", 	10, [ "Automobile", "The Corporation" ], 	[ ]						),
		new td("Mathematics", 		10, [ "Alphabet", "Masonry" ], 			[ "Catapult" ]					),
		new td("Medicine", 		10, [ "Philosophy", "Trade" ], 			[ ]						),
		new td("Metallurgy", 		10, [ "Gunpowder", "University" ], 		[ "Cannon" ]					),
		new td("Monarchy", 		10, [ "Ceremonial Burial", "Code of Laws" ], 	[ ]						),
		new td("Miniaturization", 	10, [ "Electronics", "Machine Tools" ], 	[ ]						),
		new td("Mobile Warfare", 	10, [ "Automobile", "Tactics" ], 		[ ]						),
		new td("Monotheism", 		10, [ "Philosophy", "Polytheism" ], 		[ "Cathedral" ]					),
		new td("Mysticism", 		10, [ "Ceremonial Burial" ], 			[ ] 						),
		new td("Navigation", 		10, [ "Literacy", "Seafaring" ], 		[ ]						),
		new td("Nuclear Fission", 	10, [ "Atomic Theory", "Mass Production" ], 	[ "Nuclear Missile" ]				),
		new td("Nuclear Power", 	10, [ "Electronics", "Nuclear Fission" ], 	[ ]						),
		new td("Philosophy", 		10, [ "Literacy", "Mysticism" ], 		[ ]						),
		new td("Physics", 		10, [ "Literacy", "Navigation" ], 		[ ]						),
		new td("Plastics", 		10, [ "Refining", "Space Flight" ], 		[ ]						),
		new td("Polytheism", 		10, [ "Ceremonial Burial", "Horseback Riding" ],[ "Elephants" ]					),
		new td("Pottery", 		10, [], 					[ "Granary" ] 					),  
		new td("Radio",			10, [ "Electricity", "Flight" ], 		[ ]						),
		new td("Railroad",		10, [ "Bridge Building", "Steam Engine" ], 	[ ]						),
		new td("Recycling",		10, [ "Democracy", "Mass Production" ], 	[ ]						),
		new td("Refining", 		10, [ "Chemistry", "The Corporation" ], 	[ ]						),
		new td("Refrigeration", 	10, [ "Electricity", "Sanitation" ], 		[ ]						),
		new td("The Republic",		10, [ "Code of Laws", "Literacy" ], 		[ ]						),
		new td("Robotics", 		10, [ "Computers", "Mobile Warfare" ], 		[ ]						),
		new td("Rocketry",		10, [ "Advanced Flight", "Electronics" ], 	[ ]						),
		new td("Sanitation",		10, [ "Engineering", "Medicine" ], 		[ ]						),
		new td("Space Flight",		10, [ "Computers", "Rocketry" ],		[ ]						),
		new td("Steam Engine",		10, [ "Invention", "Physics" ], 		[ "Ironclad" ]					),
		new td("Seafaring",		10, [ "Map Making", "Pottery" ], 		[ ]						),
		new td("Stealth",		10, [ "Robotics", "Superconductor" ], 		[ ]						),
		new td("Steel",			10, [ "Electricity", "Industrialization" ], 	[ ]						),
		new td("Superconductor",	10, [ "The Laser", "Plastics" ],		[ ]						),
		new td("Tactics",		10, [ "Conscription", "Leadership" ], 		[ ]						),
		new td("Theology", 		10, [ "Feudalism", "Monotheism" ], 		[ ]						),
		new td("Theory of Gravity", 	10, [ "Astronomy", "University" ], 		[ ]						),
		new td("Trade",			10, [ "Code of Laws", "Currency" ], 		[ ]						),
		new td("University",		10, [ "Mathematics", "Philosophy" ], 		[ ]						),
		new td("Warrior Code", 		10, [], 					[ "Archers" ] 					),
		new td("The Wheel", 		10, [ "Horseback Riding" ],			[ "Chariots" ] 					),  
		new td("Writing", 		10, [ "Alphabet" ], 				[ "Diplomat" ] 					),
	];

	var entityDefnsForTechnologyDefns = EntityDefn.buildManyForProperties
	(
		technologyDefns
	);

	var entityDefnFaction = new EntityDefn
	(
		"Faction",
		[
			new ActorDefn("UserInputAccept", []),
			new TurnableDefn(FactionData.updateEntityForTurn),
		]
	);

	var universeDefn = new UniverseDefn
	(
		actionsAll,
		activityDefns,
		resourceDefns,
		movementTypes,
		mapTerrains,
		[
			entityDefnsForGovernmentDefns,
			entityDefnsForLocatables,
			entityDefnsForTechnologyDefns,	
			entityDefnsForImprovementDefns,
			[ entityDefnFaction ],
		]
	);

	return universeDefn;
}
