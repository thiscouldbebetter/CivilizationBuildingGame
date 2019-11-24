
function Entity(defnName, properties)
{
	this.defnName = defnName;
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

	Entity.buildManyForDefnNameAndProperties = function(defnName, properties)
	{
		var returnValues = [];
		for (var i = 0; i < properties.length; i++)
		{
			var property = properties[i];

			var entityForProperty = new Entity
			(
				defnName,
				[
					property
				]
			);

			returnValues.push(entityForProperty);
		}

		return returnValues;
	}

	// instance methods

	Entity.prototype.defn = function()
	{
		return Globals.Instance.universe.defn.entityDefns[this.defnName];
	}

	Entity.prototype.initializeForVenue = function(venue)
	{
		var defn = this.defn();

		for (var i = 0; i < defn.properties.length; i++)
		{
			var property = defn.properties[i];
			if (property.initializeEntityForVenue != null)
			{
				property.initializeEntityForVenue(this, venue);
			}
		}

		for (var i = 0; i < this.properties.length; i++)
		{
			var property = this.properties[i];
			if (property.initializeEntityForVenue != null)
			{
				property.initializeEntityForVenue(this, venue);
			}
		}
	}

	Entity.prototype.updateForTimerTick = function()
	{
		for (var i = 0; i < this.properties.length; i++)
		{
			var property = this.properties[i];
			if (property.updateEntityForTimerTick != null)
			{
				property.updateEntityForTimerTick(this);
			}
		}
	}

	// controls

	Entity.prototype.controlUpdate = function(style, pos)
	{
		for (var i = 0; i < this.properties.length; i++)
		{
			var property = this.properties[i];
			if (property.controlUpdate != null)
			{
				this.control = property.controlUpdate(this, style, pos);
				break;
			}
		}

		return this.control;
	}

	// ?

	Entity.prototype.propertyAdd = function(property)
	{
		this.properties.push(property);
		var propertyName = property.constructor.name;
		propertyName = propertyName[0].toLowerCase() + propertyName.substring(1);
		this[propertyName] = property;
	}
}
