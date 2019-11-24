
function Input(name, keycode)
{
	this.name = name;
	this.keycode = keycode;
}

{
	function Input_Instances()
	{
		this.A = new Input("A", 65);
		this.D = new Input("D", 68);
		this.E = new Input("E", 69);
		this.P = new Input("P", 80);
		this.S = new Input("S", 83);
		this.W = new Input("W", 87);
		this.Z = new Input("Z", 90);
	}
}
