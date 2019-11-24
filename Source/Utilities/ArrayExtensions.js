
function ArrayExtensions()
{
	// Extension class.
}
{
	Array.prototype.addLookups = function(keyName)
	{
		for (var i = 0; i < this.length; i++)
		{
			var item = this[i];
			var key = item[keyName];
			this[key] = item;
		}
		return this;
	}

	Array.prototype.appendTo = function(arrayToAppendTo)
	{
		for (var i = 0; i < this.length; i++)
		{
			arrayToAppendTo.push(this[i]);
		}
	}

	Array.prototype.addPropertyWithNameFromEachItemToList = function
	(
		propertyName, listToAddTo
	)
	{
		for (var i = 0; i < this.length; i++)
		{
			var item = this[i];
			var propertyValue = item[propertyName];
			listToAddTo.push(propertyValue);
		}

		return listToAddTo;
	}
}
