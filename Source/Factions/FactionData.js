
function FactionData
(
	name, 
	color, 
	governmentName, 
	fiscalData, 
	research, 
	activity,
	factionables
)
{
	this.name = name;
	this.color = color;
	this.governmentName = governmentName;
	this.fiscalData = fiscalData;
	this.research = research;
	this.activity = activity;
	this.factionables = factionables;

	for (var i = 0; i < this.factionables.length; i++)
	{
		var factionable = this.factionables[i];
		factionable.factionableData = new FactionableData(this.name);
	}

	this.factionableIndexSelected = null;

	this.mapKnown = null;

	this.factionablesToRemove = [];
}

{
	// static methods

	FactionData.updateEntityForTurn = function(entity)
	{
		entity.factionData.research.updateFactionForTurn(entity);

		entity.factionData.factionableIndexSelected = null;
	}

	// instance methods

	FactionData.prototype.factionableSelected = function()
	{
		return (this.factionableIndexSelected == null ? null : this.factionables[this.factionableIndexSelected]);
	}

	FactionData.prototype.factionableSelectedAdvance = function()
	{
		var factionableIndexToSelect = this.factionableIndexSelected;

		if (this.factionables.length == 0)
		{
			factionableIndexToSelect = null;
		}
		else 
		{
			if (factionableIndexToSelect == null)
			{
				factionableIndexToSelect = 0;
			}
			else
			{
				var factionableSelectedOriginal = this.factionableSelected();

				for (var i = 0; i < this.factionables.length; i++)
				{
					factionableIndexToSelect++;
					if (factionableIndexToSelect >= this.factionables.length)
					{
						factionableIndexToSelect = 0;
					}

					var factionableToSelect = this.factionables[factionableIndexToSelect];
					if (factionableToSelect == factionableSelectedOriginal)
					{
						factionableIndexToSelect = null;
						break;
					}
					else
					{
						if (factionableToSelect.turnableData.isDoneForThisTurn == false)
						{
							break;
						}
					}
				}
			}
		}

		this.factionableIndexSelected = factionableIndexToSelect;
	}

	// controllable

	FactionData.prototype.controlUpdate = function(style, pos)
	{
		if (this.control == null)
		{
			var control = new ControlContainer
			(
				"containerFaction", 
				this,
				style, 
				new Coords(10, 16), // size, 
				pos, 
				// children
				[
					new ControlLabel("labelPlayer", this, style, new Coords(0, 0), "Player"),

					new ControlLabel("labelName", this, style, new Coords(1, 1), "Name:"),
					new ControlLabel("infoName", this, style, new Coords(3, 1), this.name),

					new ControlLabel("labelGovernment", this, style, new Coords(1, 2), "Gov't:"),
					new ControlSelectBox
					(
						"listBoxGovernment", 
						this,
						style, 
						new Coords(6, 1), // size
						new Coords(3, 2), // pos
						new Coords(6, 1), // sizePerItem
						ControlSelectBoxItem.buildManyFromSelectables
						(
							style,
							false, // includeOptionForNone
							Globals.Instance.universe.defn.governments()
						),
						null, // selectedItemChanged
						/*
						function(listbox)
						{
							var world = Globals.Instance.world();
							var faction = world.factionSelected();
							var selectableSelected = listbox.itemSelected().controllable;
							var governmentName = (selectableSelected == null ? null : selectableSelected.name);
							faction.governmentName = governmentName;
						}
						*/
						"governmentName", // bindingPath
						"name" // idPathOfSelectables
					),

					this.fiscalData.controlUpdate(style, new Coords(1, 4)),

					this.research.controlUpdate(style, new Coords(1, 9)),
				] 
			);

			this.control = control;
		}


		if (this.control.hasBeenModified == true)
		{
			this.control.hasBeenModified = false;

			this.research.controlUpdate();

			// todo
		}

		return this.control;
	}

	// venue

	FactionData.prototype.initializeEntityForVenue = function(entity, venue)
	{
		entity.actorData.activity.defnName = this.activity.defnName;

		var map = venue.map; //Globals.Instance.universe.world().map;

		this.mapKnown = Map.buildBlank
		(
			map.terrains,
			map.cellSizeInPixels,
			map.sizeInCells
		);

		for (var i = 0; i < this.factionables.length; i++)
		{
			var factionable = this.factionables[i];
			venue.entitySpawn(factionable);
		}
	}

	FactionData.prototype.updateEntityForTimerTick = function(entity)
	{
		for (var i = 0; i < this.factionables.length; i++)
		{
			var factionable = this.factionables[i];
			factionable.updateForTimerTick();
		}

		for (var i = 0; i < this.factionablesToRemove.length; i++)
		{
			var factionable = this.factionables[i];
			this.factionables.splice
			(
				this.factionables.indexOf(factionable),
				1
			);
		}

		this.factionablesToRemove.length = 0;
	}
}
