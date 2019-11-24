
function InputHelper(actionsAll, bindings)
{
	this.keycodeToBindingLookup = [];
	this.keycodesPressed = [];
	this.actionNamesAvailable = [];
	this.actionsActive = [];

	this.actionsAll = actionsAll;
	this.bindings_Set(bindings);

	ArrayHelper.addLookupsToArray(this.actionsAll, "name");
}

{
	InputHelper.prototype.actionNamesAvailable_Set = function(actionNamesAvailable)
	{
		this.actionNamesAvailable = actionNamesAvailable;
		this.actionsActive.length = 0;
	}

	InputHelper.prototype.bindings_Set = function(bindings)
	{
		this.bindings = bindings;

		this.keycodeToBindingLookup = [];

		for (var i = 0; i < this.bindings.length; i++)
		{
			var binding = this.bindings[i];
			var bindingKeycode = binding.input.keycode;
			this.keycodeToBindingLookup[bindingKeycode] = binding;
		}
	}

	InputHelper.prototype.handleEventKeyDown = function(event)
	{
		var keycode = event.keyCode;
			
		var binding = this.keycodeToBindingLookup[keycode];
		if (binding != null)
		{
			var actionNameBound = binding.actionName;
			if (this.actionNamesAvailable.indexOf(actionNameBound) >= 0)
			{
				var action = this.actionsAll[actionNameBound];

				if (this.keycodesPressed[keycode] == null)
				{
					this.keycodesPressed[keycode] = keycode;
					this.actionsActive.push(action);
				}
			}
		}
	}

	InputHelper.prototype.handleEventKeyUp = function(event)
	{
		var keycode = event.keyCode;

		delete this.keycodesPressed[keycode];
	}

	InputHelper.prototype.initialize = function()
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
		document.body.onkeyup = this.handleEventKeyUp.bind(this);
	}

	InputHelper.prototype.updateForTimerTick = function()
	{
		this.actionsActive.length = 0;		
	}
}
