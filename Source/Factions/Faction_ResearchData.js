
function Faction_ResearchData
(
	researchStockpiled,
	nameOfTechnologyBeingResearched,
	namesOfTechnologiesKnown
)
{
	this.researchStockpiled = researchStockpiled;
	this.nameOfTechnologyBeingResearched = nameOfTechnologyBeingResearched;
	this.namesOfTechnologiesKnown = namesOfTechnologiesKnown;
}

{
	Faction_ResearchData.prototype.researchForFactionThisTurn = function(faction)
	{
		var returnValue = 0;

		var factionData = faction.factionData;

		for (var i = 0; i < factionData.factionables.length; i++)
		{
			var entity = factionData.factionables[i];

			if (entity.baseData != null)
			{
				var baseData = entity.baseData;
				var resourcesProducedByBase = baseData.resourcesProducedByBaseThisTurn(entity);
				var researchProducedByBase = resourcesProducedByBase["Research"];
				var researchQuantityProducedByBase = (researchProducedByBase == null ? 0 : researchProducedByBase.quantity);
				returnValue += researchQuantityProducedByBase;
			}
		}

		return returnValue;
	}

	Faction_ResearchData.prototype.technologiesResearchable = function()
	{
		var technologiesAll = Globals.Instance.universe.defn.technologies();
		var technologiesKnown = this.namesOfTechnologiesKnown;

		var returnValues = [];

		for (var i = 0; i < technologiesAll.length; i++)
		{
			var technology = technologiesAll[i].technologyDefn;
			var technologyName = technology.name;

			var isAlreadyKnown = (technologiesKnown.indexOf(technologyName) >= 0);

			if (isAlreadyKnown == false)
			{
				var prerequisites = technology.namesOfPrerequisiteTechnologies;

				var areAllPrerequisitesKnown = true;

				for (var p = 0; p < prerequisites.length; p++)
				{
					var prerequisite = prerequisites[p];
					var isPrerequisiteKnown = (technologiesKnown.indexOf(prerequisite) >= 0);

					if (isPrerequisiteKnown == false)
					{
						areAllPrerequisitesKnown = false;
						break;
					}
				}

				if (areAllPrerequisitesKnown == true)
				{
					returnValues.push(technology);
				}
			}
		}

		return returnValues;
	}

	Faction_ResearchData.prototype.technologyBeingResearched = function()
	{
		var returnValue = null;

		if (this.nameOfTechnologyBeingResearched != null)
		{
			var universe = Globals.Instance.universe;
			var returnValue = universe.defn.technologies()[this.nameOfTechnologyBeingResearched].technologyDefn;
		}

		return returnValue;
	}

	Faction_ResearchData.prototype.updateFactionForTurn = function(faction)
	{
		var technologyBeingResearched = this.technologyBeingResearched();

		if (technologyBeingResearched != null)
		{
			this.researchStockpiled += this.researchForFactionThisTurn(faction);

			if (this.researchStockpiled >= technologyBeingResearched.researchRequired)
			{
				this.namesOfTechnologiesKnown.push
				(
					this.nameOfTechnologyBeingResearched
				);

				this.nameOfTechnologyBeingResearched = null;
			}

			Control.setHasBeenModified(this.control);
		}
	}

	// controllable

	Faction_ResearchData.prototype.controlUpdate = function(style, pos)
	{
		if (this.control == null)
		{
			var control = new ControlContainer
			(
				"containerResearch",
				this,
				style,
				new Coords(8, 6), // size
				pos,
				[
					new ControlLabel("labelResearch", this, style, new Coords(1, 1), "Researching:"),

					new ControlSelectBox
					(
						"listboxResearch", 
						this,
						style, 
						new Coords(6, 1), // size, 
						new Coords(1, 2), // pos, 
						new Coords(5, 1), // sizePerItem, 
						ControlSelectBoxItem.buildManyFromSelectables
						(
							style,
							true, // includeOptionForNone
							this.technologiesResearchable()
						),
						null, // selectedItemChanged
						/*
						function(listbox)
						{
							var world = Globals.Instance.universe.world();
							var faction = world.factionSelected();
							var selectableSelected = listbox.itemSelected().controllable;
							var technologyName = (selectableSelected == null ? null : selectableSelected.name);
							faction.factionData.research.nameOfTechnologyBeingResearched = technologyName;
						}
						*/
						"nameOfTechnologyBeingResearched", // bindingPath
						"name" // idPathOfSelectables
					),

					new ControlLabel("labelProgress", this, style, new Coords(1, 3), "Progress:"),
					new ControlLabel("infoProgress", this, style, new Coords(1, 4), "[progress]"),
				]
			);

			this.control = control;
		}

		if (this.control.hasBeenModified == true)
		{
			var technologyBeingResearched = this.technologyBeingResearched();
			var messageForResearchProgress; 

			if (technologyBeingResearched == null)
			{
				messageForResearchProgress = "[none]";
			}
			else
			{
				messageForResearchProgress = 
					this.researchStockpiled
					+ "/"
					+ this.technologyBeingResearched().researchRequired;
			}

			var infoProgress = this.control.children["infoProgress"];
			infoProgress.text_Set(messageForResearchProgress);

			this.control.htmlElementUpdate();

			this.control.hasBeenModified = false;

		}

		return this.control;
	}
}
