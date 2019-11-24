
function MapTerrain
(
	name, 
	codeChar, 
	color, 
	defenseMultiplier, 
	movementCosts,
	resourcesProducedPerTurn,
	visual
)
{
	this.name = name;
	this.codeChar = codeChar;
	this.color = color;
	this.defenseMultiplier = defenseMultiplier;
	this.movementCosts = movementCosts.addLookups("movementTypeName");
	this.resourcesProducedPerTurn = resourcesProducedPerTurn;
	this.visual = visual;
}
