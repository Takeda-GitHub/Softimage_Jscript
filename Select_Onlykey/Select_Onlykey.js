var Display_moto = GetValue("preferences.fcurve_editor.display_options");
var select_mode_moto = GetValue("preferences.fcurve_editor.selected_mode_selects_curves");
Logmessage(Display_moto);
Logmessage(select_mode_moto);

var Display_ato = SetValue("preferences.fcurve_editor.display_options", 2, null);
var select_mode_ato = SetValue("preferences.fcurve_editor.selected_mode_selects_curves", true, null);
var oP = XSIFactory.CreateObject( "CustomProperty" );//一時的にカスタムプロパティを作成
oP.name = "選択したキーでカーブ表示さん";//タイトル表示
////////////////////////////////////////////////////////////////////////////////////////////////
//PPG内容
var oL;
var oItem;
oL = oP.PPGLayout;//PPGを追加
oL.AddGroup( "移動", true, 100);
	oL.AddRow();//タイトル以下にグループを追加
        oItem = oL.AddButton( "POSX", "POSX" );//ボタン追加 名前を「前削除」に
        oItem.SetAttribute( siUICX, 40 );//ボタンのYスケール追加
		oItem.SetAttribute( siUICY, 25 );//ボタンのYスケール追加
        oItem = oL.AddButton( "POSY", "POSY" );//ボタン追加 名前を「前削除」に
        oItem.SetAttribute( siUICX, 40 );//ボタンのYスケール追加
		oItem.SetAttribute( siUICY, 25 );//ボタンのYスケール追加
        oItem = oL.AddButton( "POSZ", "POSZ" );//ボタン追加 名前を「前削除」に
        oItem.SetAttribute( siUICX, 40 );//ボタンのYスケール追加
		oItem.SetAttribute( siUICY, 25 );//ボタンのYスケール追加
	oL.EndRow();
oL.EndGroup();//グループ〆
oL.AddGroup( "回転", true, 100);
	oL.AddRow();//タイトル以下にグループを追加
        oItem = oL.AddButton( "ROTX", "ROTX" );//ボタン追加 名前を「前削除」に
        oItem.SetAttribute( siUICX, 40 );//ボタンのYスケール追加
		oItem.SetAttribute( siUICY, 25 );//ボタンのYスケール追加
        oItem = oL.AddButton( "ROTY", "ROTY" );//ボタン追加 名前を「前削除」に
        oItem.SetAttribute( siUICX, 40 );//ボタンのYスケール追加
		oItem.SetAttribute( siUICY, 25 );//ボタンのYスケール追加
        oItem = oL.AddButton( "ROTZ", "ROTZ" );//ボタン追加 名前を「前削除」に
        oItem.SetAttribute( siUICX, 40 );//ボタンのYスケール追加
		oItem.SetAttribute( siUICY, 25 );//ボタンのYスケール追加
	oL.EndRow();
oL.EndGroup();//グループ〆
oL.AddGroup( "スケール", true, 100);
	oL.AddRow();//タイトル以下にグループを追加
        oItem = oL.AddButton( "SCLX", "SCLX" );//ボタン追加 名前を「前削除」に
        oItem.SetAttribute( siUICX, 40 );//ボタンのYスケール追加
		oItem.SetAttribute( siUICY, 25 );//ボタンのYスケール追加
        oItem = oL.AddButton( "SCLY", "SCLY" );//ボタン追加 名前を「前削除」に
        oItem.SetAttribute( siUICX, 40 );//ボタンのYスケール追加
		oItem.SetAttribute( siUICY, 25 );//ボタンのYスケール追加
        oItem = oL.AddButton( "SCLZ", "SCLZ" );//ボタン追加 名前を「前削除」に
        oItem.SetAttribute( siUICX, 40 );//ボタンのYスケール追加
		oItem.SetAttribute( siUICY, 25 );//ボタンのYスケール追加
	oL.EndRow();
oL.EndGroup();//グループ〆
oL.AddGroup( "ボタン", true, 100);
	oL.AddRow();//タイトル以下にグループを追加
        oItem = oL.AddButton( "Set", "エディター" );//ボタン追加 名前を「前削除」に
        oItem.SetAttribute( siUICX, 40 );//ボタンのYスケール追加
		oItem.SetAttribute( siUICY, 25 );//ボタンのYスケール追加
        oItem = oL.AddButton( "Reset", "リセット" );//ボタン追加 名前を「前削除」に
        oItem.SetAttribute( siUICX, 40 );//ボタンのYスケール追加
		oItem.SetAttribute( siUICY, 25 );//ボタンのYスケール追加
	oL.EndRow();
oL.EndGroup();//グループ〆

