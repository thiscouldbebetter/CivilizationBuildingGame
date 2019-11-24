
function MapTerrain
(
	name, 
	codeChar, 
	color, 
	visual,
	defenseMultiplier, 
	movementCosts,
	resourcesProducedPerTurn
)
{
	this.name = name;
	this.codeChar = codeChar;
	this.color = color;
	this.visual = visual;
	this.defenseMultiplier = defenseMultiplier;
	this.movementCosts = movementCosts;
	this.resourcesProducedPerTurn = resourcesProducedPerTurn;

	ArrayHelper.addLookupsToArray(this.movementCosts, "movementTypeName");
}
