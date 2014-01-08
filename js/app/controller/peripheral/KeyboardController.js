define (function (require) {
	
	return function KeyboardController () // Extend PeripheralController?
	{
		var _self = this,

			_keys =
			{
				left	:	37,
				up		:	38,
				right	:	39,
				down	:	40
			};

		_self.movingLeft = false;
		_self.movingUp = false;
		_self.movingRight = false;
		_self.movingDown = false;

		document.addEventListener("keydown", keydownHandler, false);
		document.addEventListener("keyup", keyupHandler, false);

		function keydownHandler (event)
		{
			switch (event.keyCode)
			{
				case _keys.left :

					_self.movingLeft = true;
					event.preventDefault ();
					break;

				case _keys.up :

					_self.movingUp = true;
					event.preventDefault ();
					break;

				case _keys.right :

					_self.movingRight = true;
					event.preventDefault ();
					break;

				case _keys.down :

					_self.movingDown = true;
					event.preventDefault ();
					break;
			}
		}

		function keyupHandler (event)
		{
			switch (event.keyCode)
			{
				case _keys.left :
					
					_self.movingLeft = false;
					event.preventDefault ();
					break;

				case _keys.up :

					_self.movingUp = false;
					event.preventDefault ();
					break;

				case _keys.right :

					_self.movingRight = false;
					event.preventDefault ();
					break;

				case _keys.down :

					_self.movingDown = false;
					event.preventDefault ();
					break;
			}
		}
	};
});