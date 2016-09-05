var oHako = XSIFactory.CreateObject( "XSI.Collection" );//箱作成
var oStart = GetValue("PlayControl.In");//フォワードフレームを取得
var oEnd = GetValue("PlayControl.Out");
var Fl = oEnd - oStart+1;//エンドフレームを取得
var oSel = Getvalue("SelectionList");// 選択を取得
     var rtn = GetKeyboardState();//押されている、キーのステータスを取得
     Key_st = rtn(1);//戻り値をで返す
     LogMessage( "押されているキーのステータス = " + Key_st);
if (oSel.Count > 0 )
     {
     var str = "";//空変数
     if ( 1 & Key_st )
          {
          str = "Shift "
          }
   
          if ( str == "" )
               {
                    LogMessage(  "シフト押されてないんで、普通に処理します。" );
                         for (var a=0; a<oSel.Count; a++)
                         {
                              var Getimplicit = GetPrim("Cone");//コントローラー作成
                              var SelName = oSel(a).name;//選択した物の名前を取得
                              Getimplicit.name = SelName+"_Global"
                              ////////////////////////////////////////////////////////////
                              //SRTチェック
                              KeyPos = oSel(a).kinematics.Local.posx.Source;//ポジションのアニメーションデータを取得
                              KeyRot = oSel(a).kinematics.Local.rotx.Source;//ロットのアニメーションデータを取得
                              KeyScl = oSel(a).kinematics.Local.sclx.Source;//スケールのアニメーションデータを取得
                                   if(KeyPos == "FCurve" && KeyRot == "FCurve" && KeyScl == "FCurve")//ポジションとロットとスケール
                                        {
                                        ApplyCns("Pose", Getimplicit, oSel(a));//全てなので、ポーズコンストレインを実行
                                        SetMarking("kine.local.pos");
                                        AddToMarking("kine.local.ori");
                                        AddToMarking("kine.local.scl");
                                        PlotAndApplyActions("", "plot", oStart, oEnd, null, 20, 3, null, null, null, null, true,
true);
                                        ClearMarking();
                                        Inbert();
                                        oHako.add(Getimplicit);
                                        }
                                   else if (KeyPos == "FCurve" && KeyRot == "FCurve")//ポジションとロット
                                        {
                                        ApplyCns("Position", Getimplicit, oSel(a));
                                        ApplyCns("Orientation", Getimplicit, oSel(a));
                                        SetMarking("kine.local.pos");
                                        AddToMarking("kine.local.ori");
                                        PlotAndApplyActions("", "plot", oStart, oEnd, null, 20, 3, null, null, null, null, true,
true);
                                        ClearMarking();
                                        Inbert();
                                        oHako.add(Getimplicit);
                                        }
                                   else if (KeyRot == "FCurve" && KeyScl == "FCurve")//ロットとスケール
                                        {
                                        ApplyCns("Scaling", Getimplicit, oSel(a));
                                        ApplyCns("Orientation", Getimplicit, oSel(a));
                                        SetMarking("kine.local.scl");
                                        AddToMarking("kine.local.ori");
                                        PlotAndApplyActions("", "plot", oStart, oEnd, null, 20, 3, null, null, null, null, true,
true);
                                        ClearMarking();
                                        Inbert();
                                        oHako.add(Getimplicit);
                                        }
                                   else if (KeyPos == "FCurve" && KeyScl == "FCurve")//ポジションとスケール
                                        {
                                        ApplyCns("Scaling", Getimplicit, oSel(a));
                                        ApplyCns("Position", Getimplicit, oSel(a));
                                        SetMarking("kine.local.pos");
                                        AddToMarking("kine.local.ori");
                                        PlotAndApplyActions("", "plot", oStart, oEnd, null, 20, 3, null, null, null, null, true,
true);
                                        ClearMarking();
                                        Inbert();
                                        oHako.add(Getimplicit);
                                        }
                                   else if (KeyPos == "FCurve")//ポジション
                                        {
                                        ApplyCns("Position", Getimplicit, oSel(a));
                                        SetMarking("kine.local.pos");
                                        PlotAndApplyActions("", "plot", oStart, oEnd, null, 20, 3, null, null, null, null, true,
true);
                                        ClearMarking();
                                        Inbert();
                                        oHako.add(Getimplicit);
                                        }
                                   else if (KeyRot == "FCurve")//ロット
                                        {
                                        ApplyCns("Orientation", Getimplicit, oSel(a));
                                        SetMarking("kine.local.ori");
                                        PlotAndApplyActions("", "plot", oStart, oEnd, null, 20, 3, null, null, null, null, true,
true);
                                        ClearMarking();
                                        Inbert();
                                        oHako.add(Getimplicit);
                                        }
                                   else if (KeyScl == "FCurve")//ロット
                                        {
                                        ApplyCns("Scaling", Getimplicit, oSel(a));
                                        SetMarking("kine.local.scl");
                                        PlotAndApplyActions("", "plot", oStart, oEnd, null, 20, 3, null, null, null, null, true,
true);
                                        ClearMarking();
                                        Inbert();
                                        oHako.add(Getimplicit);
                                        }
                                   else
                                        {
                                        var buttonPressed = XSIUIToolkit.Msgbox( "選択した物にアニメーションが割り当てられていません！", siMsgOkOnly | siMsgQuestion, "警告" );
                                        }
                                   ////////////////////////////////////////////////////////////
                              }
                    }
               else
                    {
                         LogMessage( str + "を押されてるから、移動、回転でグローバルコントローラー処理します" );
                         var Getimplicit = GetPrim("Cube");//コントローラー作成
                         var SelName = oSel(0).name;//選択した物の名前を取得
                         Getimplicit.name = SelName+"_Global_PO"
                              KeyPos_0 = oSel(0).kinematics.Local.posx.Source;
                              KeyRot_0 = oSel(0).kinematics.Local.rotx.Source;
                              KeyPos_1 = oSel(1).kinematics.Local.posx.Source;
                              KeyRot_1 = oSel(1).kinematics.Local.rotx.Source;
                                   if (KeyPos_0 == "FCurve" &&  KeyRot_1 == "FCurve")//ポジションとロット
                                        {
                                        ApplyCns("Position", Getimplicit, oSel(0));
                                        ApplyCns("Orientation", Getimplicit, oSel(1));
                                        SetMarking("kine.local.pos");
                                        AddToMarking("kine.local.ori");
                                        PlotAndApplyActions("", "plot", oStart, oEnd, null, 20, 3, null, null, null, null, true,
true);
                                        ClearMarking();
                                        Inbert();
                                        oHako.add(Getimplicit);
                                        }
                                   else if (KeyRot_0 == "FCurve" && KeyPos_1 == "FCurve")//ポジションとロット
                                        {
                                        ApplyCns("Position", Getimplicit, oSel(1));
                                        ApplyCns("Orientation", Getimplicit, oSel(0));
                                        SetMarking("kine.local.pos");
                                        AddToMarking("kine.local.ori");
                                        PlotAndApplyActions("", "plot", oStart, oEnd, null, 20, 3, null, null, null, null, true,
true);
                                        ClearMarking();
                                        Inbert();
                                        oHako.add(Getimplicit);
                                        }
                    }
     }
     else
     {
     var buttonPressed = XSIUIToolkit.Msgbox( "何も選ばれていませんよ", siMsgOkOnly | siMsgQuestion, "忠告" );
     }
    
