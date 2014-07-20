// paddmgsim sample plugin js

Toast("plugin loaded!!");

pluginutils.setChrImgPosSiz(1105, { pos : "62% 36%", siz : "530px" });

pluginutils.addOptionMenuItem(
	"Test Plugin",
	function() { Toast("Plugin is working!");
		piCloseOptionMenu();
	});

pluginutils.addTargetItem([
	{
		name: "天獄塔 4F ツインリット",
		amons: [
			{ num: 915, att: [ 4 ], hp0: 2083890, hp: 0, def: 200 },
			{ num: 916, att: [ 5 ], hp0: 3056110, hp: 0, def: 200 }
			]
	}]);
