
function Activity(defnName)
{
	this.defnName = defnName;
	this.isActive = false;
}

{
	Activity.prototype.clone = function()
	{
		return new Activity(this.defnName);
	}

	Activity.prototype.defn = function()
	{
		return (this.defnName == null ? null : Globals.Instance.universe.defn.activityDefns[this.defnName]);
	}

	Activity.prototype.perform = function(actor)
	{
		if (this.isActive == true)
		{
			var defn = this.defn();
			if (defn != null)
			{
				defn.perform(actor, this, defn.parameters);
			}
		}
	}
}
