
function Debug()
{
	// static class
}

{
	Debug.counts = [];

	Debug.count = function(countName)
	{
		if (this.counts[countName] == null)
		{
			this.counts[countName] = 0;
		}

		this.counts[countName] += 1;

		console.log(countName + ": " + this.counts[countName]);

		return this.counts[countName];
	}
}
