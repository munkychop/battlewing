define (function (require) {
	
	return function Hero (id, textureImage, PeripheralControllerClass, gameWidth, gameHeight)
	{
		var _self = this,

			PIXI = require ("PIXI"),

			VELOCITY_INCREMENTOR = 0.4,
			MAX_SPEED_X = 20,
			MAX_SPEED_Y = 20,

			_gameWidth = gameWidth,
			_gameHeight = gameHeight,
			_minPosX,
			_minPosY,
			_maxPosX,
			_maxPosY,
			_textureImage = PIXI.Texture.fromImage (textureImage),
			_vx = 0,
			_vy = 0,
			_dx = 0,
			_dy = 0,
			_controlSystem = new PeripheralControllerClass ();

		init ();

		function init ()
		{
			_self.sprite = new PIXI.Sprite (_textureImage);

			_minPosX = _self.sprite.width * 0.5;
			_minPosY = _self.sprite.height * 0.5;
			_maxPosX = _gameWidth - (_self.sprite.width * 0.5);
			_maxPosY = _gameHeight - (_self.sprite.height * 0.5);

			_self.sprite.anchor.x = _self.sprite.anchor.y = 0.5; // centre the sprite's anchor point.
			_self.sprite.position.x = _gameWidth * 0.5;
			_self.sprite.position.y = _maxPosY;
		}

		_self.update = function ()
		{
			if (_controlSystem.movingLeft)
			{
				_dx = -1;
				updateVelocityX ();
			}
			else if (_controlSystem.movingRight)
			{
				_dx = 1;
				updateVelocityX ();
			}
			else if (_vx !== 0)
			{
				decreaseVelocityX ();
			}


			if (_controlSystem.movingUp)
			{
				_dy = -1;
				updateVelocityY ();
			}
			else if (_controlSystem.movingDown)
			{
				_dy = 1;
				updateVelocityY ();
			}
			else if (_vy !== 0)
			{
				decreaseVelocityY ();
			}
			
			_self.sprite.position.x += _vx;
			_self.sprite.position.y += _vy;

			if (_self.sprite.position.x < _minPosX)
			{
				_self.sprite.position.x = _minPosX;
				_vx = 0;
			}
			else if (_self.sprite.position.x > _maxPosX)
			{
				_self.sprite.position.x = _maxPosX;
				_vx = 0;
			}

			if (_self.sprite.position.y < _minPosY)
			{
				_self.sprite.position.y = _minPosY;
				_vy = 0;
			}
			else if (_self.sprite.position.y > _maxPosY)
			{
				_self.sprite.position.y = _maxPosY;
				_vy = 0;
			}
		};

		function updateVelocityX ()
		{
			_vx += (_dx === 1 ? VELOCITY_INCREMENTOR : -VELOCITY_INCREMENTOR);

			if (_vx > MAX_SPEED_X)
			{
				_vx = MAX_SPEED_X;
			}
			else if (_vx < -MAX_SPEED_X)
			{
				_vx = -MAX_SPEED_X;
			}
		}

		function decreaseVelocityX ()
		{
			// gradually reduce velocity in either positive or negative direction based on whether
			// we were previously moving right or left.
			if (_dx === 1)
			{
				_vx -= VELOCITY_INCREMENTOR;
				if (_vx < 0) _vx = 0;
			}
			else
			{
				_vx += VELOCITY_INCREMENTOR;
				if (_vx > 0) _vx = 0;
			}
		}

		function updateVelocityY ()
		{
			_vy += (_dy === 1 ? VELOCITY_INCREMENTOR : -VELOCITY_INCREMENTOR);

			if (_vy > MAX_SPEED_Y)
			{
				_vy = MAX_SPEED_Y;
			}
			else if (_vy < -MAX_SPEED_Y)
			{
				_vy = -MAX_SPEED_Y;
			}
		}

		function decreaseVelocityY ()
		{
			// gradually reduce velocity in either positive or negative direction based on whether
			// we were previously moving dowm or up.
			if (_dy === 1)
			{
				_vy -= VELOCITY_INCREMENTOR;
				if (_vy < 0) _vy = 0;
			}
			else
			{
				_vy += VELOCITY_INCREMENTOR;
				if (_vy > 0) _vy = 0;
			}
		}
	};
});