SelectObj(oHako, null, true);

function Inbert()
{
   var oConstraints = Getimplicit.Kinematics.Constraints;//選択中の物のコンストレインとを取得
   Logmessage(oConstraints.Count);//コンストレインオペレータのカウント
   if (oConstraints.Count != 0 )//オペレータが「0」じゃない場合下記を実行
     {
     var oConst_Value_Saki = new Array();//空の配列を作成。後で使います。
          var oConst_Value_Moto = new Array();//空の配列を作成。後で使います。
       var oConst_Type = new Array();//空の配列を作成。後で使います。

          for (var i=0; i<oConstraints.Count; i++)//オペレーター数回す                   
          {
          var oConst_info = oConstraints(i).Name;//コンストの種類を取得
          Logmessage(oConst_info);//書き出し
          var oConstrained = oConstraints(i).Constrained;//コンスト元を取得
       oConst_Value_Moto.push(oConstrained);
          var oConstraining = oConstraints(i).Constraining;//コンスト先を取得
       oConst_Value_Saki.push(oConstraining);
          Logmessage(oConstrained+oConstraining);//両方を記述
               switch (oConst_info)
                  {//コンストの名前別によるスイッチ制御
                    case "Position Cns"://「ポジションコンスト」の場合下記を実行
                         var oConst_info_after = "Position";
                         Logmessage(oConst_info_after);
                         DeleteObj(oConstraints(i));//オペレータを削除
                         oConst_Type.push(oConst_info_after);
                    break;
                    case "Direction Cns"://「ディレクションコンスト」の場合下記を実行
                         var oConst_info_after = "Direction";
                         Logmessage(oConst_info_after);
                         DeleteObj(oConstraints(i));//オペレータを削除
                         oConst_Type.push(oConst_info_after);
                    break;
                    case "Orientation Cns"://「オリエンテーションコンスト」の場合下記を実行
                         var oConst_info_after = "Orientation";
                         Logmessage(oConst_info_after);
                         DeleteObj(oConstraints(i));//オペレータを削除
                         oConst_Type.push(oConst_info_after);
                    break;
                    case "Pose Cns"://「ポーズコンスト」の場合下記を実行
                         var oConst_info_after = "Pose";
                         Logmessage(oConst_info_after);
                         DeleteObj(oConstraints(i));//オペレータを削除
                         oConst_Type.push(oConst_info_after);
                    break;
                    }
        }
     for ( var i = 0; i < oConst_Type.length; ++i ) //配列にある数の分FORで回す
     {
     ApplyCns(oConst_Type[i],oConst_Value_Saki[i],oConst_Value_Moto[i],true);
     }   
  }
}