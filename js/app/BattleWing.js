define (function (require) {
	
	return function BattleWing ()
	{
		var ImagePreloaderClass = require ("ImagePreloader"),
			PIXI = require ("PIXI"),
			GameModel = require ("GameModel"),
			Hero = require ("Hero"),

			GAME_WIDTH_DESKTOP = 1024,
			GAME_HEIGHT_DESKTOP = 768,

			_imagePreloader,
			_canvas = document.getElementById ("game-canvas"),
			_stage = new PIXI.Stage (0xfff),
			_renderer = new PIXI.autoDetectRenderer (GAME_WIDTH_DESKTOP, GAME_HEIGHT_DESKTOP, _canvas),
			_heroesServerDataArray,
			_heroesArray = [],
			_peripheralControllers =
			{
				KeyboardController : require ("KeyboardController"),
				//MouseController : require ("MouseController"),
			};

		init ();

		function init ()
		{
			document.body.appendChild (_renderer.view);

			// TODO : get hero data array from the Node server.
			_heroesServerDataArray = [{id:"someNodeID", graphic:"img/ship_body.png", peripheralType:"KeyboardController"}];

			// TODO : only run this method once we receive the heroes data from the server.
			preloadHeroImages ();
		}

		function preloadHeroImages ()
		{
			_imagePreloader = new ImagePreloaderClass ();

			var i = 0,
				length = _heroesServerDataArray.length,
				currentHeroData,
				imagesToPreload = [];

			for (i; i < length; ++i)
			{
				currentHeroData = _heroesServerDataArray[i];
				imagesToPreload.push (currentHeroData.graphic);
			}

			_imagePreloader.loadMultiple (imagesToPreload, allImagesLoaded);
		}

		function allImagesLoaded ()
		{
			setupHeroes ();
			startGame ();
		}

		function setupHeroes ()
		{
			var i = 0,
				length = _heroesServerDataArray.length,
				currentHeroData;

			for (i; i < length; ++i)
			{
				currentHeroData = _heroesServerDataArray[i];

				// number of heros and their respective peripheral controller string should come from the Node server.
				var hero = new Hero (currentHeroData.id, currentHeroData.graphic, _peripheralControllers[currentHeroData.peripheralType], GAME_WIDTH_DESKTOP, GAME_HEIGHT_DESKTOP);
				_heroesArray.push (hero);

				_stage.addChild (hero.sprite);
			}
		}

		function gameLoop ()
		{
			requestAnimationFrame (gameLoop);

			var i = 0,
				length = _heroesArray.length,
				currentHero;

			for (i; i < length; i++)
			{
				currentHero = _heroesArray[i];
				currentHero.update ();
			}

			_renderer.render (_stage);
		}

		function startGame ()
		{
			_animationFrame = requestAnimationFrame (gameLoop);
		}

		function stopGame ()
		{
			cancelAnimationFrame (_animationFrame);
		}
	};
});