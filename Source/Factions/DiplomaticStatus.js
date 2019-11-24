
function DiplomaticStatus(name)
{
	this.name = name;
}

{
	DiplomaticStatus.Instances = new DiplomaticStatus_Instances();

	function DiplomaticStatus_Instances()
	{
		this.Allied 	= new DiplomaticStatus("Allied");
		this.Peace 	= new DiplomaticStatus("Peace");
		this.Unknown	= new DiplomaticStatus("Unknown");
		this.War 	= new DiplomaticStatus("War");
	}
}
