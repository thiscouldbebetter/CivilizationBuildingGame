
function Cloneable()
{}
{
	Cloneable.cloneMany = function(cloneablesToClone)
	{
		var returnValues = [];

		for (var i = 0; i < cloneablesToClone.length; i++)
		{
			returnValues.push(cloneablesToClone[i].clone());
		}

		return returnValues;
	}
}
