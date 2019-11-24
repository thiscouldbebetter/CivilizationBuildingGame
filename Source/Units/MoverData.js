
function MoverData(nameOfHomeBase)
{
	this.nameOfHomeBase = nameOfHomeBase;
	this.movesThisTurn = 0;
}

{
	// static methods

	MoverData.buildEntityForDefnByBuilder = function(entityDefn, builder)
	{
		// todo
	}

	MoverData.updateEntityForTurn = function(entity)
	{
		entity.moverData.movesThisTurn = entity.defn().moverDefn.movesPerTurn;
	}

	// instance methods

	MoverData.prototype.initializeEntityForVenue = function(entity, venue)
	{
		this.movesThisTurn = entity.defn().moverDefn.movesPerTurn;
	}

	// controllable

	MoverData.prototype.controlUpdate = function(mover, style, pos)
	{
		if (mover.control == null)
		{
			var defn = mover.defn();
			var moverDefn = defn.moverDefn;

			var buttonsForActions = ControlHelper.updateControlsForControllablesAndAddToList
			(
				defn.actorDefn.actionNameToButtonMappings,
				[]
			);

			var containerActions = new ControlContainer
			(
				"containerActions",
				this,
				style,
				new Coords(8, 22), // size
				new Coords(1, 5), // pos
				buttonsForActions
			);

			var returnValue = new ControlContainer
			(
				"containerEntity", 
				this,
				style, 
				new Coords(10, 28), // size, 
				pos, 
				[
					new ControlLabel("labelEntity", this, style, new Coords(0, 0), "Entity"),
					new ControlLabel("labelEntitySelectedName", this, style, new Coords(1, 1), "Type:"),
					new ControlLabel("infoEntitySelectedName", this, style, new Coords(5, 1), mover.defnName),

					new ControlLabel("labelStats", this, style, new Coords(1, 2), "A/D/M:"),
					new ControlLabel("infoStats", this, style, new Coords(5, 2), moverDefn.attacks[0].strength + "/" + moverDefn.defenses[0].strength + "/" + moverDefn.movesPerTurn),

					new ControlLabel("labelMoves", this, style, new Coords(1, 3), "Moves:"),
					new ControlLabel("infoMoves", this, style, new Coords(5, 3), mover.moverData.movesThisTurn),

					containerActions,

				]
			);

			returnValue.controllable = this;
			mover.control = returnValue;
		}

		if (mover.control.hasBeenModified == true)
		{
			var movesThisTurn = mover.moverData.movesThisTurn;
			mover.control.children["infoMoves"].text_Set(movesThisTurn);
			mover.control.htmlElementUpdate();
			mover.control.hasBeenModified = false;
		}

		return mover.control;
	}
}
