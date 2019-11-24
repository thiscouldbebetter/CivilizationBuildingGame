
function TechnologyDefn
(
	name, 
	researchRequired, 
	namesOfPrerequisiteTechnologies,
	namesOfBuildablesEnabled
)
{
	this.name = name;
	this.researchRequired = researchRequired;
	this.namesOfPrerequisiteTechnologies = namesOfPrerequisiteTechnologies;
 	this.namesOfBuildablesEnabled = namesOfBuildablesEnabled;
}

{
	// static methods

	TechnologyDefn.addEntityDefnsBuildableToList = function(namesOfTechnologiesKnown, listToAddTo)
	{
		var universeDefn = Globals.Instance.universe.defn;
		var technologiesAll = universeDefn.technologies();
		var buildablesAll = universeDefn.buildables();

		for (var t = 0; t < namesOfTechnologiesKnown.length; t++)
		{
			var technologyName = namesOfTechnologiesKnown[t];
			var technology = technologiesAll[technologyName].technologyDefn;

			var namesOfBuildablesEnabled = technology.namesOfBuildablesEnabled;
			for (var u = 0; u < namesOfBuildablesEnabled.length; u++)
			{
				var buildableName = namesOfBuildablesEnabled[u];
				var entityDefn = buildablesAll[buildableName];

				if (entityDefn != null)
				{
					listToAddTo.push(entityDefn);
				}
			}
		}

		return listToAddTo;
	}

	// selectable

	TechnologyDefn.prototype.buildTextAsSelectable = function()
	{
		return this.name;
	}
}