//////////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////
//実行分
oL.Language = "JScript";
oL.Logic = POSX_OnClicked.toString()+
		   POSY_OnClicked.toString()+
		   POSZ_OnClicked.toString()+
		   ROTX_OnClicked.toString()+
		   ROTY_OnClicked.toString()+
		   ROTZ_OnClicked.toString()+
		   SCLX_OnClicked.toString()+
		   SCLY_OnClicked.toString()+
		   SCLZ_OnClicked.toString()+
		   Set_OnClicked.toString()+
		   Reset_OnClicked.toString();
//////////////////////////////////////

function POSX_OnClicked()
{
var rtn = GetKeyboardState();//押されている、キーのステータスを取得
Key_st = rtn(1);//戻り値をで返す
var str = "";//空変数
     if ( 2 & Key_st )
		{
		str = "Ctrl"
		}
    
          if ( str == "" )
		  {
			SetMarking("kine.local.pos.posx");
		  }
		  else
		  {
			AddToMarking("kine.local.pos.posx");
		  }
}
function POSY_OnClicked()
{
var rtn = GetKeyboardState();//押されている、キーのステータスを取得
Key_st = rtn(1);//戻り値をで返す
var str = "";//空変数
     if ( 2 & Key_st )
		{
		str = "Ctrl"
		}
    
          if ( str == "" )
		  {
			SetMarking("kine.local.pos.posy");
		  }
		  else
		  {
			AddToMarking("kine.local.pos.posy");
		  }
}
function POSZ_OnClicked()
{
var rtn = GetKeyboardState();//押されている、キーのステータスを取得
Key_st = rtn(1);//戻り値をで返す
var str = "";//空変数
     if ( 2 & Key_st )
		{
		str = "Ctrl"
		}
    
          if ( str == "" )
		  {
			SetMarking("kine.local.pos.posz");
		  }
		  else
		  {
			AddToMarking("kine.local.pos.posz");
		  }
}
function ROTX_OnClicked()
{
var rtn = GetKeyboardState();//押されている、キーのステータスを取得
Key_st = rtn(1);//戻り値をで返す
var str = "";//空変数
     if ( 2 & Key_st )
		{
		str = "Ctrl"
		}
    
          if ( str == "" )
		  {
			SetMarking("kine.local.ori.euler.rotx");
		  }
		  else
		  {
			AddToMarking("kine.local.ori.euler.rotx");
		  }
}
function ROTY_OnClicked()
{
var rtn = GetKeyboardState();//押されている、キーのステータスを取得
Key_st = rtn(1);//戻り値をで返す
var str = "";//空変数
     if ( 2 & Key_st )
		{
		str = "Ctrl"
		}
    
          if ( str == "" )
		  {
			SetMarking("kine.local.ori.euler.roty");
		  }
		  else
		  {
			AddToMarking("kine.local.ori.euler.roty");
		  }
}
function ROTZ_OnClicked()
{
var rtn = GetKeyboardState();//押されている、キーのステータスを取得
Key_st = rtn(1);//戻り値をで返す
var str = "";//空変数
     if ( 2 & Key_st )
		{
		str = "Ctrl"
		}
    
          if ( str == "" )
		  {
			SetMarking("kine.local.ori.euler.rotz");
		  }
		  else
		  {
			AddToMarking("kine.local.ori.euler.rotz");
		  }
}
function SCLX_OnClicked()
{
var rtn = GetKeyboardState();//押されている、キーのステータスを取得
Key_st = rtn(1);//戻り値をで返す
var str = "";//空変数
     if ( 2 & Key_st )
		{
		str = "Ctrl"
		}
    
          if ( str == "" )
		  {
			SetMarking("kine.local.pos.sclx");
		  }
		  else
		  {
			AddToMarking("kine.local.pos.scl");
		  }
}
function SCLY_OnClicked()
{
var rtn = GetKeyboardState();//押されている、キーのステータスを取得
Key_st = rtn(1);//戻り値をで返す
var str = "";//空変数
     if ( 2 & Key_st )
		{
		str = "Ctrl"
		}
    
          if ( str == "" )
		  {
			SetMarking("kine.local.pos.scly");
		  }
		  else
		  {
			AddToMarking("kine.local.pos.scly");
		  }
}
function SCLZ_OnClicked()
{
var rtn = GetKeyboardState();//押されている、キーのステータスを取得
Key_st = rtn(1);//戻り値をで返す
var str = "";//空変数
     if ( 2 & Key_st )
		{
		str = "Ctrl"
		}
    
          if ( str == "" )
		  {
			SetMarking("kine.local.pos.sclz");
		  }
		  else
		  {
			AddToMarking("kine.local.pos.sclz");
		  }
}

function Set_OnClicked()
{
//JScript
var wsh = new ActiveXObject("WScript.Shell");
wsh.SendKeys("0");
}
function Reset_OnClicked()
{
SetValue("preferences.fcurve_editor.display_options", 1, null);
SetValue("preferences.fcurve_editor.selected_mode_selects_curves", false, null);
}

/////////////////////////////////////



InspectObj( oP, null, null, siLock );