var	SC_APPTITLE_N = "PAD DMG SIM";
var	SC_APPTITLE_P = "PAD DMG SIM *";
var	SC_APPSAVE_PARTIES = "SC_APPSAVE_PARTIES";
var	SC_APPSAVE_ERESPATH = "SC_APPSAVE_ERESPATH";

var	SC_ATTRN = [ "-", "火", "水", "木", "光", "闇" ];
var	SC_TYPEN = [ "-", "ド", "バ", "体", "回", "攻", "神", "魔" ];
// 1 Fire, 2 Water, 3 Wood, 4 Light, 5 Dark
// 1 Dragon, 2 Balanced, 3 Physical, 4 Healer, 5 Attacker, 6 God, 7 Devil (Evo-Mat. Enhance-Mat.
var	ACS_ATTRCOL = [ "transparent", "#FF6666", "#8899FF", "#77EE88", "#FFFF88", "#7777AA", ]
var	g_nfocusparty = 0;
var	g_aparties = APARTIESDEF;
var	pty1 = g_aparties[g_nfocusparty];
var g_adrps = [
	{ bdis: true, att: 1, num: 3, nen: 0, brow: false },
	{ bdis: false, att: 3, num: 3, nen: 0, brow: false },
//	{ bdis: false, att: 1, num: 6, nen: 0, brow: true }
//	{ bdis: false, att: 5, num: 5, nen: 4, brow: false }
	{ bdis: false, att: 4, num: 3, nen: 0, brow: false },
//	{ bdis: false, att: 4, num: 5, nen: 0, brow: false }
	{ bdis: false, att: 2, num: 5, nen: 0, brow: false }
];
/*
var	enhrows = [
	{	bdis: false, type: 1, att: 4, rate: 1, blf: false },
	{	bdis: false, type: 2, att: 3, rate: 2, blf: false },
//	{	bdis: true, type: 3, att: 2, rate: 1.5, blf: false },
	{	bdis: true, type: 4, att: 1, rate: 3.5, blf: true }
];
*/

// Cordova events
function onDeviceReady() {
	if(navigator.splashscreen != undefined)
		navigator.splashscreen.hide();
}

var	admgsall = new Array();
function f() {
	// 主属性攻撃力から副属性攻撃力を計算
	for(ii = 0; ii < pty1.mbrs.length; ii++) {
		var	m0 = pty1.mbrs[ii];
		if(m0.no == 0)
			continue;
		for(i = 1; i < m0.dmgs.length; i++) {
			m0.dmgs[i].dmg = (m0.dmgs[0].att != m0.dmgs[i].att
				? Math.ceil(m0.dmgs[0].dmg / 3) : Math.ceil(m0.dmgs[0].dmg / 10));
			//console.debug("x " + ii + ", " + i + " " + m0.dmgs[0].dmg + " -> " + m0.dmgs[i].dmg);
		}
	}
	//console.debug(pty1.mbrs);

	var	drps = droprows_to_json();
	var	abAls = [ false, false, false, false, false, false ];	// 属性ごと全体攻撃か
	for(ii = 0; ii < drps.length; ii++) {
		if(drps[ii].num >= 5)
			abAls[drps[ii].att] = true;
	}

	// 属性ごとの属性強化倍率を計算
	var	aexEs = [ 1.0, 1.0, 1.0, 1.0, 1.0, 1.0 ];				// 属性ごと強化倍率
	for(i = 0; i < aexEs.length; i++) {
		var	nrens0 = 0;
		for(ii = 0; ii < pty1.mbrs.length; ii++) {
			nrens0 += pty1.mbrs[ii].rens[i];
		}
		var	nrows0 = 0;
		for(ii = 0; ii < drps.length; ii++) {
			if(drps[ii].att == i && (drps[ii].num >= 6 && drps[ii].brow))
				nrows0++;
		}
		aexEs[i] = 1 + (nrens0 * nrows0) * 0.1;
	}
	//console.debug(aexEs);

	// calc LF enhance
	var	alsenhs = lsenhs_to_json();
	var	ex_lsenh = 1;
	for(io = 0; io < alsenhs.length; io++) {
		var	bapp = false;
		var	enh0 = alsenhs[io];
		if(enh0.bdis)
			continue;
		for(im = 0; im < m0.types.length; im++) {
			if(enh0.type == 0 || enh0.type == m0.types[im]) {
				bapp = true;
				break;
			}
		}
		if(!bapp)
			continue;
		bapp = false;
		for(im = 0; im < m0.dmgs.length; im++) {
			if(enh0.att == 0 || enh0.att == m0.dmgs[im].att) {
				bapp = true;
				break;
			}
		}
		if(!bapp)
			continue;
		ex_lsenh *= (enh0.blf ? enh0.xenh * enh0.xenh : enh0.xenh);
	}

	// 全員の攻撃力を計算
	admgsall = new Array();
	for(ii = 0; ii < pty1.mbrs.length; ii++) {
		var	m0 = pty1.mbrs[ii];
		if(m0.no == 0)
			continue;
		m0.acalc = new Array();

		for(iii = 0; iii < m0.dmgs.length; iii++) {
			var	dmg0 = m0.dmgs[iii];
			for(i = 0; i < drps.length; i++) {
				var d0 = drps[i];
				if(d0.att != dmg0.att)
					continue;


				var	exn0 = ((d0.num + 1) * 0.25);
				exn0 *= (d0.nen > 0 ? (1 + d0.nen * 0.06) : 1);
				var	ex_num = Math.floor(exn0 * 1000) / 1000;
				var	ex_ren = Math.floor(aexEs[d0.att] * 1000) / 1000;
				var	ex_cmb = (drps.length - 1) * 0.25 + 1;
				var	ex_twy = (d0.num == 4 && m0.tway > 0 ? Math.pow(1.5, m0.tway) : 1);
				var	ndmg0 = dmg0.dmg;
				ndmg0 = Math.floor(ndmg0 * ex_num);
				ndmg0 = Math.ceil(ndmg0 * ex_cmb);
				ndmg0 = Math.floor(ndmg0 * ex_ren * ex_twy * ex_lsenh);

				var	stempx = ("[" + ii + "] att: " + d0.att + " dmg: "
					+ (dmg0.dmg + " * num " + ex_num + " * cmb " + ex_cmb + " * ren " + ex_ren
					+ " * tway " + ex_twy + " * ls " + ex_lsenh)
					+ " => " + ndmg0);
				//console.debug(stempx);
				var	newdmg0 = { att: dmg0.att, dmg: ndmg0, bal: abAls[dmg0.att], btw: (d0.num == 4 && m0.tway > 0), text: stempx };

				//console.debug(newdmg0);
				m0.acalc.push(newdmg0);
				admgsall.push(newdmg0);
			}
		}
	}

	show_table_dmgs();
}
function show_table_dmgs() {
	// 属性ごとの攻撃力 (単純合計) を表示
	var	admgs0 = [ 0, 0, 0, 0, 0, 0 ], ndmgssum = 0;
	for(i = 0; i < admgsall.length; i++) {
		var	dmg0 = admgsall[i];
		admgs0[dmg0.att] += dmg0.dmg;
	}
	for(i = 1; i < admgs0.length; i++) {
		$('#d_dmgtd_' + i).html(
			//"<font color='" + ACS_ATTRCOL[i] + "'>●</font>" + 
			(admgs0[i]).formatMoney(0, ",", "."));
		ndmgssum += admgs0[i];
	}
	$('#d_dmgtd_total').text("Total. "
		+ (ndmgssum).formatMoney(0, ",", "."));
}

