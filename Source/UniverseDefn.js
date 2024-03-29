
function UniverseDefn
(
	actionsAll,
	activityDefns,
	resourceDefns,
	movementTypes,
	mapTerrains,
	entityDefnSets
)
{
	this.actionsAll = actionsAll;
	this.activityDefns = activityDefns.addLookups("name");
	this.resourceDefns = resourceDefns.addLookups("name");
	this.movementTypes = movementTypes.addLookups("name");
	this.mapTerrains = mapTerrains.addLookups("codeChar");

	this.entityDefns = [];
	this.entityDefnsByCategoryName = [];

	for (var i = 0; i < entityDefnSets.length; i++)
	{
		var entityDefnSet = entityDefnSets[i];
		for (var e = 0; e < entityDefnSet.length; e++)
		{
			var entityDefn = entityDefnSet[e];
			this.entityDefns[entityDefn.name] = entityDefn;

			for (var p = 0; p < entityDefn.properties.length; p++)
			{
				var property = entityDefn.properties[p];
				var categoryName = property.constructor.name;
				var entityDefnsInCategory = this.entityDefnsByCategoryName[categoryName];
				if (entityDefnsInCategory == null)
				{
					entityDefnsInCategory = [];
					this.entityDefnsByCategoryName[categoryName] = entityDefnsInCategory;
				}

				entityDefnsInCategory[entityDefn.name] = entityDefn;
				entityDefnsInCategory.push(entityDefn);
			}
		}
	}
}

{
	// entityDefns

	UniverseDefn.prototype.buildables = function()
	{
		return this.entityDefnsByCategoryName["BuildableDefn"];
	}

	UniverseDefn.prototype.governments = function()
	{
		return this.entityDefnsByCategoryName["GovernmentDefn"];
	}

	UniverseDefn.prototype.technologies = function()
	{
		return this.entityDefnsByCategoryName["TechnologyDefn"];
	}
}
