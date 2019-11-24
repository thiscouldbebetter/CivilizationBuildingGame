
function ArrayHelper()
{}
{
	ArrayHelper.addLookupsToArray = function(arrayToAddLookupsTo, keyName)
	{
		for (var i = 0; i < arrayToAddLookupsTo.length; i++)
		{
			var item = arrayToAddLookupsTo[i];
			var key = item[keyName];
			arrayToAddLookupsTo[key] = item;
		}
	}

	ArrayHelper.appendItemsFromArrayToArray = function(arrayToAppendFrom, arrayToAppendTo)
	{
		for (var i = 0; i < arrayToAppendFrom.length; i++)
		{
			arrayToAppendTo.push(arrayToAppendFrom[i]);
		}
	}

	ArrayHelper.addPropertyWithNameFromEachItemInArrayToList = function
	(
		propertyName, 
		arrayToGetItemsFrom,
		listToAddTo
	)
	{
		for (var i = 0; i < arrayToGetItemsFrom.length; i++)
		{
			var item = arrayToGetItemsFrom[i];
			var propertyValue = item[propertyName];
			listToAddTo.push(propertyValue);
		}

		return listToAddTo;
	}
}