var	ACATTRX = [
	[ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ],	// dmg P
	[ 1.0, 1.0, 0.5, 2.0, 1.0, 1.0 ],	// dmg R
	[ 1.0, 2.0, 1.0, 0.5, 1.0, 1.0 ],	// dmg B
	[ 1.0, 0.5, 2.0, 1.0, 1.0, 1.0 ],	// dmg G
	[ 1.0, 1.0, 1.0, 1.0, 1.0, 2.0 ],	// dmg L
	[ 1.0, 1.0, 1.0, 1.0, 2.0, 1.0 ]	// dmg D
];
var	g_aotargets = ATARGTETSDEF;

function g() {
	var	tgts = g_aotargets[parseInt($('#s_target').val())].amons;
	//
	for(i = 0; i < tgts.length; i++) {
		tgts[i].hp = tgts[i].hp0;
	}
	// 敵 HP に全体攻撃を適用
	for(i = 0; i < admgsall.length; i++) {
		var	dmg0 = admgsall[i];
		if(!dmg0.bal)
			continue;
		for(ii = 0; ii < tgts.length; ii++) {
			var	t0 = tgts[ii];
			var	a0 = (t0.hp <= 0 ? 0 : Math.floor(t0.att.length - (t0.hp / t0.hp0) * t0.att.length));
			var	d0 = (dmg0.dmg * ACATTRX[dmg0.att][t0.att[a0]]);
			if(d0 > 0) {
				d0 = (d0 > t0.def ? d0 - t0.def : 1);
			}
			var	dmgt0 = (t0.hp < d0 ? t0.hp : d0);
			//console.debug("bal (" + i + ", " + ii + ") " + t0.hp + " - " + dmgt0  + " = " + (t0.hp - dmgt0));
			if(dmgt0 < 0) {
				console.log("(W) negative dmg value [" + i + "](" + dmgt0 + ")");
			}
			t0.hp -= dmgt0;
		}
	}
	// 敵 HP に単体攻撃を適用
	for(i = 0; i < admgsall.length; i++) {
		var	dmg0 = admgsall[i];
		if(dmg0.bal)
			continue;
		var	admgsts = new Array();
		for(ii = 0; ii < tgts.length; ii++) {
			var	t0 = tgts[ii];
			// HP 残り割合に応じて属性を計算する
			//var	a0 = (t0.hp <= 0 ? 0 : Math.floor(t0.att.length - (t0.hp / t0.hp0) * t0.att.length));
			// 実際には攻撃ターンが終わるまでは属性が変わらないので 0 (主属性) 固定とする
			var	a0 = 0;
			var	d0 = (dmg0.dmg * ACATTRX[dmg0.att][t0.att[a0]]);
			if(d0 > 0) {
				d0 = (d0 > t0.def ? d0 - t0.def : 1);
			}
			var	dmgt0 = (t0.hp < d0 ? t0.hp : d0);
			if(dmgt0 < 0) {
				console.log("(W) negative dmg value [" + i + "](" + dmgt0 + ")");
			}
			admgsts.push({ tgt: t0, dmg: dmgt0 });
		}
		admgsts.sort(function(v1, v2) {
				return	(v2.dmg - v1.dmg);
			});
		var	dmgv0 = admgsts[0];	// sorted top
		//console.debug("bea 1 " + dmgv0.tgt.hp + " - " + dmgv0.dmg + " = " + (dmgv0.tgt.hp - dmgv0.dmg));
		dmgv0.tgt.hp -= dmgv0.dmg;
		if(dmg0.btw && admgsts.length > 1) {
//console.debug("bea " + admgsts[1].tgt.hp + " - " + admgsts[1].dmg);
			admgsts[1].tgt.hp -= admgsts[1].dmg;
		}
	}

	// 表示用データ作成
/*	var	stemp0 = "";
	for(ii = 0; ii < tgts.length; ii++) {
		var	t0 = tgts[ii];
		stemp0 += (", " + t0.hp);
	}
	console.debug(stemp0);
*/
	$('#tbody_tgtsdmg').empty();
	for(i = 0; i < tgts.length; i++) {
		var	npct = Math.floor((tgts[i].hp / tgts[i].hp0) * 100);
		var	sattrs = "<div class='xxx_icon_base xxx_icon_attr_" + tgts[i].att[0] + "' style='margin: 0px; float: left' />";
		if(tgts[i].att.length > 1 && tgts[i].att[1] > 0)
			sattrs += "<div class='xxx_icon_base xxx_icon_attr_" + tgts[i].att[1] + "' style='margin: 5px 0 0 -5px; float: left' />";
		$('#tbody_tgtsdmg').append(
			"<tr>"
			+ "	<td id='td_tgtdmg_" + i + "' style='margin-left: 1em;'>"
			+ sattrs
			+ (tgts[i].hp0).formatMoney(0, ",", ".") + "</td>"
			+ "	<td>" + (tgts[i].hp).formatMoney(0, ",", ".") + " (" + npct + " %)</td>"
			+ "</tr>");
	}
}

