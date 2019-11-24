
function Globals()
{}
{
	Globals.Instance = new Globals();

	Globals.prototype.handleEventTimerTick = function()
	{
		this.universe.updateForTimerTick();	
		this.inputHelper.updateForTimerTick();
	}

	Globals.prototype.initialize = function(displayHelper, inputHelper, universe)
	{
		this.displayHelper = displayHelper;
		this.universe = universe;

		this.displayHelper.initialize();

		this.inputHelper = inputHelper;
		this.inputHelper.initialize();

		this.universe.initialize();
		this.venue = this.universe.world();

		var millisecondsPerTimerTick = 50;
		setInterval
		(
			"Globals.Instance.handleEventTimerTick()", 
			millisecondsPerTimerTick
		);
	}
}
