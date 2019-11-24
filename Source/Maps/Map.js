
function Map(terrains, cellSizeInPixels, sizeInCells, cells)
{
	this.terrains = terrains;
	this.cellSizeInPixels = cellSizeInPixels;
	this.sizeInCells = sizeInCells;
	this.cells = cells;

	this.sizeInCellsMinusOnes = this.sizeInCells.clone().subtract
	(
		Coords.Instances.Ones
	);
}

{
	// static methods

	Map.buildBlank = function(terrains, cellSizeInPixels, sizeInCells)
	{
		var cells = [];

		for (var y = 0; y < sizeInCells.y; y++)
		{
			for (var x = 0; x < sizeInCells.x; x++)
			{
				cells.push(null);
			}
		}

		var returnValue = new Map
		(
			terrains, 
			cellSizeInPixels,
			sizeInCells, 
			cells
		);

		return returnValue;
	}

	Map.buildFromStrings = function(terrains, cellSizeInPixels, cellsAsStrings)
	{
		var sizeInCells = new Coords
		(
			cellsAsStrings[0].length,
			cellsAsStrings.length
		);

		var cells = [];

		for (var y = 0; y < sizeInCells.y; y++)
		{
			var cellRowAsString = cellsAsStrings[y];

			for (var x = 0; x < sizeInCells.x; x++)
			{
				var terrainCodeCharAtCell = cellRowAsString[x];
				var cell = new MapCell(terrainCodeCharAtCell, [], []);
				cells.push(cell);
			}
		}

		var returnValue = new Map
		(
			terrains, 
			cellSizeInPixels,
			sizeInCells, 
			cells
		);

		return returnValue;
	}

	// instance methods

	Map.prototype.cellAtPos = function(cellPos)
	{
		return this.cells[this.indexOfCellAtPos(cellPos)];
	}

	Map.prototype.cellAtPos_Set = function(cellPos, valueToSet)
	{
		this.cells[this.indexOfCellAtPos(cellPos)] = valueToSet;
	}

	Map.prototype.overwriteWithCellsFromMapWithinBounds = function(other, bounds)
	{
		var cellPos = new Coords(0, 0);

		for (var y = bounds.min.y; y <= bounds.max.y; y++)
		{
			cellPos.y = y;

			for (var x = bounds.min.x; x <= bounds.max.x; x++)
			{
				cellPos.x = x;

				var cellToOverwriteWith = other.cellAtPos(cellPos);
				var cellToBeOverwritten = this.cellAtPos(cellPos);

				if (cellToBeOverwritten == null)
				{
					this.cellAtPos_Set
					(
						cellPos, 
						cellToOverwriteWith.clone()
					);
				}
				else
				{
					cellToBeOverwritten.overwriteWith
					(
						cellToOverwriteWith
					);
				}
			}
		}
	}

	Map.prototype.indexOfCellAtPos = function(cellPos)
	{
		return cellPos.y * this.sizeInCells.x + cellPos.x;
	}

	// cloneable

	Map.prototype.clone = function()
	{
		var returnValue = new Map
		(
			this.terrains,
			this.cellSizeInPixels,
			this.sizeInCells,
			Cloneable.cloneMany(this.cells)
		);

		return returnValue;
	}
}
