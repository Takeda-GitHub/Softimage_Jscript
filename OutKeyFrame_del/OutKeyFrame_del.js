var buttonPressed = XSIUIToolkit.Msgbox( "IN、OUTにキーは打たれてますか？？消えますよ？？", siMsgOkOnly | siMsgQuestion, "勧告" );
var oPC = Dictionary.GetObject( "PlayControl" );//タイムレンジを取得
DefMode = GetGlobal( "KeyFrame_Mode" );
DefStart = GetGlobal( "Key_StartFrame" );
DefEnd = GetGlobal( "Key_EndFrame" );
DefLock = GetGlobal( "Key_Lock" );

if ( DefMode == null )
{
    DefMode = 0;//モード「0」を代入
    DefStart = oPC.In.value;//インフレームに現状の開始値を代入
    DefEnd = oPC.Out.value;//アウトフレームに現状の終了値を代入
    DefLock = false;//ロックモードを代入
}

var oP = XSIFactory.CreateObject( "CustomProperty" );//一時的にカスタムプロパティを作成
oP.name = "キーフレーム殲滅";//タイトル表示
oP.AddParameter2( "iMode", siInt4, DefMode );//パラメータにDefMode「キーモード」を配置
oP.AddParameter2( "iStartFrame", siInt4, DefStart );//パラメータにDefStart「開始フレーム」を配置
oP.AddParameter2( "iEndFrame", siInt4, DefEnd );//パラメータにDefEnd「終了フレーム」を配置
oP.AddParameter2( "bOverrideLock", siBool, DefLock );//パラメータにDefLock「ロックモード」を配置

////////////////////////////////////////////////////////////////////////////////////////////////
//PPG内容
var oL, oItem;//空の宣言
oL = oP.PPGLayout;//PPGを追加
oL.AddRow();//タイトル以下にグループを追加
    oL.AddGroup( "", false, 110 );
        oItem = oL.AddButton( "FDeleteKey", "前削除" );//ボタン追加 名前を「前削除」に
        oItem.SetAttribute( siUICY, 110 );//ボタンのYスケール追加
    oL.EndGroup();//グループ〆
	
    oL.AddGroup( "", true, 150);
        oItem = oL.AddEnumControl( "iMode", Array( "指定外削除", 0, "指定内削除", 1 ), "Mode", siControlCombo); //リストボックスを作成中身はアレイで追加
        oItem.SetAttribute( siUINoLabel, true );//ラベルを追加
        oItem = oL.AddItem( "iStartFrame", "Start" );//アイテムを追加(iStartFrameで指定した、siInt4が入る)()内「Start」で自動に開始に変換
        oItem = oL.AddItem( "iEndFrame", "End" );//アイテムを追加(iEndFrameで指定した、siInt4が入る)()内「End」で自動に終了に変換
        oItem = oL.AddItem( "bOverrideLock", "LooKも関係なく削除" );//アイテムを追加(bOverrideLockで指定した、siBoolが入る)
    oL.EndGroup();
	
    oL.AddGroup( "", false, 110 );
        oItem = oL.AddButton( "BDeleteKey", "後削除" );//以下前削除同様
        oItem.SetAttribute( siUICY, 110 );
    oL.EndGroup();
oL.EndRow();
//////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////
//実行分
oL.Language = "JScript";
oL.Logic = FDeleteKey_OnClicked.toString()+
		   BDeleteKey_OnClicked.toString();
//////////////////////////////////////

function FDeleteKey_OnClicked()
{
    var oCol = XSIFactory.CreateObject( "XSI.Collection" );//コレクション宣言
    oCol.items = Selection;//選択をコレクションアイテム化
    var oExpanded = oCol.expand();//expandでコレクションに追加

    var oAll = XSIFactory.CreateObject( "XSI.Collection" );
    for ( var i=0; i<oExpanded.count; i++ )
    {
        oAll.AddItems( oExpanded(i).NodeAnimatedParameters(siFCurveSource));//選択されている物でアニメーションされている物で且つ、Fカーブのみをコレクション(oAll)に追加
    }
	    Mode = PPG.iMode.value;
	    FrameStart = PPG.iStartFrame.value;
	    FrameEnd = PPG.iEndFrame.value;
	    LockOverride = PPG.bOverrideLock.value;
	    
    for ( var i=0; i<oAll.count; i++ )
    {
        var oFc = oAll(i).Source;
        if ( Mode == 0 )
        {
            oFc.BeginEdit();
                oFc.RemoveKeys( FrameStart - 999999, FrameStart - 0.01, LockOverride );
            oFc.EndEdit();
        }
        else
        {
            oFc.BeginEdit();
                oFc.RemoveKeys( FrameStart - 0.01, FrameEnd + 0.01, LockOverride );
            oFc.EndEdit();
        }
    }

    SetGlobal( "Key_Mode", Mode );
    SetGlobal( "Key_StartFrame", FrameStart );
    SetGlobal( "Key_EndFrame", FrameEnd );
    SetGlobal( "Key_Lock", LockOverride );
    Logmessage( "削除完了" );

    SelectObj( oCol );
}

function BDeleteKey_OnClicked()
{
    var oCol = XSIFactory.CreateObject( "XSI.Collection" );//コレクション宣言
    oCol.items = Selection;//選択をコレクションアイテム化
    var oExpanded = oCol.expand();//expandでコレクションに追加

    var oAll = XSIFactory.CreateObject( "XSI.Collection" );
    for ( var i=0; i<oExpanded.count; i++ )
    {
        oAll.AddItems( oExpanded(i).NodeAnimatedParameters(siFCurveSource));//選択されている物でアニメーションされている物で且つ、Fカーブのみをコレクション(oAll)に追加
    }
	    Mode = PPG.iMode.value;
	    FrameStart = PPG.iStartFrame.value;
	    FrameEnd = PPG.iEndFrame.value;
	    LockOverride = PPG.bOverrideLock.value;
    for ( var i=0; i<oAll.count; i++ )
    {
        var oFc = oAll(i).Source;
        if ( Mode == 0 )
        {
            oFc.BeginEdit();
                oFc.RemoveKeys( FrameEnd + 0.01, FrameEnd + 999999, LockOverride );        
            oFc.EndEdit();
        }
        else
        {
            oFc.BeginEdit();
                oFc.RemoveKeys( FrameStart - 0.01, FrameEnd + 0.01, LockOverride );
            oFc.EndEdit();
        }
    }

    SetGlobal( "Key_Mode", Mode );
    SetGlobal( "Key_StartFrame", FrameStart );
    SetGlobal( "Key_EndFrame", FrameEnd );
    SetGlobal( "Key_Lock", LockOverride );
    Logmessage( "削除完了" );

    SelectObj( oCol );
}


InspectObj( oP, null, null, siLock );