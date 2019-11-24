
function ControlStyle(name, gridCellSize, fontSize)
{
	this.name = name;
	this.gridCellSize = gridCellSize;
	this.fontSize = fontSize;
}

{
	ControlStyle.Instances = function()
	{
		if (ControlStyle._instances == null)
		{
			ControlStyle._instances = {};

			ControlStyle._instances.Default = new ControlStyle
			(
				"Default Style", 
				new Coords(20, 20), // gridCellSize
				"12px"
			);
		}

		return ControlStyle._instances;
	}
}
