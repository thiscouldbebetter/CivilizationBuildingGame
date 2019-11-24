
function Control()
{}
{
	Control.getValueOfPropertyOnObjectAtBindingPath = function(objectToSet, bindingPath)
	{
		var bindingPathElements = bindingPath.split(".");
		var numberOfBindingPathElements = bindingPathElements.length;
		for (var i = 0; i < numberOfBindingPathElements; i++)
		{
			var propertyName = bindingPathElements[i];
			objectToSet = objectToSet[propertyName];
		}

		return objectToSet;
	}

	Control.setPropertyOnObjectAtBindingPathToValue = function(objectToSet, bindingPath, valueToSet)
	{
		if (bindingPath != null)
		{
			var bindingPathElements = bindingPath.split(".");
			var numberOfBindingPathElements = bindingPathElements.length;
			for (var i = 0; i < numberOfBindingPathElements - 1; i++)
			{
				var propertyName = bindingPathElements[i];
				objectToSet = objectToSet[propertyName];
			}

			var propertyName = bindingPathElements[numberOfBindingPathElements - 1];
			objectToSet[propertyName] = valueToSet;
		}
	}

	Control.setHasBeenModified = function(control)
	{
		control.hasBeenModified = true;
		if (control.parent != null)
		{
			Control.setHasBeenModified(control.parent);
		}
	}
}
