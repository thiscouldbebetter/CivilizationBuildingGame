
function World
(
	name, 
	map,
	camera, 
	entitySets
)
{
	this.name = name;
	this.map = map;
	this.entitySets = entitySets;

	this.entities = [];
	this.entitiesByCategoryName = [];
	this.entitiesToSpawn = [];

	for (var i = 0; i < entitySets.length; i++)
	{
		var entitySet = entitySets[i];
		for (var e = 0; e < entitySet.length; e++)
		{
			var entity = entitySet[e];
			this.entitySpawn(entity);
		}
	}

	this.factionIndexSelected = null;

	this.turnsSoFar = 0;
}

{
	World.prototype.entitySelected = function()
	{
		return this.factionSelected().factionData.factionableSelected();
	}

	World.prototype.entitySelectedAdvance = function()
	{
		var factionSelected = this.factionSelected();
		if (factionSelected == null)
		{
			this.factionSelectedAdvance();
			factionSelected = this.factionSelected();
		}

		factionSelected.factionData.factionableSelectedAdvance();

		var factionableSelected = factionSelected.factionData.factionableSelected();

		if (factionableSelected == null)
		{
			this.factionSelectedAdvance();
			factionSelected = this.factionSelected();
			factionSelected.factionData.factionableSelectedAdvance();
			factionableSelected = factionSelected.factionData.factionableSelected();
		}

		var actorDefn = factionableSelected.defn().actorDefn;

		Globals.Instance.inputHelper.actionNamesAvailable_Set
		(
			actorDefn.actionNamesAvailable
		);
	}

	World.prototype.factions = function()
	{
		return this.entitiesByCategoryName["FactionData"];
	}

	World.prototype.factionSelected = function()
	{
		return (this.factionIndexSelected == null ? null : this.factions()[this.factionIndexSelected]);
	}

	World.prototype.factionSelectedAdvance = function()
	{
		var returnValue;

		var factionSelectedPrevious = this.factionSelected();
		if (factionSelectedPrevious == null)
		{
			this.factionIndexSelected = 0;
		}
		else
		{
			factionSelectedPrevious.actorData.activity.isActive = false;

			this.factionIndexSelected++;
			if (this.factionIndexSelected >= this.factions().length)
			{
				this.factionIndexSelected = 0;
				this.turnAdvance();
			}
		}

		var factionSelected = this.factionSelected();
		factionSelected.actorData.activity.isActive = true;
		factionSelected.factionData.factionableIndexSelected = null;

		return factionSelected;
	}

	World.prototype.turnAdvance = function()
	{
		this.turnsSoFar++;

		var turnables = this.turnables();
		for (var i = 0; i < turnables.length; i++)
		{
			var turnable = turnables[i];
			turnable.defn().turnableDefn.updateEntityForTurn(turnable);
			turnable.turnableData.updateEntityForTurn(turnable);
		}
	}

	World.prototype.turnables = function()
	{
		return this.entitiesByCategoryName["TurnableDefn"];
	}

	// controls

	World.prototype.controlUpdate = function()
	{
		if (this.control == null)
		{
			var style = ControlStyle.Instances().Default;

			var factions = this.factions();
			for (var i = 0; i < factions.length; i++)
			{
				factions[i].factionData.controlUpdate(style, new Coords(1, 3));
			}

			var control = new ControlContainer
			(
				"containerWorld", 
				this, 
				style, 
				new Coords(12, 49), // size, 
				new Coords(18, 1), // pos, 
				// children
				[
					new ControlLabel("labelTurn", this, style, new Coords(1, 1), "Turn:"),
					new ControlLabel("infoTurn", this, style, new Coords(3, 1), "[turn]"),
					factions[0].factionData.control
				] 
			);

			control.htmlElementUpdate();

			this.control = control;
		}

		if (this.control.hasBeenModified == true)
		{
			this.control.hasBeenModified = false;

			var factionData = this.factionSelected().factionData;

			this.control.children["infoTurn"].text_Set(this.turnsSoFar + 1);
			this.control.childAddOrReplace(factionData.controlUpdate());

			var entitySelected = factionData.factionableSelected();
			var entitySelectedControl = entitySelected.controlUpdate
			(
				this.control.style, 
				new Coords(1, 20)
			);

			this.control.childAddOrReplace
			(
				entitySelectedControl
			);

			this.control.htmlElementUpdate();
		}

		return this.control;
	}

	// venue

	World.prototype.entitySpawn = function(entity)
	{
		this.entities[entity.name] = entity;
		this.entities.push(entity);

		var entityDefn = entity.defn();

		for (var p = 0; p < entity.properties.length; p++)
		{
			var property = entity.properties[p];
			var categoryName = property.constructor.name;
			var entitiesInCategory = this.entitiesByCategoryName[categoryName];
			if (entitiesInCategory == null)
			{
				entitiesInCategory = [];
				this.entitiesByCategoryName[categoryName] = entitiesInCategory;
			}
			entitiesInCategory[property.name] = entity;
			entitiesInCategory.push(entity);
		}

		for (var p = 0; p < entityDefn.properties.length; p++)
		{
			var property = entityDefn.properties[p];
			var categoryName = property.constructor.name;
			var entitiesInCategory = this.entitiesByCategoryName[categoryName];
			if (entitiesInCategory == null)
			{
				entitiesInCategory = [];
				this.entitiesByCategoryName[categoryName] = entitiesInCategory;
			}
			entitiesInCategory[property.name] = entity;
			entitiesInCategory.push(entity);
		}
	}

	World.prototype.initializeAsVenue = function()
	{
		var entities = this.entities;
		for (var i = 0; i < entities.length; i++)
		{
			var entity = entities[i];
			entity.initializeForVenue(this);
		}

		this.entitySelectedAdvance();

		Globals.Instance.display.drawControl
		(
			this.controlUpdate()
		);
	}

	World.prototype.updateForTimerTickAsVenue = function()
	{
		var entitySelected = this.entitySelected();

		// hack
		if (entitySelected == null)
		{
			this.entitySelectedAdvance(); 
			entitySelected = this.entitySelected(); 
		}

		if (entitySelected.turnableData.isDoneForThisTurn == true)
		{
			this.entitySelectedAdvance();
		}

		var globals = Globals.Instance;

		globals.display.drawWorld(this);

		for (var i = 0; i < this.entitiesToSpawn.length; i++)
		{
			var entity = this.entitiesToSpawn[i];
			this.entitySpawn(entity);
		}

		this.entitiesToSpawn.length = 0;

		for (var i = 0; i < this.entities.length; i++)
		{
			var entity = this.entities[i];
			entity.updateForTimerTick(this);
		}

		this.controlUpdate();
	}
}
