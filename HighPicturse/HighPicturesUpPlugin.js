function TexUp(){
//////////////////////////////////////////////////////////////////////
//初期処理
var oXSI = new ActiveXObject( "XSI.Application" );
var oXSIAPP = oXSI.Application;
var oXSIUIT = new ActiveXObject( "XSI.UIToolkit" );
var oXSIFactory = new ActiveXObject( "XSI.Factory" );
var oProgressBar = oXSIUIT.ProgressBar ;
oProgressBar.Maximum = 6 ;
oProgressBar.Step = 1;
oProgressBar.Caption = "今処理中…";
oProgressBar.CancelEnabled = false ;
oProgressBar.Visible = true;
oXSIAPP.SetValue("preferences.scripting.cmdlog", false, null);
////////////////////////////////////////////////////////////////////////////
//ロック掛かってるイメージソースを解除

var oSources = oXSIAPP.ActiveProject.ActiveScene.NestedObjects("Sources") ;
var oSouImg = oSources.NestedObjects("Images");
var oLock_hako = oXSIFactory.CreateObject( "XSI.Collection" );
for ( var i=0, a = oSouImg.NestedObjects.Count; i < a; i++ ) { 
	if(oSouImg.NestedObjects(i).Locktype == 2)
				{
				oXSIAPP.Unlock(oSouImg.NestedObjects(i), "siLockLevelAll");
				}
	}
oXSIAPP.DeleteUnusedImageSources();
oProgressBar.Increment() ;
/////////////////////////////////////////////////////////////////////////////
//指定フォルダ以下のイメージ取得
var fso = new ActiveXObject("Scripting.FileSystemObject");
var PicPath = oXSIAPP.ActiveProject2.Path+"\\Pictures\\HighPictures";
var oFile_hako = oXSIFactory.CreateObject( "XSI.Collection" );
if (!fso.FolderExists(PicPath))
{
     var a = fso.CreateFolder(PicPath);
}
var oFolder = fso.GetFolder(PicPath);
var oFolder_File = new Array();
var oEFiles = new Enumerator(oFolder.Files);
while(!oEFiles.atEnd()){
oFolder_File.push( oEFiles.item().Name );
oEFiles.moveNext();
}
for ( y=0 ; y <oFolder_File.length ;  y++)
{
var srt = new String(oFolder_File[y]);
oFile_hako.add(srt);
}
oProgressBar.Increment() ;

///////////////////////////////////////////////////////////////////////
//シーン内のクリップを取得
var oXSI = new ActiveXObject( "XSI.Application" );
var oXSIAPP = oXSI.Application;
var oRoot = oXSIAPP.ActiveSceneroot;
var ohako = oXSIFactory.CreateObject( "XSI.Collection" );
var oError_hako_obj = oXSIFactory.CreateObject( "XSI.Collection" );
var oError_hako_cls = oXSIFactory.CreateObject( "XSI.Collection" );

var oPoly = oXSIAPP.ActiveSceneroot.FindChildren("","polymsh");
   for ( i=0 ; i<oPoly.count ;  i++)
          {
               Cls = oPoly(i).ActivePrimitive.Geometry.Clusters.Filter("poly",null,"");
               for ( j=0 ; j <Cls.count ;  j++)
               {
				try{oXSIAPP.SelectObj(Cls(j), null, null)
					{
					oXSIAPP.DeselectAll();
                    Mat = Cls(j).Material;
                    var shad = Mat.Shaders;
                    for ( k=0 ; k <shad.count ;  k++)
						{
						var cliplist = new Enumerator( shad(k).ImageClips );
						for ( ; !cliplist.atEnd(); cliplist.moveNext()) 
							{
							var Item = cliplist.item();
							var Item_Name = Item.Name;
							var Out = Item_Name.substring(Item_Name.lastIndexOf("_"));
							var OutPath = Out.replace("_", ".");
							var Final_Name = Item_Name.replace(Out, OutPath);
							var Add_Item = new String(Final_Name);
							var str = ohako + "";
							if(!str.match(Add_Item))
								{
								ohako.add(Add_Item);
								}
                           }
                         }
                    }
				}
     catch(e)
          {
					oError_hako_obj.add(oPoly(i));
					oError_hako_cls.add(Cls(j));
          }
               }
               Mat = oPoly(i).Material;
               var shad = Mat.Shaders;
               for ( k=0 ; k <shad.count ;  k++)
                    {
                    var cliplist = new Enumerator( shad(k).ImageClips );
                         for ( ; !cliplist.atEnd(); cliplist.moveNext() ) {
                                   var Item = cliplist.item();
                                   var Item_Name = Item.Name;
                                   var Out = Item_Name.substring(Item_Name.lastIndexOf("_"));
                                   var OutPath = Out.replace("_", ".");
                                   var Final_Name = Item_Name.replace(Out, OutPath);
                                   var Add_Item = new String(Final_Name);
                                   var str = ohako + "";
                                   if(!str.match(Add_Item))
                                        {
                                        ohako.add(Add_Item);
                                        }
                         }
                    }
          }
oProgressBar.Increment() ;

///////////////////////////////////////////////////////////////////////////////////
//フォルダイメージとシーンクリップのマッチ
var Match_Image = new ActiveXObject( "XSI.Collection" );

for( var Im=0 ; Im<oFile_hako.Count ; Im++ )
{
     for( var Fi = 0 ; Fi<ohako.Count ; Fi++ )
          {
          if ( oFile_hako(Im).match(ohako(Fi)))
               {
               Match_Image.add(oFile_hako(Im));
               }
          }
}
oProgressBar.Increment() ;
////////////////////////////////////////////////////////////////
//読み込み
var Add_Image = new ActiveXObject( "XSI.Collection" );
var Add2_Image = new ActiveXObject( "XSI.Collection" );
for( var Ad = 0 ; Ad<Match_Image.Count ; Ad++ )
     {
     var AddPic = oXSIAPP.AddImageSource("Pictures\\HighPictures\\" + Match_Image(Ad), null, null);
     Add_Image.Add(AddPic);
     Add2_Image.Add(Match_Image(Ad));
     }
    
     oProgressBar.Increment() ;
///////////////////////////////////////////////////////////////////
//ロック処理
for( var As = 0 ; As<Add_Image.Count ; As++ )
     {
     oXSIAPP.Lock(Add_Image(As), "siLockLevelConstruction");
     }
	var st = new String(Add2_Image);
	var Name = st.replace(/,/g, "\r\n");
	oProgressBar.Increment() ;
	oProgressBar.Visible = false ;
	oXSIAPP.SetValue("preferences.scripting.cmdlog", true, null);


/////////////////////////////////////////////////////////////////////////////
//最後処理
if(oFile_hako.Count > 0)
{
	if(oError_hako_cls.Count > 0)
	{
		for( var y = 0 ; y<oError_hako_cls.Count ; y++ )
		{
		oXSIAPP.Logmessage("エラー報告↓↓↓↓↓↓↓↓↓↓↓↓↓\n以下のデータで処理を飛ばしています。\nオブジェクト→→"+oError_hako_obj(y)+"\nクラスタ→→"+oError_hako_cls(y)+"\n確認お願い致します。");
		var Error = oXSIUIT.Msgbox( "以下の検索対象のモデルに対して不具合がある為\nクリップ化の処理をスキップしました。\nオブジェクト→→"+oError_hako_obj(y)+"\nクラスタ→→"+oError_hako_cls(y)+"\n詳しくはログにて。","48","Error");
		}
	}
	else
		{
//		var Finish = oXSIUIT.Msgbox( "HighPicturesのクリップ化処理が正常終了しました。\n詳しくはログにて。","48","Finish");
		}
oXSIAPP.Logmessage("このファイルたちがシーンに読み込まれました↓↓↓↓↓↓↓↓↓\r\n"+Name+"\r\n以上です");
}
else
{
var File_error = oXSIUIT.Msgbox( "HighPicturesフォルダ内にPSDファイルが存在しない為\nクリップ化処理を実行しませんでした。","48","File_error");
oXSIAPP.Logmessage("HighPicturesフォルダ内にPSDファイルが存在しない為、クリップ化処理を実行しませんでした。");
}

}
TexUp();
//////////////////////////////////////////////////////////////////
//終了