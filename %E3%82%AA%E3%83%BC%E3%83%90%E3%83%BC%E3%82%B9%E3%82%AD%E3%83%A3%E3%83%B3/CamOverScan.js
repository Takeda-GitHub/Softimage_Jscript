//カメラ表示からオーバースキャンするスクリプトです。
//レンダリングカメラをレンダーマネージャーのパスカメラで設置して、実行してください
//また、このスクリプトは画角の値を変更するため、元から画角にアニメーションが入ってるいる場合は
//アニメーションレイヤーにて、変更された値をキーイングしてください。

var oPasses = ActiveProject.ActiveScene.Passes;
var ohako = XSIFactory.CreateObject( "XSI.Collection" );
var ohako2 = XSIFactory.CreateObject( "XSI.Collection" );//
var oProp = ActiveSceneRoot.AddProperty('CustomProperty',false,"OverScan" );
var oLayout = oProp.PPGLayout;

var SizeUP = Windows();//ファンクションを実行

Logmessage(oProp);
for(a=0; a<oProp.pPassCount.value; a++)
          {
               if(oProp.Parameters(a).value == 1)
               {
                    ohako.add(oProp.Parameters(a));
               }
          }
Logmessage(ohako);

for ( i=0 ; i<ohako.Count ; i++)
{
     var oCam = Getvalue( "Passes." +ohako(i).name + ".RenderOptions.PassCamera" );//パスのカメラを取得
     var FovType = Getvalue( oCam + ".camera.fovtype" ); //0なら垂直, 1やったら水平画角
     var fov = Getvalue( oCam + ".camera.fov" );//パスカメラの画角を取得
     var aspect = GetValue( "Passes." + ohako(i).name + ".RenderOptions.PictureRatio" );//アスペクト比を取得
     var pixratio = GetValue( "Passes." + ohako(i).name + ".RenderOptions.PixelRatio" );//ピクセル比
     var Xsize = Getvalue( "Passes." + ohako(i).name + ".RenderOptions.CameraXres" ); //横サイズ
     var Ysize = Getvalue( "Passes." + ohako(i).name + ".RenderOptions.CameraYres" );//縦サイズ
     var OverR = SetValue( "Passes." + ohako(i).name + ".ImageFormatOverride", true);
     var custom = SetValue( "Passes." + ohako(i).name+ ".ImageFormatPreset", 0);

     //視野が垂直なら以下の設定を実行
     if ( FovType == 0 )
     {
     fov *= aspect;//画角とアスペクト比掛算して、水平画角に変更する
     }
     fov /= 2;//画角を半分にして横サイズを半分にする。
     Xsize /=2;

     var D = Xsize / Math.tan(fov * Math.PI/180);//Xサイズから計算

     var newFov = Math.atan((Xsize + SizeUP)/D) * 180/Math.PI * 2;//アークタンジェントでの計算

     if ( FovType == 0 ) {
     newFov /= aspect;//最後に垂直タイプだった場合、最終的な画角をアスペクト比で割って正しい値に変更いたします。
     }


     var Cam_Fov_Set = Setvalue( oCam + ".camera.fov", newFov );//カメラに画角の値を代入

     var Xsize_Set = setvalue( "Passes." + ohako(i).name + ".RenderOptions.CameraXres", (Xsize + SizeUP)*2 );//Xサイズを代入された値をプラスし、
                                //さらにそれを二倍する

     var Ysize_Set = setvalue( "Passes." + ohako(i).name + ".RenderOptions.CameraYres", (Xsize + SizeUP)*2 / aspect *
                         pixratio );//Yサイズに関しても同様に算出し、アスペクト比とピクチャーレシオを掛けた値を最後に割ると完成

     logmessage( "新しい画角はコチラ！ = " + newFov + "度です" ); //確認
     logmessage( "新しい幅のサイズはコチラ！ = " + Xsize_Set + "ピクセルです" ); //確認
     logmessage( "新しい高さのサイズはコチラ！ = " + Ysize_Set + "ピクセルです" ); //確認
     logmessage( "画角はコンマ100/1で四捨五入し、サイズは小数点以下は切り上げます" ); //確認
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

function Windows() {
for (i=0; i<oPasses.Count; i++)
     {
          oProp.AddParameter2 ( oPasses(i).name, siBool, true);
     }
for (i=0; i<oPasses.Count; i++)
     {
          oProp.AddParameter2 ( "test" + i, siBool, true);
     }
     var SizeUP_P = oProp.AddParameter2( "SizeUP" , siUInt4, 100, 0, 1000,null,
                         null, siClassifUnknown, 0, "SizeUP", "Xサイズの増減をベースに画角等を決めています" );//ウィンドウを作成0-1000で解像度の変更を可能にしています。
     var SizeUP_String = oProp.AddParameter2( "↑値２倍分のピクセルが出力解像度に代入されます" , siBool,true)
     //説明分を追記しています。チェックボックスはダミーですｗ
   
////////////////////////////////////////////////////////////////////////////////////////////////////////

oLayout.AddGroup("オーバースキャン範囲");
          oLayout.AddRow();
               oLayout.AddGroup("↓ここに値を入れるとその値2剰分のピクセル、が出力解像度に代入されますOKですか？");
                         var oItem = oLayout.AddItem('SizeUP','SizeUP');
               oLayout.EndGroup();
            oLayout.EndRow();
oLayout.EndGroup();


/////////////////////////////////////////////////////////////////////////////////////////////////////////

oLayout.AddGroup("パスの選択");
          oLayout.AddRow();
               var oItem = oLayout.AddButton('AllOn','All on');
                   oItem.SetAttribute(siUICX,140);
                   oItem.SetAttribute(siUICY,30);
               var oItem = oLayout.AddButton('AllOff','All off');
                   oItem.SetAttribute(siUICX,140);
                   oItem.SetAttribute(siUICY,30);
          oLayout.EndRow();
                  var column = Math.round(oPasses.count /2);
          oLayout.AddRow();
               oLayout.AddGroup("");
                    for (j=0; j<column; j++)
                    {
                         var oItem = oLayout.AddItem(oPasses(j).name);
                    }
               oLayout.EndGroup();
               oLayout.AddGroup("");
                    for (j=column; j<oPasses.count; j++)
                    {
                         var oItem = oLayout.AddItem(oPasses(j).name);
                    }
               oLayout.EndGroup();
          oLayout.EndRow();
oLayout.EndGroup();

///////////////////////////////////////////////////////////////////////////////////////////////////

oProp.AddParameter3('pPassCount',siInt4,oPasses.count);

oLayout.Logic =     AllOn_OnClicked.toString()+
                    AllOff_OnClicked.toString();
oLayout.Language = 'JScript' ;

///////////////////////////////////////////////////////////////////////////////////////////////////

function AllOn_OnClicked()
     {
          var oProp = PPG.Inspected.Item(0);
          for (h=0; h<PPG.pPassCount.value; h++)
          {
               oProp.Parameters(h).value = 1;
          }
     }
   
///////////////////////////////////////////////////////////////////////////////////////////////////
//ALLOFFが押されたときの挙動設定
function AllOff_OnClicked()
     {
          var oProp = PPG.Inspected.Item(0);
          for (h=0; h<PPG.pPassCount.value; h++)
          {
               oProp.Parameters(h).value = 0;
          }
     }


InspectObj( oProp,"","OverScan" ,siModal ); //PPGを表示

return SizeUP_P.value;//返り値を取得しています。
deleteobj( oProp );
}
///////////////////////////////////////////////////////////////////////////////////////////////////
