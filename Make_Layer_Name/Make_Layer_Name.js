var rtn = GetKeyboardState();//押されている、キーのステータスを取得
Key_st = rtn(1);//戻り値をで返す
LogMessage( "押されているキーのステータス = " + Key_st);
var str = "";//空変数
if ( 1 & Key_st )
   {
    str = "Shift "
    } 
if ( str == "" )
{	  
	if ( Selection.count != 0 )
		{
			var oName = XSIInputBox("レイヤーの名前を入力して下さい。","Layer_Name","Layer" ) ;//ここの最後「Layer」がデフォルトの名前になります。
			if (oName == "")
			{
			var Cancel = XSIUIToolkit.Msgbox( "キャンセルされました", siMsgExclamation,"Cancel");
			}
			else
			{
			var oSel = Getvalue("Selectionlist");
			CreateLayer("",oName,oSel);
			}
		}
	else
		{
		var oName = XSIInputBox("レイヤーの名前を入力して下さい。","Layer_Name","Layer" ) ;//ここの最後「Layer」がデフォルトの名前になります。
			if (oName == "")
				{
				var Cancel = XSIUIToolkit.Msgbox( "キャンセルされました", siMsgExclamation,"Cancel");
				}
			else
				{
				CreateLayer("",oName);
				}
		}
}
else
{
	if ( Selection.count != 0 )
		{
		var oName = XSIInputBox("レイヤーの名前を入力して下さい。","Layer_Name","Layer" ) ;//ここの最後「Layer」がデフォルトの名前になります。
			if (oName == "")
			{
			var Cancel = XSIUIToolkit.Msgbox( "キャンセルされました", siMsgExclamation,"Cancel");
			}
			else
			{
			var oSel = Getvalue("Selectionlist");
			var CuLa = GetCurrentLayer();
			Logmessage(CuLa(0));
			var MakeLa = CreateLayer("",oName,oSel);
			Logmessage(MakeLa(0));
			MoveObjectToLayer(CuLa(0), MakeLa(0));
			}
		}
	else
		{
			var oName = XSIInputBox("レイヤーの名前を入力して下さい。","Layer_Name","Layer" ) ;//ここの最後「Layer」がデフォルトの名前になります。
		if (oName == "")
			{
			var Cancel = XSIUIToolkit.Msgbox( "キャンセルされました", siMsgExclamation,"Cancel");
			}
		else
			{
			var CuLa = GetCurrentLayer();
			Logmessage(CuLa(0));
			var MakeLa = CreateLayer("",oName);
			Logmessage(MakeLa(0));
			MoveObjectToLayer(CuLa(0), MakeLa(0));
			}
		}
}

		