function onchange_edit_charic() {
	set_char_img('#im_charic_edit', $('#tx_char_no').val(),
		[ { att: $('#s_attr1').val(), dmg: 0 }, { att: $('#s_attr2').val(), dmg: 0 } ]);
}

var	g_charidx_edit = 0;
function go_editchar(idx) {
	if(pty1.mbrs.length <= idx) {
		pty1.mbrs[idx] = { no: 0, types: [ 0, 0 ], dmgs: [ { att: 0, dmg: 0 }, { att: 0, dmg: 0 } ], rens: [ 0, 0, 0, 0, 0, 0 ], tway: 0 };
	}
	g_charidx_edit = idx;
	document.location.href = "#p_char_edit";
}

var	g_sextrespath = null;
$(document).ready(function() {
	$("#title_head").text(SC_APPTITLE_N);

	g_sextrespath = localStorage.getItem(SC_APPSAVE_ERESPATH);
	if(g_sextrespath != null)
		$("#tx_erespath").val(g_sextrespath);

	$(function() {
		FastClick.attach(document.body);
	});
//$(document).on("pagecreate", function() {
    $("#btn_compute").click(function () {
		f();
		g();
    });

	$("#dcol_lsenh").collapsible({
		collapse: function(event, ui) {
				var	ncnt = 0;
				for(i = 0; i < g_nenhrows; i++) {
					if($("#cb_enhenb_" + i).is(":checked") == false)
						ncnt++;
				}
				$("#sp_enhrows_bal").text(ncnt + " / " + g_nenhrows);
			},
		expand: function(event, ui) {
				$("#sp_enhrows_bal").text("");
			}
	});
	$("#dcol_cmbrows").collapsible({
		collapse: function(event, ui) {
				var	ncnt = 0;
				for(i = 0; i < g_ndropcmbs; i++) {
					if($("#cb_drpenb_" + i).is(":checked") == false)
						ncnt++;
				}
				$("#sp_cmbrows_bal").text(ncnt + " / " + g_ndropcmbs);
			},
		expand: function(event, ui) {
				$("#sp_cmbrows_bal").text("");
			}
	});

	$("#tx_char_no").bind("change", function(event, ui) {
		onchange_edit_charic();
	});
	$("#s_attr1").bind("change", function(event, ui) {
		onchange_edit_charic();
	});
	$("#s_attr2").bind("change", function(event, ui) {
		onchange_edit_charic();
	});

	lo_partyselect();
	lo_targetselect();

	lo_enhrows();
	lo_enhrows_expand(0);
	lo_dropcmbs();
	lo_dropcmbs_expand(0);

	show_table_dmgs();
	lsenhs_from_json(pty1.alsenhs);
	droprows_from_json(g_adrps);

	switch_focus_party(g_nfocusparty);

	load_plugin_js();
});
function load_plugin_js() {
	$("#title_head").text(SC_APPTITLE_N);

	if(g_sextrespath != null) {
		$.ajax({
			url: (g_sextrespath + "/plugin_ready.js"),
			dataType: "script",
			crossDomain: true,
			success: function() {
				//console.log("plugin_ready.js loaded.");
				$("#title_head").text(SC_APPTITLE_P);
			}
		});
	}
}
function lo_partyselect() {
	$("#s_party").empty();
	for(i = 0; i < g_aparties.length; i++) {
		$("#s_party").append("<option value=\"" + i + "\">" + g_aparties[i].name + "</option>");
	}
	$("#s_party").selectmenu();
	$("#s_party").selectmenu("refresh");
	setOptionValue("#s_party", g_nfocusparty);
}
function lo_targetselect() {
	$("#s_target").empty();
	for(i = 0; i < g_aotargets.length; i++) {
		$("#s_target").append("<option value=\"" + i + "\">" + g_aotargets[i].name + "</option>");
	}
	$("#s_target").selectmenu();
	$("#s_target").selectmenu("refresh");
//	setOptionValue("#s_target", 0);
}

