
function Faction_FiscalData(wealthStockpiled, fractionsOfCommerceToConvertToOtherResources)
{
	this.wealthStockpiled = wealthStockpiled;
	this.fractionsOfCommerceToConvertToOtherResources = fractionsOfCommerceToConvertToOtherResources;

	this.fractionsOfCommerceToConvertToOtherResources.addLookups
	(
		"defnName"
	);
}

{
	// controllable

	Faction_FiscalData.prototype.controlUpdate = function(style, pos)
	{
		if (this.control == null)
		{
			var control = new ControlContainer
			(
				"containerFiscalData", 
				this,
				style, 
				new Coords(8, 4), // size, 
				pos, 
				// children
				[

					new ControlLabel("labelWealth", this, style, new Coords(1, 1), "Wealth:"),
					new ControlLabel("infoWealth", this, style, new Coords(4, 1), this.wealthStockpiled),

					new ControlLabel("labelRates", this, style, new Coords(1, 2), "Tx/Rs/Lx:"),
					new ControlLabel("infoRates", this, style, new Coords(4, 2), "[rates]"),

				]
			);

			this.control = control;
		}

		if (this.control.hasBeenModified == true)
		{
			this.control.children["infoWealth"].text_Set(this.wealthStockpiled);

			var rates = this.fractionsOfCommerceToConvertToOtherResources;

			var ratesAsText = 
 				(rates["Wealth"].quantity * 100)
				+ "/"
				+ (rates["Research"].quantity * 100)
				+ "/"
				+ (rates["Luxuries"].quantity * 100) + "%"

			this.control.children["infoRates"].text_Set(ratesAsText);

			this.control.htmlElementUpdate();

			this.control.hasBeenModified = false;
		}

		return this.control;
	}
}
