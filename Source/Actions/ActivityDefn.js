
function ActivityDefn(name, parameters, perform)
{
	this.name = name;
	this.parameters = parameters;
	this.perform = perform;

	ArrayHelper.addLookupsToArray(this.parameters, "name");
}
