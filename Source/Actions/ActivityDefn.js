
function ActivityDefn(name, parameters, perform)
{
	this.name = name;
	this.parameters = parameters.addLookups("name");
	this.perform = perform;
}