$(document).bind('mobileinit', function() {
	// 戻るボタンの自動表示
	$.mobile.page.prototype.options.addBackBtn = true;				
	// ページトラッキング
	$(':jqmData(role="page")').live('pageshow', function (event, ui) {
		_gaq.push(['_trackPageview', $.mobile.activePage.jqmData('url')]);
	});
	//
	$.mobile.defaultPageTransition = "slide";
});

function onLoadPartyJsonp(data) {
	console.log(data);
	g_aparties.push(data);
	g_nfocusparty = (g_aparties.length - 1);
	switch_focus_party(g_nfocusparty);
	Toast("party [" + data.name + "] をロードしました");
}
// http://pastebin.com/raw.php?i=rUUBAqg9
function loadPartyJsonp() {
	var	surl = $("#tx_urlpartyjsonp").val();
	$.ajax({
		url : surl,
		data : {
//			format : 'json'
		},
		dataType : 'script',
//		jsonp : 'xxxx',
		success : function(data, status) {
			//console.log(JSON.stringify(data));
			console.log("loadPartyJsonp success [" + status + "]");
		},
		error : function(xhr, status, ethrown) {
			//console.log("(E) loadPartyJsonp [" + surl + "] load failed.");
			Toast("[" + surl + "] のロードに失敗しました (" + status + ")");
		}
	});
	$("#popupEditParty").popup("close");
}

// http://stackoverflow.com/questions/9318674/javascript-number-currency-formatting
Number.prototype.formatMoney = function(decPlaces, thouSeparator, decSeparator) {
	var	n = this,
		decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
		decSeparator = decSeparator == undefined ? "." : decSeparator,
		thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
		sign = n < 0 ? "-" : "",
		i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
		j = (j = i.length) > 3 ? j % 3 : 0;
	return	sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};
