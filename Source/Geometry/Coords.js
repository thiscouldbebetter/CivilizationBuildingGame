
function Coords(x, y)
{
	this.x = x;
	this.y = y;
}

{
	Coords.Instances = new Coords_Instances();

	function Coords_Instances()
	{
		this.Ones = new Coords(1, 1);
		this.Zeroes = new Coords(0, 0);
	}

	// instance methods

	Coords.prototype.add = function(other)
	{
		this.x += other.x;
		this.y += other.y;

		return this;
	}

	Coords.prototype.addXY = function(x, y)
	{
		this.x += x;
		this.y += y;

		return this;
	}

	Coords.prototype.clone = function()
	{
		return new Coords(this.x, this.y);
	}

	Coords.prototype.divide = function(other)
	{
		this.x /= other.x;
		this.y /= other.y;

		return this;
	}

	Coords.prototype.divideScalar = function(scalar)
	{
		this.x /= scalar;
 		this.y /= scalar;

		return this;
	}

	Coords.prototype.floor = function()
	{
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);

		return this;
	}
	
	Coords.prototype.magnitude = function()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	Coords.prototype.multiply = function(other)
	{
		this.x *= other.x;
		this.y *= other.y;

		return this;
	}

	Coords.prototype.multiplyScalar = function(scalar)
	{
		this.x *= scalar;
		this.y *= scalar;

		return this;
	}

	Coords.prototype.overwriteWith = function(other)
	{
		this.x = other.x;
		this.y = other.y;

		return this;
	}

	Coords.prototype.randomize = function()
	{
		this.x = Math.random();
		this.y = Math.random();

		return this;
	}

	Coords.prototype.subtract = function(other)
	{
		this.x -= other.x;
		this.y -= other.y;

		return this;
	}

	Coords.prototype.toString = function()
	{
		return "(" + this.x + ", " + this.y + ")";
	}

	Coords.prototype.trimToRangeMax = function(max)
	{
		if (this.x < 0)
		{
			this.x = 0;
		}
		else if (this.x > max.x)
		{
			this.x = max.x;
		}

		if (this.y < 0)
		{
			this.y = 0;
		}
		else if (this.y > max.y)
		{
			this.y = max.y;
		}

		return this;
	}

	Coords.prototype.wrapToRangeMax = function(max)
	{
		while (this.x < 0)
		{
			this.x += max.x;
		}

		while (this.x > max.x)
		{
			this.x -= max.x;
		}

		while (this.y < 0)
		{
			this.y += max.y;
		}

		while (this.y > max.y)
		{
			this.y -= max.y;
		}

		return this;
	}
}
