
function EntityDefn(name, properties)
{
	this.name = name;
	this.properties = properties;

	for (var i = 0; i < this.properties.length; i++)
	{
		var property = this.properties[i];
		var propertyName = property.constructor.name;
		propertyName = propertyName[0].toLowerCase() + propertyName.substring(1)

		this[propertyName] = property;
	}
}

{
	// static methods

	EntityDefn.buildManyForProperties = function(properties)
	{
		var returnValues = [];
		for (var i = 0; i < properties.length; i++)
		{
			var property = properties[i];

			var entityDefnForProperty = new EntityDefn
			(
				property.name,
				[
					property
				]
			);

			returnValues.push(entityDefnForProperty);
		}

		return returnValues;
	}

	// instance methods

	// selectable

	EntityDefn.prototype.buildTextAsSelectable = function()
	{
		return this.name;
	}
}
