SetValue("preferences.rendering.color_format", "tif", null);
var oPasses = ActiveProject.ActiveScene.Passes;
var ohako = XSIFactory.CreateObject( "XSI.Collection" );//   
var oPass = new Array();
for( var a=0 ; a<oPasses.Count ; a++ ) //         
	{
	oPass.push(oPasses(a));
	}
	var oDial = new ActiveXObject( "XSIDial.XSIDialog" );
	var op  = GetCurrentPass();
	for( var b=0 ; b<oPass.length ; b++ ) // 
		{
			Logmessage(oPass[b].name);
			Logmessage(op.name)
		if (oPass[b].name == op.name)
			{
			ohako.add([b]);
			Logmessage(ohako);
			}
		}
	oDPass = oDial.Comboex( "追加するパスを選択", oPass ,ohako);
	Logmessage(oPass[oDPass])
	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Sel = GetValue("SelectionList")
　　　for ( i=0 ; i<Sel.count ;  i++)
	{
　　　Mat = Sel(i).Material;
	MatName = Mat.name;
	Logmessage(MatName);
	Lib = Mat.Library;
	Logmessage(Lib);
	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var oName = XSIInputBox(Sel(i)+"に追加したいレンダーチャンネル名を指定して下さい。",  "      ",  "" ) ;
	var oCh = new Array(8);
	oCh[0] = "一次";
	oCh[1] = "一次と透明度";
	oCh[2] = "あらゆる二次";
	oCh[3] = "反射";
	oCh[4] = "屈折";
	oCh[5] = "透明度";
	oCh[6] = "シャドウ";
	oCh[7] = "環境";
	oDCh = oDial.Combo( "格納するタイプを選択", oCh );
	NumoDCh = Number(oDCh);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var oCop = new Array(5);
	oCop[0] = "フルカラー";
	oCop[1] = "赤";
	oCop[2] = "緑";
	oCop[3] = "青";
	oCop[4] = "アルファ";
	oDCop = oDial.Combo( "格納するコンポーネントを選択", oCop );
	NumoDCop = Number(oDCop);
	
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	InsertShader("Render_Channels\\Color_StoreInChannel", Lib+"."+MatName+".surface", null);
	CreateRenderChannel(oName, siRenderChannelColorType, null);
	SetValue(Lib+"."+MatName+".Color_StoreInChannel.channel", oName, null);
	SetValue(Lib+"."+MatName+".Color_StoreInChannel.raytype", NumoDCh, null);
	SetValue(Lib+"."+MatName+".Color_StoreInChannel.component", NumoDCop, null);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	CreateFramebuffer(oPass[oDPass], oName )
}