// default values

//function Mons() {
//}

var	APARTIESDEF = [
	{
		name: "麒麟 テンプレ A",
		mbrs: [
			{ no: 1218, types: [ 6, 3 ], dmgs: [ { att: 4, dmg: 1370 }, { att: 4, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 },
			{ no: 1217, types: [ 4, 6 ], dmgs: [ { att: 4, dmg: 1322 }, { att: 2, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 },
			{ no:  694, types: [ 4, 0 ], dmgs: [ { att: 4, dmg: 1294 }, { att: 3, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 },
			{ no: 1099, types: [ 4, 0 ], dmgs: [ { att: 1, dmg: 1944 }, { att: 1, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 },
			{ no:  760, types: [ 4, 1 ], dmgs: [ { att: 4, dmg:  524 }, { att: 3, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 },
			{ no: 1218, types: [ 6, 3 ], dmgs: [ { att: 4, dmg: 1370 }, { att: 4, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 }
		],
		"alsenhs": [
			{	bdis: true, type: 0, att: 0, xenh: 5.0, blf: true	}
		]
	},
	{
		name: "白メタ テンプレ A",
		mbrs: [
			{ no: 1217, types: [ 4, 6 ], dmgs: [ { att: 4, dmg: 1322 }, { att: 2, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 },
			{ no:  694, types: [ 4, 0 ], dmgs: [ { att: 4, dmg: 1294 }, { att: 3, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 },
			{ no: 1099, types: [ 4, 0 ], dmgs: [ { att: 1, dmg: 1944 }, { att: 1, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 },
			{ no:  760, types: [ 4, 1 ], dmgs: [ { att: 4, dmg:  524 }, { att: 3, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 },
			{ no:  687, types: [ 4, 0 ], dmgs: [ { att: 4, dmg:  630 }, { att: 0, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 },
			{ no: 1217, types: [ 4, 6 ], dmgs: [ { att: 4, dmg: 1322 }, { att: 2, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 }
		],
		"alsenhs": [
			{	bdis: false, type: 4, att: 0, xenh: 3.5, blf: true	},
			{	bdis: true, type: 4, att: 0, xenh: 3.0, blf: false	}
		]
	},
	{
		name: "サタン H",
		mbrs: [
			{ no: 647, types: [ 7, 0 ], dmgs: [ { att: 5, dmg: 1111 }, { att: 2, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 3 ], tway: 0 },	// Satan
			{ no: 912, types: [ 1, 7 ], dmgs: [ { att: 1, dmg: 1875 }, { att: 5, dmg: 0 } ], rens: [ 0, 1, 0, 0, 0, 1 ], tway: 0 },	// Sonia (R)
			{ no: 912, types: [ 1, 7 ], dmgs: [ { att: 1, dmg: 1875 }, { att: 5, dmg: 0 } ], rens: [ 0, 1, 0, 0, 0, 1 ], tway: 0 },	// Sonia (R)
			{ no: 1105, types: [ 5, 7 ], dmgs: [ { att: 5, dmg: 1458 }, { att: 4, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 1 ], tway: 0 },	// Lilith (L)
			{ no: 688, types: [ 7, 0 ], dmgs: [ { att: 5, dmg: 746 }, { att: 0, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 },	// King Baddie
			{ no: 647, types: [ 7, 0 ], dmgs: [ { att: 5, dmg: 1111 }, { att: 2, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 3 ], tway: 0 }	// Satan
		],
		"alsenhs": [
			{	bdis: false, type: 7, att: 0, xenh: 3.5, blf: true	}
		]
	},
	{
		name: "赤ソニア A",
		mbrs: [
			{ no: 912, types: [ 1, 7 ], dmgs: [ { att: 1, dmg: 1875 }, { att: 5, dmg: 0 } ], rens: [ 0, 1, 0, 0, 0, 1 ], tway: 0 },	// Sonia (R)
			{ no: 1269, types: [ 6, 7 ], dmgs: [ { att: 5, dmg: 1741 }, { att: 5, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 2 ], tway: 0 },	// Haku (DD)
			{ no: 893, types: [ 6, 7 ], dmgs: [ { att: 5, dmg: 1407 }, { att: 1, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 },	// Sepone
			{ no: 1105, types: [ 5, 7 ], dmgs: [ { att: 5, dmg: 1458 }, { att: 4, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 1 ], tway: 0 },	// Lilith (L)
			{ no: 894, types: [ 2, 7 ], dmgs: [ { att: 5, dmg: 1268 }, { att: 2, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 },	// V Duke (DW)
			{ no: 912, types: [ 1, 7 ], dmgs: [ { att: 1, dmg: 1875 }, { att: 5, dmg: 0 } ], rens: [ 0, 1, 0, 0, 0, 1 ], tway: 0 }	// Sonia (R)
		],
		"alsenhs": [
			{	bdis: false, type: 7, att: 0, xenh: 2.5, blf: true	}
		]
	},
	{
		name: "呂布ソニア",
		mbrs: [
			{ no: 912, types: [ 1, 7 ], dmgs: [ { att: 1, dmg: 1875 }, { att: 5, dmg: 0 } ], rens: [ 0, 1, 0, 0, 0, 1 ], tway: 0 },	// Sonia (R)
			{ no: 1269, types: [ 6, 7 ], dmgs: [ { att: 5, dmg: 1741 }, { att: 5, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 2 ], tway: 0 },	// Haku (DD)
			{ no: 893, types: [ 6, 7 ], dmgs: [ { att: 5, dmg: 1407 }, { att: 1, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 },	// Sepone
			{ no: 894, types: [ 2, 7 ], dmgs: [ { att: 5, dmg: 1268 }, { att: 2, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 },	// V Duke (DW)
			{ no: 1105, types: [ 5, 7 ], dmgs: [ { att: 5, dmg: 1458 }, { att: 4, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 1 ], tway: 0 },	// Lilith (L)
			{ no: 1240, types: [ 6, 7 ], dmgs: [ { att: 5, dmg: 2093 }, { att: 0, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 1 ], tway: 0 }	// Ryofu
		],
		"alsenhs": [
			{	bdis: false, type: 7, att: 0, xenh: 2.5, blf: true	}
		]
	},
	{
		name: "オオクニ テンプレ A",
		mbrs: [
			{ no: 808, types: [ 6, 3 ], dmgs: [ { att: 5, dmg: 1119 }, { att: 0, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 1 ], tway: 0 },	// Ookuni
			{ no: 643, types: [ 6, 5 ], dmgs: [ { att: 5, dmg: 1881 }, { att: 4, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 2 ], tway: 0 },	// Metatron (D)
			{ no: 893, types: [ 6, 7 ], dmgs: [ { att: 5, dmg: 1407 }, { att: 1, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 },	// Sepone
			{ no: 656, types: [ 6, 7 ], dmgs: [ { att: 5, dmg: 1372 }, { att: 5, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 2 ], tway: 0 },	// Loki
			{ no: 989, types: [ 6, 5 ], dmgs: [ { att: 5, dmg: 2036 }, { att: 4, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 },	// Yomi (L)
			{ no: 808, types: [ 6, 3 ], dmgs: [ { att: 5, dmg: 1119 }, { att: 0, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 1 ], tway: 0 }	// Ookuni
		],
		"alsenhs": [
			{	bdis: false, type: 0, att: 0, xenh: 6.0, blf: true	},
			{	bdis: true, type: 0, att: 5, xenh: 1.5, blf: false	}
		]
	},
	{
		name: "緑ソニア 闇ファガン A",
		mbrs: [
			{ no: 914, types: [ 1, 2 ], dmgs: [ { att: 3, dmg: 1720 }, { att: 5, dmg: 0 } ], rens: [ 0, 0, 0, 1, 0, 1 ], tway: 0 },	// Sonia (G)
			{ no: 912, types: [ 1, 7 ], dmgs: [ { att: 1, dmg: 1875 }, { att: 5, dmg: 0 } ], rens: [ 0, 1, 0, 0, 0, 1 ], tway: 0 },	// Sonia (R)
			{ no: 912, types: [ 1, 7 ], dmgs: [ { att: 1, dmg: 1875 }, { att: 5, dmg: 0 } ], rens: [ 0, 1, 0, 0, 0, 1 ], tway: 0 },	// Sonia (R)
			{ no: 826, types: [ 1, 2 ], dmgs: [ { att: 5, dmg: 1336 }, { att: 5, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 1 },	// CDK V
			{ no: 1129, types: [ 6, 5 ], dmgs: [ { att: 5, dmg: 1534 }, { att: 0, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 1 ], tway: 1 },	// Dragon Shogun
			{ no: 1343, types: [ 6, 1 ], dmgs: [ { att: 5, dmg: 1812 }, { att: 4, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 1 ], tway: 1 }	// Fagan (D)
		],
		"alsenhs": [
			{	bdis: false, type: 1, att: 0, xenh: 2.5, blf: false	},
			{	bdis: false, type: 1, att: 0, xenh: 4.0, blf: false	},
			{	bdis: true, type: 1, att: 0, xenh: 2.0, blf: false	}
		]
	},
	{
		name: "テスト 1",
		mbrs: [
			{ no: 1105, types: [ 5, 7 ], dmgs: [ { att: 5, dmg: 1267 }, { att: 4, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 1 ], tway: 0 }	// Lilith (L)
		],
		"alsenhs": [
			{	bdis: false, type: 5, att: 0, xenh: 3.0, blf: false	}
		]
	},
	{
		name: "テスト 2",
		mbrs: [
			{ no: 1105, types: [ 5, 7 ], dmgs: [ { att: 5, dmg: 1281 }, { att: 4, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 1 ], tway: 0 }	// Lilith (L)
		]
	}
];

var	ATARGTETSDEF = [
//	{ num: 12, att: [ 1, 2 ], hp0: 10000, hp: 10000, def: 100 },
//	{ num: 13, att: [ 2, 1 ], hp0: 20000, hp: 20000, def: 100 }
	{
		name: "星空の神域 神々の王 ゼウス",
		amons: [
			{ num: 0, att: [ 4 ], hp0: 5305418, hp: 5305418, def: 7360 }
			]
	},
	{
		name: "天獄塔 1F リット x6",
		amons: [
			{ num: 0, att: [ 1 ], hp0: 16489, hp: 16489, def: 60 },
			{ num: 0, att: [ 2 ], hp0: 17111, hp: 17111, def: 60 },
			{ num: 0, att: [ 3 ], hp0: 17733, hp: 17733, def: 60 },
			{ num: 0, att: [ 4 ], hp0: 18356, hp: 18356, def: 60 },
			{ num: 0, att: [ 5 ], hp0: 75900, hp: 75900, def: 60 },
			{ num: 0, att: [ 5 ], hp0: 75900, hp: 75900, def: 60 },
			{ num: 0, att: [ 5 ], hp0: 75900, hp: 75900, def: 60 }
			]
	},
	{
		name: "天獄塔 4F ツインリット",
		amons: [
			{ num: 915, att: [ 4 ], hp0: 2083890, hp: 0, def: 200 },
			{ num: 916, att: [ 5 ], hp0: 3056110, hp: 0, def: 200 }
			]
	},
	{
		name: "夢見洞 B4 トラフル x3",
		amons: [
			{ num: 0, att: [ 1, 3 ], hp0: 2083819, hp: 2083819, def: 70 },
			{ num: 0, att: [ 2, 3 ], hp0: 1944931, hp: 1944931, def: 70 },
			{ num: 0, att: [ 3, 4 ], hp0: 3056042, hp: 3056042, def: 70 }
		]
	}
]

var	ACHRIMG_POSSIZ = new Array();
ACHRIMG_POSSIZ[ 643] = { pos : "39% 26%", siz : "480px" };
ACHRIMG_POSSIZ[ 647] = { pos : "49% 25%", siz : "440px" };
ACHRIMG_POSSIZ[ 656] = { pos : "50% 28%", siz : "400px" };
ACHRIMG_POSSIZ[ 687] = { pos : "50.5% 60%", siz : "350px" };
ACHRIMG_POSSIZ[ 688] = { pos : "50% 48%", siz : "320px" };
ACHRIMG_POSSIZ[ 694] = { pos : "50% 18%", siz : "550px" };
ACHRIMG_POSSIZ[ 760] = { pos : "39% 29%", siz : "440px" };
ACHRIMG_POSSIZ[ 808] = { pos : "40.5% 25%", siz : "520px" };
ACHRIMG_POSSIZ[ 826] = { pos : "57% 27%", siz : "430px" };
ACHRIMG_POSSIZ[ 893] = { pos : "47% 20%", siz : "580px" };
ACHRIMG_POSSIZ[ 894] = { pos : "49% 31%", siz : "510px" };
ACHRIMG_POSSIZ[ 989] = { pos : "48% 24%", siz : "440px" };
ACHRIMG_POSSIZ[ 912] = { pos : "46% 48%", siz : "390px" };
ACHRIMG_POSSIZ[ 914] = { pos : "44% 46%", siz : "340px" };
ACHRIMG_POSSIZ[1099] = { pos : "47% 26%", siz : "490px" };
ACHRIMG_POSSIZ[1105] = { pos : "62% 36%", siz : "380px" };
ACHRIMG_POSSIZ[1129] = { pos : "49% 32%", siz : "450px" };
ACHRIMG_POSSIZ[1217] = { pos : "49% 23%", siz : "520px" };
ACHRIMG_POSSIZ[1218] = { pos : "48% 31%", siz : "490px" };
ACHRIMG_POSSIZ[1269] = { pos : "48% 19%", siz : "470px" };
ACHRIMG_POSSIZ[1240] = { pos : "53% 15%", siz : "590px" };
ACHRIMG_POSSIZ[1343] = { pos : "47.5% 38%", siz : "420px" };

