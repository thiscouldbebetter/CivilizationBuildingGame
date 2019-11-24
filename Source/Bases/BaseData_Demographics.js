
function BaseData_Demographics(population, foodStockpiled, areLocalMapCellsInUse)
{
	this.population = population;
	this.foodStockpiled = foodStockpiled;
	this.areLocalMapCellsInUse = areLocalMapCellsInUse;
}

{
	// constants

	BaseData_Demographics.offsetsOfMapCellsUsableBuild = function()
	{
		var returnValues = [];

		var radius = 2;

		for (var y = -radius; y <= radius; y++)
		for (var x = -radius; x <= radius; x++)
		{
			if 
			(
				( x != 0 || y != 0 )
				&&
				(
					Math.abs(x) < radius 
					|| Math.abs(y) < radius
				)
			)
			{
				var cellPos = new Coords(x, y);
				returnValues.push(cellPos);
			}
		}

		return returnValues;
	}

	BaseData_Demographics.offsetsOfMapCellsUsable = function()
	{
		if (BaseData_Demographics._offsetsOfMapCellsUsable == null)
		{
			BaseData_Demographics._offsetsOfMapCellsUsable =
				BaseData_Demographics.offsetsOfMapCellsUsableBuild();
		}
		return BaseData_Demographics._offsetsOfMapCellsUsable;
	}

	// instance methods

	BaseData_Demographics.prototype.addCellsOfMapInUseToList = function
	(
		map, 
		basePosInCells, 
		listToAddTo
	)
	{
		var offsetsOfMapCellsInUse = this.offsetsOfMapCellsInUse();
		var cellPos = new Coords(0, 0);

		for (var i = 0; i < offsetsOfMapCellsInUse.length; i++)
		{
			var offsetInCells = offsetsOfMapCellsInUse[i];
			cellPos.overwriteWith(basePosInCells).add(offsetInCells);
			var mapCell = map.cellAtPos(cellPos);
			if (mapCell != null)
			{
				listToAddTo.push(mapCell)
			}
		}

		return listToAddTo;
	}

	BaseData_Demographics.prototype.addCellsOfMapUsableToList = function
	(
		map, 
		basePosInCells, 
		listToAddTo
	)
	{
		var offsets = BaseData_Demographics.offsetsOfMapCellsUsable();
		var cellPos = new Coords(0, 0);

		for (var i = 0; i < offsets.length; i++)
		{
			var offsetInCells = offsets[i];
			cellPos.overwriteWith(basePosInCells).add(offsetInCells);
			var mapCell = map.cellAtPos(cellPos);
			if (mapCell != null)
			{
				listToAddTo.push(mapCell)
			}
		}

		return listToAddTo;
	}

	BaseData_Demographics.prototype.addResourcesProducedByMapCellsInUseToList = function
	(
		map,
		basePosInCells,
		listToAddTo
	)
	{
		var universe = Globals.Instance.universe;
		var resourceDefns = universe.defn.resourceDefns;

		for (var i = 0; i < resourceDefns.length; i++)
		{
			var resourceDefn = resourceDefns[i];
			var resourceDefnName = resourceDefn.name;
			if (listToAddTo[resourceDefnName] == null)
			{
				var resource = new Resource
				(
					resourceDefn.name,
					0
				);
				listToAddTo.push(resource);
				listToAddTo[resourceDefnName] = resource;
			}
		}

		var mapCells = this.addCellsOfMapInUseToList
		(
			map,
			basePosInCells,
			[]
		);

		for (var i = 0; i < mapCells.length; i++)
		{
			var mapCell = mapCells[i];
			var mapCellTerrain = mapCell.terrain();
			var resourcesProducedByCell = mapCellTerrain.resourcesProducedPerTurn;
			for (var r = 0; r < resourcesProducedByCell.length; r++)
			{
				var resourceFromCell = resourcesProducedByCell[r];
				var resourceDefnName = resourceFromCell.defnName;
				var resourceAccumulated = listToAddTo[resourceDefnName];
				resourceAccumulated.quantity += resourceFromCell.quantity;
			}
		}

		return listToAddTo;
	}

	BaseData_Demographics.prototype.initializeEntityForVenue = function(entity, venue)
	{
		if (this.areLocalMapCellsInUse == null)
		{
			this.areLocalMapCellsInUse = [];
			this.optimizeUsageOfLocalMapCellsForBase(entity);
		}
	}

	BaseData_Demographics.prototype.offsetsOfMapCellsInUse = function()
	{
		var returnValues = [];

		var usageRangeInCells = Math.floor(this.areLocalMapCellsInUse.length / 2);

		var cellOffset = new Coords(0, 0);

		for (var y = 0; y < this.areLocalMapCellsInUse.length; y++)
		{
			cellOffset.y = y;

			var areLocalMapCellsInUseRow = this.areLocalMapCellsInUse[y];

			for (var x = 0; x < areLocalMapCellsInUseRow.length; x++)
			{
				cellOffset.x = x;

				var isMapCellInUse = areLocalMapCellsInUseRow[x];

				if (isMapCellInUse == true)
				{
					returnValues.push(cellOffset.clone());
				}

			}
		} 

		return returnValues;
	}

	BaseData_Demographics.prototype.optimizeUsageOfLocalMapCellsForBase = function(base)
	{
		this.areLocalMapCellsInUse = 
		[
			[ null, false, false, false, null ],
			[ false, false, false, false, false ],
			[ false, false, true, false, false ],
			[ false, false, false, false, false ],
			[ null, false, false, false, null ],
		];

		var map = Globals.Instance.universe.world().map;
		var basePosInCells = base.locatableData.posInCells;

		var offsetsOfMapCellsUsable = BaseData_Demographics.offsetsOfMapCellsUsable();

		var mapCellOffsetsSortedByNumberOfResources = [];
		var cellPos = new Coords(0, 0);

		for (var i = 0; i < offsetsOfMapCellsUsable.length; i++)
		{
			var cellOffset = offsetsOfMapCellsUsable[i];
			cellPos.overwriteWith(basePosInCells).add(cellOffset);
			var mapCell = map.cellAtPos(cellPos);
			if (mapCell != null)
			{
				var resourcesProducedByCell = mapCell.terrain().resourcesProducedPerTurn;

				var numberOfResourcesProducedByCell = 0;
				for (var r = 0; r < resourcesProducedByCell.length; r++)
				{
					var resource = resourcesProducedByCell[r];
					numberOfResourcesProducedByCell += resource.quantity;

					var j;
					for (j = 0; j < mapCellOffsetsSortedByNumberOfResources.length; j++)
					{
						var numberOfResourcesExisting = mapCellOffsetsSortedByNumberOfResources[j][1];
						if (numberOfResourcesProducedByCell >= numberOfResourcesExisting)
						{
							break;
						}
					}

					mapCellOffsetsSortedByNumberOfResources.splice
					(
						j, // insert pos
						0, // don't remove any 
						[ cellOffset, numberOfResourcesProducedByCell ]
					);
				}
			}
		}

		var radius = 2;

		for (var i = 0; i < this.population; i++)
		{
			var cellOffset = mapCellOffsetsSortedByNumberOfResources[i][0];
			this.areLocalMapCellsInUse[cellOffset.y + radius][cellOffset.x + radius] = true;
		}
	}

	BaseData_Demographics.prototype.updateBaseForTurn = function(base)
	{
		var baseData = base.baseData;
		var resourcesProduced = baseData.resourcesProducedByBaseThisTurn(base);
		var foodProduced = resourcesProduced["Food"].quantity;

		var foodConsumed = this.population;

		this.foodStockpiled += (foodProduced - foodConsumed);

		if (this.foodStockpiled < 0)
		{
			this.foodStockpiled = 0;
		}
		else
		{
			var foodPerPopulationRequiredForGrowth = 4;
			var foodRequiredForGrowth = 
				this.population 
				* foodPerPopulationRequiredForGrowth;

			if (this.foodStockpiled >= foodRequiredForGrowth)
			{
				this.foodStockpiled = 0;
				this.population++;
			}
		}

		Control.setHasBeenModified(this.control);
	}

	// controls

	BaseData_Demographics.prototype.controlUpdate = function(base, style, pos)
	{
		if (this.control == null)
		{
			var controlsForMapCellsInUse = [];

			var cellPos = new Coords(0, 0);

			for (var y = 0; y < this.areLocalMapCellsInUse.length; y++)
			{
				cellPos.y = y;

				var areLocalMapCellsInUseRow = this.areLocalMapCellsInUse[y];

				for (var x = 0; x < areLocalMapCellsInUseRow.length; x++)
				{
					cellPos.x = x;

					var isCellInUse = areLocalMapCellsInUseRow[x];

					var controlForCell;

					if (isCellInUse == null)
					{
						controlForCell = new ControlLabel
						(
							"labelNothing",
							this,
							style,
							null, // pos
							""
						)
					}
					else
					{
						controlForCell = new ControlCheckbox
						(
							"checkboxMapCellOffset" + cellPos.toString(), 
							this,
							style, 
							null, // pos
							isCellInUse
						);
					}

					controlsForMapCellsInUse.push(controlForCell);
				}
			}

			var gridMapCellsInUse = new ControlGrid
			(
				"gridMapCellsInUse",
				this,
				style,
				new Coords(5, 5), // size
				new Coords(1, 4), // pos
				new Coords(5, 5), // gridSizeInCells
				controlsForMapCellsInUse
			);

			var control = new ControlContainer
			(
				"containerDemographics",
				this,
				style,
				new Coords(8, 10), // size
				pos,
				[
					new ControlLabel("labelPopulation", this, style, new Coords(1, 1), "Population:"),
					new ControlLabel("infoPopulation", this, style, new Coords(5, 1), this.population),

					new ControlLabel("labelFood", this, style, new Coords(1, 2), "Food:"),
					new ControlLabel("infoFood", this, style, new Coords(5, 2), this.foodStockpiled),

					new ControlLabel("labelLandUsage", this, style, new Coords(1, 3), "Land Usage:"),
					gridMapCellsInUse
				]
			);

			this.control = control;
		}

		if (this.control.hasBeenModified == true)
		{
			this.control.hasBeenModified = false;

			this.control.children["infoPopulation"].text_Set(this.population);
			this.control.children["infoFood"].text_Set(this.foodStockpiled);

			this.control.htmlElementUpdate();
		}

		return this.control;
	}
}
