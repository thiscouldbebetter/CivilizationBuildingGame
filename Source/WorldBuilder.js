
function WorldBuilder
(
	worldName, 
	numberOfFactions, 
	mapTerrains, 
	mapSizeInCells, 
	mapCellSizeInPixels
)
{
	this.worldName = worldName;
	this.name = "WorldBuilder_" + this.worldName;
	this.numberOfFactions = numberOfFactions;
	this.mapTerrains = mapTerrains;
	this.mapSizeInCells = mapSizeInCells;
	this.mapCellSizeInPixels = mapCellSizeInPixels;
}

{
	// instance methods

	WorldBuilder.prototype.mapGenerate = function()
	{
		var cells = [];
		var terrainCodeChar = ".";

		for (var y = 0; y < this.mapSizeInCells.y; y++)
		{
			for (var x = 0; x < this.mapSizeInCells.x; x++)
			{
				var cell = new MapCell
				(
					terrainCodeChar, 
					[], 
					[]
				);
				cells.push(cell);
			}
		}

		var returnValue = new Map
		(
			this.mapTerrains, 
			this.mapCellSizeInPixels,
			this.mapSizeInCells, 
			cells
		);
		
		return returnValue;		
	}

	WorldBuilder.prototype.worldGenerate = function()
	{
		var map = this.mapGenerate();

		var factionDatas = [];

		var factionDefns = 
		[
			new FactionDefn("Red", 		"Red", 		[ "Bloodpool" ]  ),
			new FactionDefn("Orange", 	"Orange", 	[ "Valencia" ]   ),
			new FactionDefn("Yellow", 	"Yellow", 	[ "Amarillo" ] 	 ),
			new FactionDefn("Green", 	"Green", 	[ "Greenville" ] ),
			new FactionDefn("Cyan", 	"Cyan", 	[ "Sky City" ]  ),
			new FactionDefn("Blue", 	"Blue", 	[ "Bluemont" ]  ),
			new FactionDefn("Violet", 	"Violet", 	[ "Port Royale" ] ),
			new FactionDefn("White", 	"White", 	[ "Casablanca" ] ),
		];

		var factionDefnsNotYetUsed = factionDefns.slice();

		for (var i = 0; i < this.numberOfFactions; i++)
		{
			var factionDefnIndex = Math.floor
			(	
				Math.random() * factionDefnsNotYetUsed.length
			);
factionDefnIndex = 0;
			var factionDefn = factionDefnsNotYetUsed[factionDefnIndex];
			factionDefnsNotYetUsed.splice(factionDefnIndex, 1);

			var baseName = factionDefn.baseNames[0];
			var basePos = new Coords().randomize().multiply
			(
				this.mapSizeInCells
			).floor();

basePos = new Coords(2 + i, 2 + i);

			var factionData = new FactionData
			(
				factionDefn.name,
				factionDefn.color,
				"Despotism",
				new Faction_FiscalData
				(
					0, // wealthStockpiled
					// fractionsOfCommerce
					[
						new Resource("Wealth", .4), 
						new Resource("Research", .5), 
						new Resource("Luxuries", .1),
					]
				),
				new Faction_ResearchData
				(
					0, // researchStockpiled
					null, // nameOfTechnologyBeingResearched
					// namesOfTechnologiesKnown
					[
						"Basic"
					]
				),
				new Activity("UserInputAccept"),
				// entities
				[
					new Entity
					(
						"Base", 
						[
							new BaseData
							(
								baseName, // name
								new BaseData_Demographics
								(
									3, // population
									0, // foodStockpiled
									null // offsetsOfMapCellsInUse
								),
								new BaseData_Improvements(),
								new BaseData_Industry(null, 0),
								new BaseData_Support()
							),
							new LocatableData(basePos.clone()),
						]
					),
					new Entity
					(
						"Warriors", 
						[
							new LocatableData(basePos.clone()),
							new MoverData(baseName),
						]
					),
				]
			);	

			factionDatas.push(factionData);
		}

		var returnValue = new World
		(
			this.worldName,
			map,
			new Camera
			(
				new Coords(1, 1), // viewSize
				new Coords(0, 0) // pos
			), 
			// entitySets
			[
				Entity.buildManyForDefnNameAndProperties("Faction", factionDatas),
			]
		);

		return returnValue;
	}

	// controllable

	WorldBuilder.prototype.handleEventButtonBuildClicked = function (event)
	{
		var world = this.worldGenerate();
		var universe = Globals.Instance.universe;
		universe.venueAdd(world);
		universe.nameOfVenueNext = world.name;			
	}

	WorldBuilder.prototype.controlUpdate = function()
	{
		if (this.control == null)
		{
			var style = ControlStyle.Instances().Default;

			var control = new ControlContainer
			(
				"containerWorldBuilder",
				this,
				style, 
				new Coords(11, 10), // size, 
				new Coords(0, 0), // pos, 
				// children
				[
					new ControlLabel("labelWorldBuilder", this, style, new Coords(0, 0), "World Builder"),	
					new ControlLabel("labelMapSize", this, style, new Coords(1, 2), "Map Size:"),
					new ControlSelectBox
					(
						"listboxMapSize", 
						this, 
						style, 
						new Coords(6, 1), // size, 
						new Coords(4, 2), // pos, 
						new Coords(5, 1), // sizePerItem, 
						[
							new ControlSelectBoxItem(new Coords(16, 16), style, "Tiny (16x16)"),
							new ControlSelectBoxItem(new Coords(32, 32), style, "Small (32x32)"),
							new ControlSelectBoxItem(new Coords(64, 64), style, "Medium (64x64)"),
							new ControlSelectBoxItem(new Coords(96, 96), style, "Large (96x96)"),
							new ControlSelectBoxItem(new Coords(128, 128), style, "Huge (128x128)"),
						],
						null, // selectedItemChanged
						"mapSizeInCells", // bindingPath
						null // idPathOfSelectables
					),
					new ControlLabel("labelFactions", this, style, new Coords(1, 3), "Factions:"),
					new ControlNumberBox
					(
						"numberBoxFactions", 
						this, 
						style, 
						new Coords(2, 1), // size
						new Coords(4, 3), // pos 
						2, 7, // min, max
						"numberOfFactions" // nameOfPropertyBound
					),
					new ControlButton
					(
						"buttonBuild",
						this,
						style,
						new Coords(5, 2), // size
						new Coords(1, 7), // pos
						new VisualText("Build"),
						this.handleEventButtonBuildClicked.bind(this)
					),
				]
			);

			this.control = control;
		}

		return this.control;
	}

	// venue

	WorldBuilder.prototype.finalizeAsVenue = function()
	{
		document.body.removeChild(this.control.htmlElement);
	}

	WorldBuilder.prototype.initializeAsVenue = function()
	{
		document.body.appendChild(this.controlUpdate().htmlElement);	
	}

	WorldBuilder.prototype.updateForTimerTickAsVenue = function()
	{
		this.controlUpdate();
	}
}
