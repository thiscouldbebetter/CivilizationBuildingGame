
function Direction(name, symbol, offset)
{
	this.name = name;
	this.symbol = symbol;
	this.offset = offset;
}

{
	Direction.Instances = new Direction_Instances();

	function Direction_Instances()
	{
		this.East 	= new Direction("East", 	">", new Coords(1, 0)),
		this.South 	= new Direction("South", 	"v", new Coords(0, 1)),
		this.West 	= new Direction("West", 	"<", new Coords(-1, 0)),
		this.North 	= new Direction("North", 	"^", new Coords(0, -1)),

		this._All = 
		[
			this.East, 
			this.South,
			this.West,
			this.North,
		].addLookups("name");

	}
}
