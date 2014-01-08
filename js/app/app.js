window.DEBUG = true;

require (["log", "BattleWing"], app);

function app (log, BattleWing)
{
	// Make log global if the DEBUG flag is set to 'true', otherwise cancel all logs.
	window.log = window.DEBUG ? log : function (){return false;};

	log ("App::");

	// call the constructor function of the document class to start the app.
	BattleWing ();
}