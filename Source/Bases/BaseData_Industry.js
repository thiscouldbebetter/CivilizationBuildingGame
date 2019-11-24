
function BaseData_Industry
(
	nameOfEntityDefnBeingBuilt,
	industryStockpiled
)
{
	this.nameOfEntityDefnBeingBuilt = nameOfEntityDefnBeingBuilt;
	this.industryStockpiled = industryStockpiled;
}

{
	BaseData_Industry.prototype.entityDefnsBuildable = function(base)
	{
		var faction = base.factionableData.faction().factionData;

		var returnValues = TechnologyDefn.addEntityDefnsBuildableToList
		(
			faction.research.namesOfTechnologiesKnown, []
		);

		return returnValues;
	}

	BaseData_Industry.prototype.entityDefnBeingBuilt = function()
	{
		var returnValue = null;
			
		if (this.nameOfEntityDefnBeingBuilt != null)
		{
			var universe = Globals.Instance.universe;
			var returnValue = universe.defn.entityDefns[this.nameOfEntityDefnBeingBuilt];
		}
		
		return returnValue;
	}

	BaseData_Industry.prototype.updateBaseForTurn = function(base)
	{
		var entityDefnBeingBuilt = this.entityDefnBeingBuilt();

		if (entityDefnBeingBuilt != null)
		{
			var baseData = base.baseData;
			var resourcesProduced = baseData.resourcesProducedByBaseThisTurn(base);
			var industryProduced = resourcesProduced["Industry"].quantity;
	
			var industryConsumed = baseData.support.industryConsumedByMoversSupported();
	
			this.industryStockpiled += (industryProduced - industryConsumed);
	
			var buildableDefn = entityDefnBeingBuilt.buildableDefn;

			if (this.industryStockpiled >= buildableDefn.industryToBuild)
			{
				buildableDefn.buildEntityFromDefnByBuilder
				(
					entityDefnBeingBuilt, 
					base
				);	
	
				this.nameOfEntityDefnBeingBuilt = null;
				this.industryStockpiled = 0;
			}
		}

		Control.setHasBeenModified(this.control);
	}


	// controls

	BaseData_Industry.prototype.controlUpdate = function(base, style, pos)
	{
		if (this.control == null)
		{
			var control = new ControlContainer
			(
				"containerIndustry",
				this,
				style,
				new Coords(8, 6), // size
				pos,
				[
					new ControlLabel("labelBuilding", this, style, new Coords(1, 1), "Building:"),
					
					new ControlSelectBox
					(
						"listboxEntityDefnBeingBuilt", 
						this,
						style, 
						new Coords(5, 1), // size, 
						new Coords(1, 2), // pos, 
						new Coords(5, 1), // sizePerItem, 
						ControlSelectBoxItem.buildManyFromSelectables
						(
							style,
							true, // includeOptionForNone
							this.entityDefnsBuildable(base)
						),
						// selectedItemChanged
						function(listbox)
						{
							var world = Globals.Instance.universe.world();
							var faction = world.factionSelected().factionData;
							var base = faction.factionableSelected();
							var selectableSelected = listbox.itemSelected().controllable;
							var nameOfEntityDefnToBuild = (selectableSelected == null ? null : selectableSelected.name);
							base.baseData.industry.nameOfEntityDefnBeingBuilt = nameOfEntityDefnToBuild;
						},
						"nameOfEntityDefnBeingBuilt", // bindingPath
						null // idPathForSelectables
					),

					new ControlLabel("labelProgress", this, style, new Coords(1, 3), "Progress:"),
					new ControlLabel("infoProgress", this, style, new Coords(1, 4), "[progress]"),
				]
			);

			this.control = control;
		}

		if (this.control.hasBeenModified == true)
		{
			var entityDefnBeingBuilt = this.entityDefnBeingBuilt();
			var messageForBuildProgress; 
	
			if (entityDefnBeingBuilt == null)
			{
				messageForBuildProgress = "[none]";
			}
			else
			{
				messageForBuildProgress = 
					this.industryStockpiled
					+ "/"
					+ entityDefnBeingBuilt.buildableDefn.industryToBuild;
			}

			this.control.children["infoProgress"].text_Set(messageForBuildProgress);

			this.control.htmlElementUpdate();

			this.control.hasBeenModified = false;
		}

		return this.control;
	}
}
