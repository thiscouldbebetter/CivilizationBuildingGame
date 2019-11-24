
function BaseData
(
	name,
	demographics,
	improvements,
	industry,
	support
)
{
	this.name = name;
	this.demographics = demographics;
	this.improvements = improvements;
	this.industry = industry;
	this.support = support;
}

{
	// static methods

	BaseData.updateEntityForTurn = function(base)
	{
		base.baseData.demographics.updateBaseForTurn(base);
		base.baseData.industry.updateBaseForTurn(base);
	}

	// instance methods

	BaseData.prototype.initializeEntityForVenue = function(entity, venue)
	{
		this.demographics.initializeEntityForVenue(entity, venue);
	}

	BaseData.prototype.resourcesProducedByBaseThisTurn = function(base)
	{
		var world = Globals.Instance.universe.world();
		var map = world.map;
		var baseData = base.baseData;
		var basePosInCells = base.locatableData.posInCells;

		var returnValues = baseData.demographics.addResourcesProducedByMapCellsInUseToList
		(
			map, basePosInCells, []
		);

		var namesOfImprovementsPresent = baseData.improvements.namesOfImprovementsPresent;

		for (var i = 0; i < namesOfImprovementsPresent.length; i++)
		{
			var nameOfImprovement = namesOfImprovementsPresent[i];
			var entityDefnForImprovement = world.entityDefns[nameOfImprovement];
			var industryMultiplier = entityDefnForImprovement.improvementDefn.industryMultiplier;
			returnValue *= industryMultiplier;
		}

		var commerceProduced = returnValues["Commerce"];
		var quantityOfCommerceProduced = (commerceProduced == null ? 0 : commerceProduced.quantity);
		var fractionOfCommerceWasted = 0; // hack
		var fractionOfCommerceConserved = 1 - fractionOfCommerceWasted;
		quantityOfCommerceProduced *= fractionOfCommerceConserved;

		var faction = base.factionableData.faction().factionData;
		var fiscalData = faction.fiscalData;
		var fractionsOfCommerce = fiscalData.fractionsOfCommerceToConvertToOtherResources;

		var indexOfResourceWithGreatestFractionOfCommerce = 0;
		var fractionOfCommerceGreatest = 0;

		for (var i = 0; i < fractionsOfCommerce.length; i++)
		{
			var fractionOfCommerce = fractionsOfCommerce[i];
			var nameOfResource = fractionOfCommerce.defnName;
			var resourceProduced = returnValues[nameOfResource];
			if (resourceProduced == null)
			{
				resourceProduced = new Resource(nameOfResource, 0);
				returnValues.push(resourceProduced);
				returnValues[nameOfResource] = resourceProduced;
			}

			if (fractionOfCommerce.quantity >= fractionOfCommerceGreatest)
			{
				fractionOfCommerceGreatest = fractionOfCommerce.quantity;
				indexOfResourceWithGreatestFractionOfCommerce = i;
			}
		}

		for (var i = 0; i < fractionsOfCommerce.length; i++)
		{
			var fractionOfCommerce = fractionsOfCommerce[i];
			var nameOfResource = fractionOfCommerce.defnName;

			var quantityOfResourceFromCommerce = 
				quantityOfCommerceProduced 
				* fractionOfCommerce.quantity;

			if (i == indexOfResourceWithGreatestFractionOfCommerce)
			{
				quantityOfResourceFromCommerce = Math.ceil
				(
					quantityOfResourceFromCommerce
				);
			}
			else
			{
				quantityOfResourceFromCommerce = Math.floor
				(
					quantityOfResourceFromCommerce
				);
			}

			returnValues[nameOfResource].quantity += quantityOfResourceFromCommerce;
		}

		return returnValues;
	}

	// controllable

	BaseData.prototype.controlUpdate = function(base, style, pos)
	{
		if (this.control == null)
		{
			var defn = base.defn();

			var baseData = base.baseData;

			var containerDemographics = baseData.demographics.controlUpdate
			(
				base,
				style,
				new Coords(1, 2) // pos
			);

			var containerIndustry = baseData.industry.controlUpdate
			(
				base, // base
				style, 
				new Coords(1, 13) // pos
			);

			var buttonsForActions = ControlHelper.updateControlsForControllablesAndAddToList
			(
				defn.actorDefn.actionNameToButtonMappings,
				[]
			);

			var containerActions = new ControlContainer
			(
				"containerActions",
				this,
				style,
				new Coords(8, 7), // size
				new Coords(1, 20), // pos
				buttonsForActions
			);

			var returnValue = new ControlContainer
			(
				"containerEntity", 
				this,
				style, 
				new Coords(10, 28), // size, 
				pos, 
				[
					new ControlLabel("labelType", this, style, new Coords(0, 0), "Base"),
					new ControlLabel("labelName", this, style, new Coords(1, 1), "Name:"),
					new ControlLabel("infoName", this, style, new Coords(3, 1), baseData.name),

					containerDemographics,
					containerIndustry,
					containerActions,
				]
			);

			returnValue.controllable = base;
			this.control = returnValue;
		}

		if (this.control.hasBeenModified == true)
		{
			this.control.hasBeenModified = false;

			this.industry.controlUpdate();

			this.control.htmlElementUpdate();
		}


		return this.control;
	}
}
