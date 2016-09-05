var oPC = Dictionary.GetObject( "PlayControl" );//タイムレンジを取得
DefStart = GetGlobal( "Key_StartFrame" );
DefEnd = GetGlobal( "Key_EndFrame" );
DefStart = oPC.In.value;//インフレームに現状の開始値を代入
DefEnd = oPC.Out.value;//アウトフレームに現状の終了値を代入

var oP = XSIFactory.CreateObject( "CustomProperty" );
oP.name = "ランダムさん";//タイトル表示
oP.AddParameter2( "posx", siInt4, 10 , 0 , 100);
oP.AddParameter2( "posy", siInt4, 10 , 0 , 100);
oP.AddParameter2( "posz", siInt4, 10 , 0 , 100);
oP.AddParameter2( "rotx", siInt4, 50 , 0 , 180);
oP.AddParameter2( "roty", siInt4, 50 , 0 , 180);
oP.AddParameter2( "rotz", siInt4, 50 , 0 , 180);
oP.AddParameter2( "sclx", siInt4, 3 , 0 , 50);
oP.AddParameter2( "scly", siInt4, 3 , 0 , 50);
oP.AddParameter2( "sclz", siInt4, 3 , 0 , 50);
oP.AddParameter2( "Start", siInt4, DefStart);
oP.AddParameter2( "End", siInt4, DefEnd);
oP.AddParameter2( "Step", siInt4, 1 , 1, 5);
///////////////////////////////////////////////////////////////////////////////////
var oL, oItem;//空の宣言
oL = oP.PPGLayout;//PPGを追加
oL.AddRow();//タイトル以下にグループを追加
    oL.AddGroup( "", true, 100);
        oItem = oL.AddItem( "posx", "posx" );
        oItem = oL.AddItem( "posy", "posy" );
		oItem = oL.AddItem( "posz", "posz" );
    oL.EndGroup();
	 oL.AddGroup( "", true, 100);
        oItem = oL.AddItem( "rotx", "rotx" );
        oItem = oL.AddItem( "roty", "roty" );
		oItem = oL.AddItem( "rotz", "rotz" );
    oL.EndGroup()
	oL.AddGroup( "", true, 100);
        oItem = oL.AddItem( "sclx", "sclx" );
        oItem = oL.AddItem( "scly", "scly" );
		oItem = oL.AddItem( "sclz", "sclz" );
    oL.EndGroup()
	oL.AddGroup( "", true, 100);
        oItem = oL.AddItem( "Start", "Start" );
        oItem = oL.AddItem( "End", "End" );
		oItem = oL.AddItem( "Step", "Step" );
    oL.EndGroup()
	oL.AddGroup( "", true, 100 );
        oItem = oL.AddButton( "Set", "開始" );
        oItem.SetAttribute( siUICX, 60 );
		oItem.SetAttribute( siUICY, 120 );
    oL.EndGroup();
oL.EndRow();
///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////
//実行分
oL.Language = "JScript";
oL.Logic = Set_OnClicked.toString();
/////////////////////////////////////

function Set_OnClicked()
{
var Sel = GetValue("SelectionList");
var In =  PPG.Start.value;
var Out = PPG.End.value+2;
var Total = Out-In;
Logmessage(Total);

var Flame_posx = new Array();
var Flame_posy = new Array();
var Flame_posz = new Array();
var Flame_rotx = new Array();
var Flame_roty = new Array();
var Flame_rotz = new Array();
var Flame_sclx = new Array();
var Flame_scly = new Array();
var Flame_sclz = new Array();
for ( i=0 ; i<Total ; i++)
{
		Flame_posx.push(i);
		Flame_posy.push(i);
		Flame_posz.push(i);
		Flame_rotx.push(i);
		Flame_roty.push(i);
		Flame_rotz.push(i);
		Flame_sclx.push(i);
		Flame_scly.push(i);
		Flame_sclz.push(i);
		Flame_posx.push(Math.random()* PPG.posx.value );
		Flame_posy.push(Math.random()* PPG.posy.value );
		Flame_posz.push(Math.random()* PPG.posz.value );
		Flame_rotx.push(Math.random()* PPG.rotx.value );
		Flame_roty.push(Math.random()* PPG.roty.value );
		Flame_rotz.push(Math.random()* PPG.rotz.value );
		Flame_sclx.push(Math.random()* PPG.sclx.value );
		Flame_scly.push(Math.random()* PPG.scly.value );
		Flame_sclz.push(Math.random()* PPG.sclz.value );
}
////////////////////////////////
//トランス等追加
for ( i=0 ; i<Sel.Count ; i++)
	{
	var posx = Sel(i).kinematics.Local.posx;
	var posy = Sel(i).kinematics.Local.posy;
	var posz = Sel(i).kinematics.Local.posz;

	var rotx = Sel(i).kinematics.Local.rotx;
	var roty = Sel(i).kinematics.Local.roty;
	var rotz = Sel(i).kinematics.Local.rotz;

	var sclx = Sel(i).kinematics.Local.sclx;
	var scly = Sel(i).kinematics.Local.scly;
	var sclz = Sel(i).kinematics.Local.sclz;
	}

////////////////////////////////
//Fカーブ追加
var fc_posx = posx.AddFCurve();
var fc_posy = posy.AddFCurve();
var fc_posz = posz.AddFCurve();

var fc_rotx = rotx.AddFCurve();
var fc_roty = roty.AddFCurve();
var fc_rotz = rotz.AddFCurve();

var fc_sclx = sclx.AddFCurve();
var fc_scly = scly.AddFCurve();
var fc_sclz = sclz.AddFCurve();

////////////////////////////////
//配列にキー
var FPOSX = fc_posx.SetKeys(Flame_posx);
var FPOSY = fc_posy.SetKeys(Flame_posy);
var FPOSZ = fc_posz.SetKeys(Flame_posz);

var FROTX = fc_rotx.SetKeys(Flame_rotx);
var FROTY = fc_roty.SetKeys(Flame_roty);
var FROTZ = fc_rotz.SetKeys(Flame_rotz);

var FSCLX = fc_sclx.SetKeys(Flame_sclx);
var FSCLY = fc_scly.SetKeys(Flame_scly);
var FSCLZ = fc_sclz.SetKeys(Flame_sclz);

fc_posx.Resample( PPG.Start.value, PPG.End.value, PPG.Step.value );
fc_posy.Resample( PPG.Start.value, PPG.End.value, PPG.Step.value );
fc_posz.Resample( PPG.Start.value, PPG.End.value, PPG.Step.value );
fc_rotx.Resample( PPG.Start.value, PPG.End.value, PPG.Step.value );
fc_roty.Resample( PPG.Start.value, PPG.End.value, PPG.Step.value );
fc_rotz.Resample( PPG.Start.value, PPG.End.value, PPG.Step.value );
fc_sclx.Resample( PPG.Start.value, PPG.End.value, PPG.Step.value );
fc_scly.Resample( PPG.Start.value, PPG.End.value, PPG.Step.value );
fc_sclz.Resample( PPG.Start.value, PPG.End.value, PPG.Step.value );


}
InspectObj( oP, null, null, siLock );