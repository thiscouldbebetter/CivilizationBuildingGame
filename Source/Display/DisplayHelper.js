
function DisplayHelper(displaySizeInPixels, isColorEnabled)
{
	this.displaySizeInPixels = displaySizeInPixels;
	this.isColorEnabled = isColorEnabled;
}

{
	DisplayHelper.prototype.clear = function()
	{
		this.graphics.fillStyle = (this.isColorEnabled == true ? "Black" : "White");
		this.graphics.fillRect
		(
			0, 0, 
			this.displaySizeInPixels.x, 
			this.displaySizeInPixels.y
		);
	}

	DisplayHelper.prototype.drawControl = function(control)
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

	DisplayHelper.prototype.drawMapForCamera = function(map, camera)
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

	DisplayHelper.prototype.drawMapCellForCamera = function
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
			this.graphics.fillStyle = (this.isColorEnabled == true ? cellTerrain.color : "White");
			this.graphics.fillRect
			(
				this.drawPos.x,
				this.drawPos.y,
				mapCellSizeInPixels.x,
				mapCellSizeInPixels.y
			);
	
			this.drawVisualText
			(
				mapCellSizeInPixels,
				cellTerrain.visual,
				this.drawPos
			);

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

	DisplayHelper.prototype.drawFactionForCamera = function
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

	DisplayHelper.prototype.drawEntityForCamera = function
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

		this.drawVisualTextBanner
		(
			mapCellSizeInPixels,
			entity.defn().drawableDefn.visual,
			this.drawPos,
			factionColor,
			(isSelected == true ? "White" : "Gray")
		);
	}
	
	DisplayHelper.prototype.drawVisualText = function
	(
		mapCellSizeInPixels, 
		visualText, 
		drawPos
	)
	{
		this.graphics.fillStyle = "Gray";
		this.graphics.fillText
		(
			visualText.text,
			drawPos.x + mapCellSizeInPixels.x / 3,
			drawPos.y + mapCellSizeInPixels.y * .75
		);		
	}

	DisplayHelper.prototype.drawVisualTextBanner = function
	(
		mapCellSizeInPixels, 
		visualTextBanner, 
		drawPos,
		colorForFill,
		colorForTextAndBorder
	)
	{
		if (this.isColorEnabled == false)
		{
			colorForFill = "White";
			colorForTextAndBorder = "Gray";
		}

		var sizeInPixels = visualTextBanner.sizeInPixels;
		drawPos.multiplyScalar
		(
			2
		).add
		(
			mapCellSizeInPixels
		).subtract
		(
			sizeInPixels
		).divideScalar(2)

		this.graphics.fillStyle = colorForFill;
		this.graphics.fillRect
		(
			drawPos.x, drawPos.y,
			sizeInPixels.x, sizeInPixels.y		
		);

		this.graphics.strokeStyle = colorForTextAndBorder;
		this.graphics.strokeRect
		(
			drawPos.x, drawPos.y,
			sizeInPixels.x, sizeInPixels.y	
		);

		this.graphics.fillStyle = colorForTextAndBorder;
		this.graphics.fillText
		(
			visualTextBanner.text,
			drawPos.x + sizeInPixels.x * .25,
			drawPos.y + sizeInPixels.y * .75
		);		
	}

	DisplayHelper.prototype.drawWorld = function(world)
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

	DisplayHelper.prototype.initialize = function()
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