// http://james.padolsey.com/javascript/deep-copying-of-objects-and-arrays/
function deepCopy(obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        var out = [], i = 0, len = obj.length;
        for ( ; i < len; i++ ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    if (typeof obj === 'object') {
        var out = {}, i;
        for ( i in obj ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    return obj;
}

function setExtResPath() {
	var	s0 = $("#tx_erespath").val();
	if(s0.length > 0)
		g_sextrespath = s0;
	else
		g_sextrespath = null;
	localStorage.setItem(SC_APPSAVE_ERESPATH, g_sextrespath);
	$("#popupAppOpt").popup("close");

	load_plugin_js();
	switch_focus_party(g_nfocusparty);
}

function appSaveAll() {
	localStorage.setItem(SC_APPSAVE_PARTIES, JSON.stringify(g_aparties));
	$("#popupAppOpt").popup("close");
}
function appLoadAll() {
	g_aparties = JSON.parse(localStorage.getItem(SC_APPSAVE_PARTIES));
	g_nfocusparty = 0;
	switch_focus_party(g_nfocusparty);
	$("#popupAppOpt").popup("close");
}

var	NC_DROPCMB_MAX = 10, NC_ENHROWS_MAX = 6;
var	aLastStyle = new Array();
function lo_dropcmbs() {
//	$("#c_drps").empty();
	for(i = 0; i < NC_DROPCMB_MAX; i++) {
		var	s0 = "<div id='d_drprow_" + i + "' data-role='controlgroup' data-type='horizontal'>";
		s0 += "	<input name='cb_drpenb_" + i + "' id='cb_drpenb_" + i + "' type='checkbox' data-mini='true' /><label for='cb_drpenb_" + i + "'>✕</label>"
			+ "		<select name='s_drpatt_" + i + "' id='s_drpatt_" + i + "' data-theme='a' data-mini='true' data-iconshadow='false' data-shadow='false' data-iconpos='right' data-inline='false' data-native-menu='true' class='ui-nodisc-icon' tabindex='-1'>";
		s0 += "			<option icon='ui-icon-attr-1' value='1'>火</option><option icon='ui-icon-attr-2' value='2'>水</option><option icon='ui-icon-attr-3' value='3'>木</option><option icon='ui-icon-attr-4' value='4'>光</option><option icon='ui-icon-attr-5' value='5'>闇</option>";
		s0 += "		</select>"
			+ "		<select name='s_drpnum_" + i + "' id='s_drpnum_" + i + "' data-theme='a' data-mini='true' data-icon='false' data-inline='true' data-native-menu='true' tabindex='-1'>";
		for(ii = 3; ii <= 30; ii++) {
			s0 += "<option value=\"" + ii + "\">" + ii + "</option>";
		}
		s0 += "		</select>"
			+ "		<select name='s_dennum_" + i + "' id='s_dennum_" + i + "' data-theme='a' data-mini='true' data-icon='false' data-inline='true' data-native-menu='true' tabindex='-1'>";
		for(ii = 0; ii <= 30; ii++) {
			s0 += "<option value=\"" + ii + "\">+ " + ii + "</option>";
		}
		s0 += "		</select>"
			+ "	<input type='checkbox' name='cb_drprow_" + i + "' id='cb_drprow_" + i + "' class='custom' data-mini='true' /><label for='cb_drprow_" + i + "'>列</label>";
			+ "</div>";
		$("#c_drps").append(s0);
//		$("#s_drpatt_" + i).selectmenu();
//		$("#s_drpatt_" + i).selectmenu("refresh");
//		$("#cb_row_" + i).checkboxradio();
//		$("#cb_row_" + i).checkboxradio("refresh");
		$("#d_drprow_" + i).controlgroup();
		$("#d_drprow_" + i).controlgroup("refresh");
		// change icon following the selection http://jsfiddle.net/Strixy/gKbDw/
		var target_id = ("s_drpatt_" + i);
//		$('#' + target_id + ' option').each(function () {
//			var ind = $(this).index();
//			$('#' + target_id + '-menu').find('[data-option-index=' + ind + ']').addClass($(this).attr('icon'));
//		});
		$('#' + target_id).on('change', function () {
			var	sid = $(this).attr("id");
//			console.log($(this));
//			console.log("onchange " + $(this).val());
			var selection = $(this).find(':selected').attr('icon');
			if(aLastStyle[sid] != null) {
				//console.log("aLastStyle[" + sid + "] " + aLastStyle[sid]);
				$(this).closest('.ui-select').find('.ui-btn').removeClass(aLastStyle[sid]);
			}
			$(this).closest('.ui-select').find('.ui-btn').addClass(selection);
			aLastStyle[sid] = selection;
		});
	}
}
function lo_enhrows() {
//	$("#c_enhs").empty();
	for(i = 0; i < NC_ENHROWS_MAX; i++) {
		var	s0 = "<div id='d_enhrow_" + i + "' data-role='controlgroup' data-type='horizontal'>"
			+ "	<input name='cb_enhenb_" + i + "' id='cb_enhenb_" + i + "' type='checkbox' data-mini='true' /><label for='cb_enhenb_" + i + "'>✕</label>"
			+ "		<select name='s_enhtyp_" + i + "' id='s_enhtyp_" + i + "' data-theme='a' data-mini='true' data-icon='false' data-inline='true' data-native-menu='true' tabindex='-1'>";
		for(ii = 0; ii < SC_TYPEN.length; ii++)
			s0 += "<option value='" + ii + "'>" + SC_TYPEN[ii] + "</option>";
		s0 += "		</select>"
			+ "	<select name='s_enhatt_" + i + "' id='s_enhatt_" + i + "' data-theme='a' data-mini='true' data-icon='false' data-inline='true' data-native-menu='true' tabindex='-1'>";
		for(ii = 0; ii < SC_ATTRN.length; ii++)
			s0 += "<option value='" + ii + "'>" + SC_ATTRN[ii] + "</option>";
		s0 += "	</select>"
			+ "	<select name='s_enhrat_" + i + "' id='s_enhrat_" + i + "' data-theme='a' data-mini='true' data-icon='false' data-inline='true' data-native-menu='true' tabindex='-1'>";
		for(ii = 0; ii < 19; ii++)
			s0 += "	<option value='" + (1 + ii * 0.5) + "'>x " + (1 + ii * 0.5) + "</option>";
		s0 += "	</select>"
			+ "	<input name='cb_enh_lf_" + i + "' id='cb_enh_lf_" + i + "' type='checkbox' data-mini='true' /><label for='cb_enh_lf_" + i + "'>LF</label>"
			+ "</div>";
		$("#c_enhs").append(s0);
		$("#d_enhrow_" + i).controlgroup();
		$("#d_enhrow_" + i).controlgroup("refresh");
	}
}
var	g_ndropcmbs = 1;
function lo_dropcmbs_expand(numarg) {
	g_ndropcmbs += numarg;
	if(g_ndropcmbs > NC_DROPCMB_MAX)
		g_ndropcmbs = (NC_DROPCMB_MAX - 0);
	else if(g_ndropcmbs < 1)
		g_ndropcmbs = 1;

	for(i = 1; i < (NC_DROPCMB_MAX + 1); i++) {
		if(i >= g_ndropcmbs) {
			$("#d_drprow_" + (i + 0)).hide();
		} else {
			$("#d_drprow_" + (i + 0)).show();
			$("#s_drpatt_" + (i + 0)).change();	// force change icon
		}
	}
}
var	g_nenhrows = 1;
function lo_enhrows_expand(numarg) {
	g_nenhrows += numarg;
	if(g_nenhrows > NC_ENHROWS_MAX)
		g_nenhrows = (NC_ENHROWS_MAX - 0);
	else if(g_nenhrows < 1)
		g_nenhrows = 1;

	for(i = 1; i < (NC_ENHROWS_MAX + 1); i++) {
		if(i >= g_nenhrows)
			$("#d_enhrow_" + (i + 0)).hide();
		else
			$("#d_enhrow_" + (i + 0)).show();
	}
}

function lsenhs_to_json() {
	var	alsenhs1 = new Array();
	for(i = 0; i < NC_ENHROWS_MAX; i++) {
		if(i == g_nenhrows)
			break;
//		if($("#cb_enhenb_" + i).is(":checked"))
//			continue;
		var	o0 = {	bdis: $("#cb_enhenb_" + i).is(":checked"), type: $("#s_enhtyp_" + i).val(),
			att: $("#s_enhatt_" + i).val(), xenh: $("#s_enhrat_" + i).val(),
			blf: $("#cb_enh_lf_" + i).is(":checked") };
		alsenhs1.push(o0);
	}
	return	alsenhs1;
}
function lsenhs_from_json(alsenhs1) {
	if(alsenhs1 === undefined)
		return;
	for(i = 0; i < NC_ENHROWS_MAX; i++) {
		if(alsenhs1.length <= i) {
			$("#d_enhrow_" + i).hide();
			continue;
		}
		var	lsenh0 = alsenhs1[i];
		$("#cb_enhenb_" + i).prop("checked", lsenh0.bdis);	//.checkboxradio("refresh");
		setOptionValue("#s_enhtyp_" + i, lsenh0.type);
		setOptionValue("#s_enhatt_" + i, lsenh0.att);
		setOptionValue("#s_enhrat_" + i, lsenh0.xenh);
		$("#cb_enh_lf_" + i).prop("checked", lsenh0.blf);
		$("#d_enhrow_" + i).show();
		$("#d_enhrow_" + i).controlgroup("refresh");
	}
	g_nenhrows = alsenhs1.length;
}

function droprows_to_json() {
	var	adrops1 = new Array();
	for(i = 0; i < NC_DROPCMB_MAX; i++) {
		if(i == g_ndropcmbs)
			break;
		if($("#cb_drpenb_" + i).is(":checked"))
			continue;
		var	o0 = {	bdis: $("#cb_drpenb_" + i).is(":checked"), att: $("#s_drpatt_" + i).val(),
			num: parseInt($("#s_drpnum_" + i).val()), nen: parseInt($("#s_dennum_" + i).val()),
			brow: $("#cb_drprow_" + i).is(":checked") };
		adrops1.push(o0);
	}
	return	adrops1;
}
function droprows_from_json(adrops) {
	for(i = 0; i < NC_DROPCMB_MAX; i++) {
		if(adrops.length <= i) {
			$("#d_drprow_" + i).hide();
			continue;
		}
		var	drp0 = adrops[i];
		$("#cb_drpenb_" + i).prop("checked", drp0.bdis);	//.checkboxradio("refresh");
		setOptionValue("#s_drpatt_" + i, drp0.att);
		setOptionValue("#s_drpnum_" + i, drp0.num);
		setOptionValue("#s_dennum_" + i, drp0.nen);
		$("#s_drpatt_" + i).change();	// force change icon
		$("#cb_drprow_" + i).prop("checked", drp0.brow);
		$("#d_drprow_" + i).show();
		$("#d_drprow_" + i).controlgroup("refresh");
	}
	g_ndropcmbs = adrops.length;
//	$("#sp_cmbrows_bal").text(ncnt);
}

function onDelParty() {
	if(g_aparties.length <= 1)
		return;
	if(confirm("Are you sure you remove [" + g_aparties[g_nfocusparty].name + "] ?") == false)
		return;
	g_aparties.splice(g_nfocusparty, 1);
	g_nfocusparty += (g_nfocusparty > 0 ? -1 : 0);
	switch_focus_party(g_nfocusparty);
	$("#popupEditParty").popup("close");
}
function oncopy_party() {
	var	o0 = deepCopy(g_aparties[g_nfocusparty]);
	o0.name = $("#tx_newname").val();
	g_aparties.push(o0);
	g_nfocusparty = (g_aparties.length - 1);
	switch_focus_party(g_nfocusparty);
	$("#popupEditParty").popup("close");
}

function setOptionValue(sid, value) {
	$(sid).val(value).attr("selected", true).siblings("option").removeAttr("selected");
	$(sid).selectmenu("refresh");
}

function show_calc_log() {
	var	s0 = "";
	for(ii = 0; ii < admgsall.length; ii++) {
		//console.log(admgsall[ii]);
		s0 += admgsall[ii].text + "<br>";
	}
	$("#d_dlg_log_main").empty();
	$("#d_dlg_log_main").append("<p>" + s0 + "</p>");
	$.mobile.changePage("#p_dlg_log");
}

function set_char_img(idimga, nnoa, dmgsa) {
	$(idimga).css("border-top", "thick solid " + ACS_ATTRCOL[dmgsa[0].att]);
	$(idimga).css("border-left", "thin solid " + ACS_ATTRCOL[dmgsa[0].att]);
	$(idimga).css("border-bottom", "thick solid "
		+ (dmgsa.length > 1 ? ACS_ATTRCOL[dmgsa[1].att] : ACS_ATTRCOL[0]));
	$(idimga).css("border-right", "thin solid "
		+ (dmgsa.length > 1 ? ACS_ATTRCOL[dmgsa[1].att] : ACS_ATTRCOL[0]));
	var	simgs0 = (g_sextrespath != null ? g_sextrespath : "./res/") + "/imgs/";
	var	simgpos = (ACHRIMG_POSSIZ[nnoa] == undefined ? "50% 25%" : ACHRIMG_POSSIZ[nnoa].pos);
	var	simgsiz = (ACHRIMG_POSSIZ[nnoa] == undefined ? "500px" : ACHRIMG_POSSIZ[nnoa].siz);
	var	newimgpath0 = (simgs0 + nnoa + ".jpg");
	{	// img direct load
		$(idimga).css("background", "transparent url("
			+ newimgpath0 + ") " + simgpos);
		$(idimga).css("background-size", simgsiz);
	}
	//$("#im_charic_" + (i + 1)).hide();//.css("background-image", "none").hide();
	/*var	curimgpath0 = $("#im_charic_" + (i + 1)).css("background");
	if(curimgpath0.match(newimgpath0) == null) {	// load only when the img be changed
		// load img for background only when succeeded to load it into temp <img>
		$("#im_charic_" + (i + 1)).css("background", "url(res/imgs/img_noimg.png) 50% 50%");
//		$("#im_charic_" + (i + 1)).css("background-size", "100px");
		$("#im_charic_" + (i + 1) + "_temp").attr("src", newimgpath0).off("load").on(
			"load", null,
			{ idxa: (i + 1), srca: ("transparent url(" + newimgpath0 + ") " + simgpos), siza: simgsiz },
			function(eoarg) {
  				$("#im_charic_" + eoarg.data.idxa).css("background", eoarg.data.srca);
				$("#im_charic_" + eoarg.data.idxa).css("background-size", eoarg.data.siza);
				//$("#im_charic_1").css("display", "inline");
				//$("#im_charic_1").fadeIn(1000);
				//console.log(eoarg.data);
				//console.log(eoarg.data.idxa + " loaded.");
			});
	}*/
}
function switch_focus_party(idx) {
	g_nfocusparty = parseInt(idx);
	pty1 = g_aparties[idx];
	for(i = 0; i< pty1.mbrs.length; i++) {
		var	mbr0 = pty1.mbrs[i];
		if(mbr0 == undefined)
			continue;
		$("#d_char_c" + (i + 1) + "no").text("# " + mbr0.no);
		$("#d_char_c" + (i + 1) + "dmg").text("a " + mbr0.dmgs[0].dmg);
		$("#im_charic_" + (i + 1)).css("border-top", "thick solid " + ACS_ATTRCOL[mbr0.dmgs[0].att]);
		$("#im_charic_" + (i + 1)).css("border-left", "thin solid " + ACS_ATTRCOL[mbr0.dmgs[0].att]);
		$("#im_charic_" + (i + 1)).css("border-bottom", "thick solid "
			+ (mbr0.dmgs.length > 1 ? ACS_ATTRCOL[mbr0.dmgs[1].att] : ACS_ATTRCOL[0]));
		//
		set_char_img("#im_charic_" + (i + 1), mbr0.no, mbr0.dmgs);
		/*var	simgs0 = (g_sextrespath != null ? g_sextrespath : "./res/") + "/imgs/";
		var	simgpos = (ACHRIMG_POSSIZ[mbr0.no] == undefined ? "50% 25%" : ACHRIMG_POSSIZ[mbr0.no].pos);
		var	simgsiz = (ACHRIMG_POSSIZ[mbr0.no] == undefined ? "500px" : ACHRIMG_POSSIZ[mbr0.no].siz);
		var	newimgpath0 = (simgs0 + mbr0.no + ".jpg");
		{	// img direct load
			$("#im_charic_" + (i + 1)).css("background", "transparent url("
				+ newimgpath0 + ") " + simgpos);
			$("#im_charic_" + (i + 1)).css("background-size", simgsiz);
		}
		//$("#im_charic_" + (i + 1)).hide();//.css("background-image", "none").hide();
		/*var	curimgpath0 = $("#im_charic_" + (i + 1)).css("background");
		if(curimgpath0.match(newimgpath0) == null) {	// load only when the img be changed
			// load img for background only when succeeded to load it into temp <img>
			$("#im_charic_" + (i + 1)).css("background", "url(res/imgs/img_noimg.png) 50% 50%");
//			$("#im_charic_" + (i + 1)).css("background-size", "100px");
			$("#im_charic_" + (i + 1) + "_temp").attr("src", newimgpath0).off("load").on(
				"load", null,
				{ idxa: (i + 1), srca: ("transparent url(" + newimgpath0 + ") " + simgpos), siza: simgsiz },
				function(eoarg) {
	  				$("#im_charic_" + eoarg.data.idxa).css("background", eoarg.data.srca);
					$("#im_charic_" + eoarg.data.idxa).css("background-size", eoarg.data.siza);
					//$("#im_charic_1").css("display", "inline");
					//$("#im_charic_1").fadeIn(1000);
					//console.log(eoarg.data);
					//console.log(eoarg.data.idxa + " loaded.");
				});
		}*/
	}
	for(i = pty1.mbrs.length; i < 6; i++) {
		$("#d_char_c" + (i + 1) + "no").text("");
		$("#d_char_c" + (i + 1) + "dmg").text("");
		$("#im_charic_" + (i + 1)).css("background", "none");
		$("#im_charic_" + (i + 1)).css("border", "none");
	}

	lo_partyselect();
	lsenhs_from_json(pty1.alsenhs);
}

$(document).bind("pagebeforehide", function(event, topage) {
	if(event.target.id == "page_top") {
		pty1.alsenhs = lsenhs_to_json();
		g_adrps = droprows_to_json();
	}
//	console.debug(topage);
});
$(document).bind("pageshow", function(event) {
//$(document).delegate(".ui-page", "pageshow", function(event) {
//$(document).delegate("pageshow", function(event) {
	//console.debug(event.target.id);
	if(event.target.id == "page_top") {
		switch_focus_party(g_nfocusparty);
		$("#tx_erespath").val(g_sextrespath);
	} else 
	if(event.target.id == "p_char_edit") {
		init_char_edit();
	}
});
function init_char_edit() {
	// load data into the form
	var	mbr0 = pty1.mbrs[g_charidx_edit];
	$("#tx_char_no").val(mbr0.no);
	$("#tx_char_dmg").val(mbr0.dmgs[0].dmg);
	for(i = 0; i < mbr0.types.length; i++) {
		$("#s_type" + (i + 1)).val(mbr0.types[i]);
		$("#s_type" + (i + 1)).selectmenu("refresh");
		if(i == 1)
			break;
	}
	for(i = 0; i < mbr0.dmgs.length; i++) {
		$("#s_attr" + (i + 1)).val(mbr0.dmgs[i].att);
		$("#s_attr" + (i + 1)).selectmenu("refresh");
		if(i == 1)
			break;
	}
	for(i = 1; i < mbr0.rens.length; i++) {
		$("#sl_enh_" + i).val(mbr0.rens[i]);
		$("#sl_enh_" + i).slider("refresh");
	}

	onchange_edit_charic();
}
function end_char_edit(bsave) {
	// store edited form values
	if(bsave) {
		var	mbr0 = pty1.mbrs[g_charidx_edit];
		mbr0.no = $("#tx_char_no").val();
		mbr0.dmgs[0].dmg = parseInt($("#tx_char_dmg").val());
		for(i = 0; i < mbr0.types.length; i++) {
			mbr0.types[i] = $("#s_type" + (i + 1)).val();
			if(i == 1)
				break;
		}
		for(i = 0; i < mbr0.dmgs.length; i++) {
			mbr0.dmgs[i].att = $("#s_attr" + (i + 1)).val();
			if(i == 1)
				break;
		}
		for(i = 1; i < mbr0.rens.length; i++) {
			mbr0.rens[i] = parseInt($("#sl_enh_" + i).val());
		}
	}
	document.location.href = "#page_top";
}

function onEditJsonParty(bAsJsonp) {
	document.location.href = "#p_party_json";
	var	sprefix = (bAsJsonp ? "onLoadPartyJsonp(" : "");
	var	ssuffix = (bAsJsonp ? ");" : "");
	$("#ta_party_json").text(sprefix + JSON.stringify(pty1) + ssuffix);
}
function endEditjsonParty(bsave) {
	if(bsave && $('#cb_partyjson_p').is(':checked') == true) {
		Toast("JSONP 形式のままでは保存できません");
		return;
	}
	if(bsave) {
		var	o0 = JSON.parse($("#ta_party_json").text());
		pty1 = o0;
	}
	document.location.href = "#page_top";
}

// utilities for plugin
// 使い方は、サンプルを参照してください。
var pluginutils = {
	version: 1,
	// 画像の中心位置、拡大率を調整します.
	setChrImgPosSiz: function(noa, possiz) {
		ACHRIMG_POSSIZ[noa] = possiz;
	},
	// 右上メニューに機能を追加します.
	addOptionMenuItem: function(sname, farg) {
		var	sid0 = sname.replace(/\s/g, "_");
		$("#lvOptPi").append("<li id='_piAddOpt" + sid0 + "' data-role='button' data-icon='arrow-r' data-theme='a'><a id='piAddOpt" + sid0 + "'>" + sname + "</a></li>");
		$("#piAddOpt" + sid0).bind("click", farg);
		$("#lvOptPi").listview("refresh");
	},
	// 右上メニューを閉じます.
	closeOptionMenu: function(sname, farg) {
		$("#popupAppOpt").popup("close");
	},
	// 想定敵を追加します.
	addTargetItem: function(aobjs) {
			for(i = 0; i < aobjs.length; i++) {
				ATARGTETSDEF.push(aobjs[i]);
		}
		lo_targetselect();
	}
}

// from https://gist.github.com/kamranzafar/3136584
function Toast(message) {
	var $toast = $('<div class="ui-loader ui-overlay-shadow ui-body-e ui-corner-all">'
		+ message + '</div>');

	$toast.css({
		display: 'block', 
		background: '#fff',
		opacity: 0.90, 
		position: 'fixed',
		padding: '12px',
		'text-align': 'center',
		width: '270px',
		left: ($(window).width() - (270 + (12 * 2))) / 2,
		top: $(window).height() - 100
	});

	var removeToast = function() {
		$(this).remove();
	};

	$toast.click(removeToast);

	$toast.appendTo($.mobile.pageContainer).delay(2000);
	$toast.fadeOut(400, removeToast);
}
