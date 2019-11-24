
function Display(displaySizeInPixels)
{
	this.displaySizeInPixels = displaySizeInPixels;
}

{
	Display.prototype.clear = function()
	{
		this.graphics.fillStyle = "Black";
		this.graphics.fillRect
		(
			0, 0, 
			this.displaySizeInPixels.x, 
			this.displaySizeInPixels.y
		);
	}

	Display.prototype.drawControl = function(control)
	{
		var controlExisting = document.getElementById(control.name);
		if (controlExisting == null)
		{
			document.body.appendChild(control.htmlElement);
		}
		else
		{
			// todo
		}
	}

	Display.prototype.drawMapForCamera = function(map, camera)
	{
		var mapTerrains = map.terrains;
		var mapSizeInCells = map.sizeInCells;
		var mapCellSizeInPixels = map.cellSizeInPixels;

		var cellPos = new Coords(0, 0);

		for (var y = 0; y < mapSizeInCells.y; y++)
		{
			cellPos.y = y;

			for (var x = 0; x < mapSizeInCells.x; x++)
			{
				cellPos.x = x;

				var cellAtPos = map.cellAtPos(cellPos);
				this.drawMapCellForCamera
				(
					mapTerrains,
					mapCellSizeInPixels,
					cellPos,
					cellAtPos,
					camera
				);
			}
		}
	}

	Display.prototype.drawMapCellForCamera = function
	(
		mapTerrains, 
		mapCellSizeInPixels, 
		cellPos, 
		cell, 
		camera
	)
	{
		if (cell != null)
		{
			this.drawPos.overwriteWith
			(
				cellPos
			).multiply
			(
				mapCellSizeInPixels
			);

			var cellTerrainCodeChar = cell.terrainCodeChar;
			var cellTerrain = mapTerrains[cellTerrainCodeChar];
			cellTerrain.visual.draw(this, mapCellSizeInPixels, this.drawPos);

			var entitiesPresent = cell.entitiesPresent;

			for (var u = 0; u < entitiesPresent.length; u++)
			{
				var entityToDraw = entitiesPresent[u];

				this.drawEntityForCamera
				(
					mapCellSizeInPixels, 
					entityToDraw,
					camera,
					false // isSelected
				);
			}
		}
	}

	Display.prototype.drawFactionForCamera = function
	(
		mapCellSizeInPixels, 
		faction,
		camera
	)
	{
		for (var i = 0; i < faction.entities.length; i++)
		{
			var entity = faction.entities[i];
			this.drawEntityForCamera
			(
				mapCellSizeInPixels, 
				entity,
				camera,
				false // isSelected
			);
		}
	}

	Display.prototype.drawEntityForCamera = function
	(
		mapCellSizeInPixels, 
		entity,
		camera,
		isSelected
	)
	{
		this.drawPos.overwriteWith
		(
			entity.locatableData.posInPixels
		);

		var factionColor = entity.factionableData.faction().factionData.color;

		var visual = new VisualColors(factionColor, "Gray", entity.defn().drawableDefn.visual);
		visual.draw
		(
			this,
			mapCellSizeInPixels,
			this.drawPos
		);
	}

	Display.prototype.drawWorld = function(world)
	{
		this.clear();

		var factionSelected = world.factionSelected();
		this.drawMapForCamera
		(
			factionSelected.factionData.mapKnown, 
			world.camera
		);

		var mapCellSizeInPixels = world.map.cellSizeInPixels;

		var entitySelected = world.entitySelected();

		if (entitySelected != null)
		{
			this.drawEntityForCamera
			(
				mapCellSizeInPixels,
				entitySelected,
				world.camera,
				true // isSelected
			);
		}
	}

	Display.prototype.initialize = function()
	{
		this.canvas = document.createElement("canvas");
		this.canvas.width = this.displaySizeInPixels.x;
		this.canvas.height = this.displaySizeInPixels.y;

		this.canvas.style.position = "absolute";
		this.canvas.style.left = "16px";
		this.canvas.style.top = "16px";

		this.graphics = this.canvas.getContext("2d");
		this.graphics.font = "7pt Calibri";

		document.body.appendChild(this.canvas);

		this.drawPos = new Coords(0, 0);
	}
}
