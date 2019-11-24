
function StorageHelper()
{
	// todo
}

{
	StorageHelper.SaveFileName = "World.json";

	StorageHelper.prototype.loadWorldFromFile = function()
	{
		FileHelper.loadFileAsText
		(
			StorageHelper.SaveFileName,
			null // todo - callback
		);				
	}

	StorageHelper.prototype.saveWorldToFile = function(world)
	{
		var worldAsString = new Serializer([World]).serialize(world);
		var fileName = StorageHelper.SaveFileName;

		FileHelper.saveTextAsFile
		(
			worldAsString,
			fileName
		);
	}

	// controllable

	StorageHelper.prototype.controlUpdate = function()
	{
		if (this.control == null)
		{
			var style = ControlStyle.Instances().Default;

			var control = new ControlContainer
			(
				"containerStorage",
				this, 
				style, 
				new Coords(10, 10), // size, 
				new Coords(0, 0), // pos, 
				// children
				[
					new ControlLabel("labelStorage", this, style, new Coords(0, 0), "Storage"),	
				]
			);

			this.control = control;
		}

		return this.control;
	}
}
