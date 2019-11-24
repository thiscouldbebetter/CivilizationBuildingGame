
function Universe(defn, venues, nameOfVenueInitial)
{
	this.defn = defn;
	this.venues = venues;

	ArrayHelper.addLookupsToArray(this.venues, "name");
	this.nameOfVenueCurrent = nameOfVenueInitial;
	this.nameOfVenueNext = null;
}

{
	Universe.prototype.initialize = function()
	{
		this.venue().initializeAsVenue();
	}

	Universe.prototype.updateForTimerTick = function()
	{
		if 
		(
			this.nameOfVenueNext != null
			&& this.nameOfVenueNext != this.nameOfVenueCurrent
		)
		{
			this.venue().finalizeAsVenue();
			this.nameOfVenueCurrent = this.nameOfVenueNext;
			this.nameOfVenueNext = null;
			this.venue().initializeAsVenue();
		}

		this.venue().updateForTimerTickAsVenue();
	}

	Universe.prototype.venue = function()
	{
		return this.venues[this.nameOfVenueCurrent];
	}

	Universe.prototype.venueAdd = function(venue)
	{
		this.venues.push(venue);
		this.venues[venue.name] = venue;
	}

	Universe.prototype.world = function()
	{
		return this.venues["World"];
	}
}
