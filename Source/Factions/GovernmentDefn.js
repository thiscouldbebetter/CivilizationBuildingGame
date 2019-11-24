
function GovernmentDefn
(
	name,
	hasSenate,
	maxCitizensPerBaseBeforeUnhappiness,
	maxCitizensPerBaseMadeContentByGarrison,
	numberOfCitizensMadeUnhappyPerDeployedArmy,
	foodAddedPerCellWithIrrigation,
	commerceAddedPerCellWithCommerce,
	fractionOfCommercePerBaseWastedFlat,
	commercePerBaseWastedPerCellFromCapital
)
{
	this.name = name;
	this.hasSenate = hasSenate;
	this.maxCitizensPerBaseBeforeUnhappiness = maxCitizensPerBaseBeforeUnhappiness;
	this.maxCitizensPerBaseMadeContentByGarrison = maxCitizensPerBaseMadeContentByGarrison;
	this.numberOfCitizensMadeUnhappyPerDeployedArmy = numberOfCitizensMadeUnhappyPerDeployedArmy;
	this.foodAddedPerCellWithIrrigation = foodAddedPerCellWithIrrigation;
	this.commerceAddedPerCellWithCommerce = commerceAddedPerCellWithCommerce;
	this.fractionOfCommercePerBaseWastedFlat = fractionOfCommercePerBaseWastedFlat;
	this.commercePerBaseWastedPerCellFromCapital = commercePerBaseWastedPerCellFromCapital;
}

{
	// selectable

	GovernmentDefn.prototype.buildTextAsSelectable = function()
	{
		return this.name;
	}
}
