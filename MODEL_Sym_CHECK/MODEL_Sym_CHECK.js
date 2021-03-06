
var Miss_BOX = XSIFactory.CreateObject( "XSI.Collection" );//箱作成
if(Selection.Count > 0 )
{
SelectChildNodes();
oRoot = ActiveProject.ActiveScene.Root;
oSel = Getvalue("SelectionList");
var Go = XSIUIToolkit.Msgbox("「エラーが出た場合は、LEFT、RIGHTのスペルミスです。\n スクリプトログにどこがおかしいが出てるので、要確認して下さい」                   　     　↓スタート", siMsgOkOnly , "確認" );  
for (i=0;i<oSel.Count;i++)
     {
     Model = oSel(i).Model;//親モデル取得
     Logmessage(Model);
     
////////////////////////////////////////////////////////////////////////////////////
	 //参照元のポジション格納
     Global_POSX0 = oSel(i).kinematics.Global.posx.value;//グローバルの値取得
		Global_POSX1 = Global_POSX0*10000;　　　　　　　　　　//以下小数点４ケタで四捨五入
		Global_POSX2 = Math.round(Global_POSX1);
		Global_POSX = Global_POSX2/10000;

		
     Global_POSY0 = oSel(i).kinematics.Global.posy.value;//グローバルの値取得
		Global_POSY1 = Global_POSY0*10000;　　　　　　　　　　//以下小数点４ケタで四捨五入
		Global_POSY2 = Math.round(Global_POSY1);
		Global_POSY = Global_POSY2/10000;
		
     Global_POSZ0 = oSel(i).kinematics.Global.posz.value;//グローバルの値取得
	 	Global_POSZ1 = Global_POSZ0*10000;　　　　　　　　　　//以下小数点４ケタで四捨五入
		Global_POSZ2 = Math.round(Global_POSZ1);
		Global_POSZ = Global_POSZ2/10000;
////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
	 //参照元のローテーション格納
     Global_ROTX0 = oSel(i).kinematics.Global.rotx.value;//グローバルの値取得
		Global_ROTX1 = Global_ROTX0*10000;　　　　　　　　　　//以下小数点４ケタで四捨五入
		Global_ROTX2 = Math.round(Global_ROTX1);
		Global_ROTX = Global_ROTX2/10000;

		
     Global_ROTY0 = oSel(i).kinematics.Global.roty.value;//グローバルの値取得
		Global_ROTY1 = Global_ROTY0*10000;　　　　　　　　　　//以下小数点４ケタで四捨五入
		Global_ROTY2 = Math.round(Global_ROTY1);
		Global_ROTY = Global_ROTY2/10000;
		
     Global_ROTZ0 = oSel(i).kinematics.Global.rotz.value;//グローバルの値取得
	 	Global_ROTZ1 = Global_ROTZ0*10000;　　　　　　　　　　//以下小数点４ケタで四捨五入
		Global_ROTZ2 = Math.round(Global_ROTZ1);
		Global_ROTZ = Global_ROTZ2/10000;
////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
	 //参照元のスケール格納
     Global_SCLX0 = oSel(i).kinematics.Global.sclx.value;//グローバルの値取得
		Global_SCLX1 = Global_SCLX0*10000;　　　　　　　　　　//以下小数点４ケタで四捨五入
		Global_SCLX2 = Math.round(Global_SCLX1);
		Global_SCLX = Global_SCLX2/10000;

		
     Global_SCLY0 = oSel(i).kinematics.Global.scly.value;//グローバルの値取得
		Global_SCLY1 = Global_SCLY0*10000;　　　　　　　　　　//以下小数点４ケタで四捨五入
		Global_SCLY2 = Math.round(Global_SCLY1);
		Global_SCLY = Global_SCLY2/10000;
		
     Global_SCLZ0 = oSel(i).kinematics.Global.sclz.value;//グローバルの値取得
	 	Global_SCLZ1 = Global_SCLZ0*10000;　　　　　　　　　　//以下小数点４ケタで四捨五入
		Global_SCLZ2 = Math.round(Global_SCLZ1);
		Global_SCLZ = Global_SCLZ2/10000;
////////////////////////////////////////////////////////////////////////////////////
     
////////////////////////////////////////////////////////////////////////////////////
     Base_Sel_Name = oSel(i).name;//選択の名前
	if (Base_Sel_Name.match("Left"))//レフトでマッチ処理
            {
                  Change = Base_Sel_Name.replace( "Left", "Right" );//右左置き換え
                  LR = oRoot.FindChildren(Change);
				  Logmessage(LR.GetAsText());
                  TEST = Selectobj(LR);
                  LR_Sel = Selection(0);
////////////////////////////////////////////////////////////////////////////////////     
//ポジション
		  //Xポジション格納
		LR_Sel_Global_POSX0 = LR_Sel.kinematics.Global.posx.value;
			LR_Sel_Global_POSX1 = LR_Sel_Global_POSX0*10000
			LR_Sel_Global_POSX2 = Math.round(LR_Sel_Global_POSX1);
			LR_Sel_Global_POSX3 = LR_Sel_Global_POSX2/10000;
			LR_Sel_Global_POSX = LR_Sel_Global_POSX3*-1;
			
		  //Yポジション格納			
		LR_Sel_Global_POSY0 = LR_Sel.kinematics.Global.posy.value;
			LR_Sel_Global_POSY1 = LR_Sel_Global_POSY0*10000
			LR_Sel_Global_POSY2 = Math.round(LR_Sel_Global_POSY1);
			LR_Sel_Global_POSY = LR_Sel_Global_POSY2/10000;

		  //Zポジション格納
		LR_Sel_Global_POSZ0 = LR_Sel.kinematics.Global.posz.value;
			LR_Sel_Global_POSZ1 = LR_Sel_Global_POSZ0*10000
			LR_Sel_Global_POSZ2 = Math.round(LR_Sel_Global_POSZ1);
			LR_Sel_Global_POSZ = LR_Sel_Global_POSZ2/10000;
			
////////////////////////////////////////////////////////////////////////////////////
//ローテーション
		  //Xポジション格納
		LR_Sel_Global_ROTX0 = LR_Sel.kinematics.Global.rotx.value;
			LR_Sel_Global_ROTX1 = LR_Sel_Global_ROTX0*10000
			LR_Sel_Global_ROTX2 = Math.round(LR_Sel_Global_ROTX1);
			LR_Sel_Global_ROTX = LR_Sel_Global_ROTX2/10000;
			
		  //Yポジション格納			
		LR_Sel_Global_ROTY0 = LR_Sel.kinematics.Global.roty.value;
			LR_Sel_Global_ROTY1 = LR_Sel_Global_ROTY0*10000
			LR_Sel_Global_ROTY2 = Math.round(LR_Sel_Global_ROTY1);
			LR_Sel_Global_ROTY = LR_Sel_Global_ROTY2/10000;

		  //Zポジション格納
		LR_Sel_Global_ROTZ0 = LR_Sel.kinematics.Global.rotz.value;
			LR_Sel_Global_ROTZ1 = LR_Sel_Global_ROTZ0*10000
			LR_Sel_Global_ROTZ2 = Math.round(LR_Sel_Global_ROTZ1);
			LR_Sel_Global_ROTZ3 = LR_Sel_Global_ROTZ2/10000;
			LR_Sel_Global_ROTZ = LR_Sel_Global_ROTZ3*-1;
			
////////////////////////////////////////////////////////////////////////////////////
//スケール
		  //Xポジション格納
		LR_Sel_Global_SCLX0 = LR_Sel.kinematics.Global.sclx.value;
			LR_Sel_Global_SCLX1 = LR_Sel_Global_SCLX0*10000
			LR_Sel_Global_SCLX2 = Math.round(LR_Sel_Global_SCLX1);
			LR_Sel_Global_SCLX = LR_Sel_Global_SCLX2/10000;
			
		  //Yポジション格納			
		LR_Sel_Global_SCLY0 = LR_Sel.kinematics.Global.scly.value;
			LR_Sel_Global_SCLY1 = LR_Sel_Global_SCLY0*10000
			LR_Sel_Global_SCLY2 = Math.round(LR_Sel_Global_SCLY1);
			LR_Sel_Global_SCLY = LR_Sel_Global_SCLY2/10000;

		  //Zポジション格納
		LR_Sel_Global_SCLZ0 = LR_Sel.kinematics.Global.sclz.value;
			LR_Sel_Global_SCLZ1 = LR_Sel_Global_SCLZ0*10000
			LR_Sel_Global_SCLZ2 = Math.round(LR_Sel_Global_SCLZ1);
			LR_Sel_Global_SCLZ = LR_Sel_Global_SCLZ2/10000;
			
////////////////////////////////////////////////////////////////////////////////////
//ポジションX比較
          if (Global_POSX == LR_Sel_Global_POSX)
               {
               Logmessage(LR_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+LR_Sel+"\n    ↑こいつらが対象じゃないです！(ポジションXにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//ポジションy比較
          if (Global_POSY == LR_Sel_Global_POSY)
               {
               Logmessage(LR_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+LR_Sel+"\n    ↑こいつらが対象じゃないです！(ポジションYにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//ポジションz比較
          if (Global_POSZ == LR_Sel_Global_POSZ)
               {
               Logmessage(LR_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+LR_Sel+"\n    ↑こいつらが対象じゃないです！(ポジションZにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//ローテx比較
          if (Global_ROTX == LR_Sel_Global_ROTX)
               {
               Logmessage(LR_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+LR_Sel+"\n    ↑こいつらが対象じゃないです！(ローテーションXにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//ローテy比較
          if (Global_ROTY == LR_Sel_Global_ROTY)
               {
               Logmessage(LR_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+LR_Sel+"\n    ↑こいつらが対象じゃないです！(ローテーションYにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//ローテx比較
          if (Global_ROTZ == LR_Sel_Global_ROTZ)
               {
               Logmessage(LR_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+LR_Sel+"\n    ↑こいつらが対象じゃないです！(ローテーションZにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//スケールx比較
          if (Global_SCLX == LR_Sel_Global_SCLX)
               {
               Logmessage(LR_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+LR_Sel+"\n    ↑こいつらが対象じゃないです！(スケールXにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//スケールy比較
          if (Global_SCLY == LR_Sel_Global_SCLY)
               {
               Logmessage(LR_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+LR_Sel+"\n    ↑こいつらが対象じゃないです！(スケールYにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//スケールz比較
          if (Global_SCLZ == LR_Sel_Global_SCLZ)
               {
               Logmessage(LR_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+LR_Sel+"\n    ↑こいつらが対象じゃないです！(スケールZにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////			   
          L_Sel = Selectobj(oSel(i));//後処理
          L_Sel_2 = Selection(0);
		  DeselectAll();
          }
		  
////////////////////////////////////////////////////////////////////////////////////
     else if(Base_Sel_Name.match("Right"))
          {
          Change = Base_Sel_Name.replace( "Right", "Left" );//右左置き換え
          RL = oRoot.FindChildren(Change);
		  Logmessage(RL.GetAsText());
		  Logmessage(oSel(i));
          TEST = Selectobj(RL);
          RL_Sel = Selection(0);
////////////////////////////////////////////////////////////////////////////////////     
//ポジション
		  //Xポジション格納
		RL_Sel_Global_POSX0 = RL_Sel.kinematics.Global.posx.value;
			RL_Sel_Global_POSX1 = RL_Sel_Global_POSX0*10000
			RL_Sel_Global_POSX2 = Math.round(RL_Sel_Global_POSX1);
			RL_Sel_Global_POSX3 = RL_Sel_Global_POSX2/10000;
			RL_Sel_Global_POSX = RL_Sel_Global_POSX3*-1;
			
		  //Yポジション格納			
		RL_Sel_Global_POSY0 = RL_Sel.kinematics.Global.posy.value;
			RL_Sel_Global_POSY1 = RL_Sel_Global_POSY0*10000
			RL_Sel_Global_POSY2 = Math.round(RL_Sel_Global_POSY1);
			RL_Sel_Global_POSY = RL_Sel_Global_POSY2/10000;

		  //Zポジション格納
		RL_Sel_Global_POSZ0 = RL_Sel.kinematics.Global.posz.value;
			RL_Sel_Global_POSZ1 = RL_Sel_Global_POSZ0*10000
			RL_Sel_Global_POSZ2 = Math.round(RL_Sel_Global_POSZ1);
			RL_Sel_Global_POSZ = RL_Sel_Global_POSZ2/10000;
			
////////////////////////////////////////////////////////////////////////////////////
//ローテーション
		  //Xポジション格納
		RL_Sel_Global_ROTX0 = RL_Sel.kinematics.Global.rotx.value;
			RL_Sel_Global_ROTX1 = RL_Sel_Global_ROTX0*10000
			RL_Sel_Global_ROTX2 = Math.round(RL_Sel_Global_ROTX1);
			RL_Sel_Global_ROTX = RL_Sel_Global_ROTX2/10000;
			
		  //Yポジション格納			
		RL_Sel_Global_ROTY0 = RL_Sel.kinematics.Global.roty.value;
			RL_Sel_Global_ROTY1 = RL_Sel_Global_ROTY0*10000
			RL_Sel_Global_ROTY2 = Math.round(RL_Sel_Global_ROTY1);
			RL_Sel_Global_ROTY = RL_Sel_Global_ROTY2/10000;

		  //Zポジション格納
		RL_Sel_Global_ROTZ0 = RL_Sel.kinematics.Global.rotz.value;
			RL_Sel_Global_ROTZ1 = RL_Sel_Global_ROTZ0*10000
			RL_Sel_Global_ROTZ2 = Math.round(RL_Sel_Global_ROTZ1);
			RL_Sel_Global_ROTZ3 = RL_Sel_Global_ROTZ2/10000;
			RL_Sel_Global_ROTZ = RL_Sel_Global_ROTZ3*-1;
			
////////////////////////////////////////////////////////////////////////////////////
//スケール
		  //Xポジション格納
		RL_Sel_Global_SCLX0 = RL_Sel.kinematics.Global.sclx.value;
			RL_Sel_Global_SCLX1 = RL_Sel_Global_SCLX0*10000
			RL_Sel_Global_SCLX2 = Math.round(RL_Sel_Global_SCLX1);
			RL_Sel_Global_SCLX = RL_Sel_Global_SCLX2/10000;
			
		  //Yポジション格納			
		RL_Sel_Global_SCLY0 = RL_Sel.kinematics.Global.scly.value;
			RL_Sel_Global_SCLY1 = RL_Sel_Global_SCLY0*10000
			RL_Sel_Global_SCLY2 = Math.round(RL_Sel_Global_SCLY1);
			RL_Sel_Global_SCLY = RL_Sel_Global_SCLY2/10000;

		  //Zポジション格納
		RL_Sel_Global_SCLZ0 = RL_Sel.kinematics.Global.sclz.value;
			RL_Sel_Global_SCLZ1 = RL_Sel_Global_SCLZ0*10000
			RL_Sel_Global_SCLZ2 = Math.round(RL_Sel_Global_SCLZ1);
			RL_Sel_Global_SCLZ = RL_Sel_Global_SCLZ2/10000;
			
////////////////////////////////////////////////////////////////////////////////////
//ポジションX比較
          if (Global_POSX == RL_Sel_Global_POSX)
               {
               Logmessage(RL_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+RL_Sel+"\n    ↑こいつらが対象じゃないです！(ポジションXにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }			   
			   
////////////////////////////////////////////////////////////////////////////////////
//ポジションy比較
          if (Global_POSY == RL_Sel_Global_POSY)
               {
               Logmessage(RL_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+RL_Sel+"\n    ↑こいつらが対象じゃないです！(ポジションYにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//ポジションz比較
          if (Global_POSZ == RL_Sel_Global_POSZ)
               {
               Logmessage(RL_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+RL_Sel+"\n    ↑こいつらが対象じゃないです！(ポジションZにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   	   
////////////////////////////////////////////////////////////////////////////////////
//ローテx比較
          if (Global_ROTX == RL_Sel_Global_ROTX)
               {
               Logmessage(RL_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+RL_Sel+"\n    ↑こいつらが対象じゃないです！(ローテーションXにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   			   
////////////////////////////////////////////////////////////////////////////////////
//ローテy比較
          if (Global_ROTY == RL_Sel_Global_ROTY)
               {
               Logmessage(RL_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+RL_Sel+"\n    ↑こいつらが対象じゃないです！(ローテーションYにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   		   
////////////////////////////////////////////////////////////////////////////////////
//ローテx比較
          if (Global_ROTZ == RL_Sel_Global_ROTZ)
               {
               Logmessage(RL_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+RL_Sel+"\n    ↑こいつらが対象じゃないです！(ローテーションZにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   	   
////////////////////////////////////////////////////////////////////////////////////
//スケールx比較
          if (Global_SCLX == RL_Sel_Global_SCLX)
               {
               Logmessage(RL_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+RL_Sel+"\n    ↑こいつらが対象じゃないです！(スケールXにミス！)↑", siMsgOkOnly , "注意!" );   
                Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//スケールy比較
          if (Global_SCLY == RL_Sel_Global_SCLY)
               {
               Logmessage(RL_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+RL_Sel+"\n    ↑こいつらが対象じゃないです！(スケールYにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//スケールz比較
          if (Global_SCLZ == RL_Sel_Global_SCLZ)
               {
               Logmessage(RL_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+RL_Sel+"\n    ↑こいつらが対象じゃないです！(スケールZにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////			   
          R_Sel = Selectobj(oSel(i));//後処理
          R_Sel_2 = Selection(0);
		  DeselectAll();
          }
		  
////////////////////////////////////////////////////////////////////////////////////
     else if(Base_Sel_Name.match("VER"))
          {
            if(Base_Sel_Name.match("002"))
               {
                    machi(002,003);
                    Logmessage(Ch);
                    VER_LR = Model+"."+Ch;
                    Logmessage(VER_LR);
                    TEST = Selectobj(VER_LR);
                    VER_LR_Sel = Selection(0);

/////////////////////////////////////////////////////////////////////////////////////
//ポジション
		  //Xポジション格納
		VER_LR_Sel_Global_POSX0 = VER_LR_Sel.kinematics.Global.posx.value;
			VER_LR_Sel_Global_POSX1 = VER_LR_Sel_Global_POSX0*10000
			VER_LR_Sel_Global_POSX2 = Math.round(VER_LR_Sel_Global_POSX1);
			VER_LR_Sel_Global_POSX3 = VER_LR_Sel_Global_POSX2/10000;
			VER_LR_Sel_Global_POSX = VER_LR_Sel_Global_POSX3*-1;
			
		  //Yポジション格納			
		VER_LR_Sel_Global_POSY0 = VER_LR_Sel.kinematics.Global.posy.value;
			VER_LR_Sel_Global_POSY1 = VER_LR_Sel_Global_POSY0*10000
			VER_LR_Sel_Global_POSY2 = Math.round(VER_LR_Sel_Global_POSY1);
			VER_LR_Sel_Global_POSY = VER_LR_Sel_Global_POSY2/10000;

		  //Zポジション格納
		VER_LR_Sel_Global_POSZ0 = VER_LR_Sel.kinematics.Global.posz.value;
			VER_LR_Sel_Global_POSZ1 = VER_LR_Sel_Global_POSZ0*10000
			VER_LR_Sel_Global_POSZ2 = Math.round(VER_LR_Sel_Global_POSZ1);
			VER_LR_Sel_Global_POSZ = VER_LR_Sel_Global_POSZ2/10000;
			
////////////////////////////////////////////////////////////////////////////////////
//ローテーション
		  //Xポジション格納
		VER_LR_Sel_Global_ROTX0 = VER_LR_Sel.kinematics.Global.rotx.value;
			VER_LR_Sel_Global_ROTX1 = VER_LR_Sel_Global_ROTX0*10000
			VER_LR_Sel_Global_ROTX2 = Math.round(VER_LR_Sel_Global_ROTX1);
			VER_LR_Sel_Global_ROTX = VER_LR_Sel_Global_ROTX2/10000;
			
		  //Yポジション格納			
		VER_LR_Sel_Global_ROTY0 = VER_LR_Sel.kinematics.Global.roty.value;
			VER_LR_Sel_Global_ROTY1 = VER_LR_Sel_Global_ROTY0*10000
			VER_LR_Sel_Global_ROTY2 = Math.round(VER_LR_Sel_Global_ROTY1);
			VER_LR_Sel_Global_ROTY = VER_LR_Sel_Global_ROTY2/10000;

		  //Zポジション格納
		VER_LR_Sel_Global_ROTZ0 = VER_LR_Sel.kinematics.Global.rotz.value;
			VER_LR_Sel_Global_ROTZ1 = VER_LR_Sel_Global_ROTZ0*10000
			VER_LR_Sel_Global_ROTZ2 = Math.round(VER_LR_Sel_Global_ROTZ1);
			VER_LR_Sel_Global_ROTZ3 = VER_LR_Sel_Global_ROTZ2/10000;
			VER_LR_Sel_Global_ROTZ = VER_LR_Sel_Global_ROTZ3*-1;
			
////////////////////////////////////////////////////////////////////////////////////
//スケール
		  //Xポジション格納
		VER_LR_Sel_Global_SCLX0 = VER_LR_Sel.kinematics.Global.sclx.value;
			VER_LR_Sel_Global_SCLX1 = VER_LR_Sel_Global_SCLX0*10000
			VER_LR_Sel_Global_SCLX2 = Math.round(VER_LR_Sel_Global_SCLX1);
			VER_LR_Sel_Global_SCLX = VER_LR_Sel_Global_SCLX2/10000;
			
		  //Yポジション格納			
		VER_LR_Sel_Global_SCLY0 = VER_LR_Sel.kinematics.Global.scly.value;
			VER_LR_Sel_Global_SCLY1 = VER_LR_Sel_Global_SCLY0*10000
			VER_LR_Sel_Global_SCLY2 = Math.round(VER_LR_Sel_Global_SCLY1);
			VER_LR_Sel_Global_SCLY = VER_LR_Sel_Global_SCLY2/10000;

		  //Zポジション格納
		VER_LR_Sel_Global_SCLZ0 = VER_LR_Sel.kinematics.Global.sclz.value;
			VER_LR_Sel_Global_SCLZ1 = VER_LR_Sel_Global_SCLZ0*10000
			VER_LR_Sel_Global_SCLZ2 = Math.round(VER_LR_Sel_Global_SCLZ1);
			VER_LR_Sel_Global_SCLZ = VER_LR_Sel_Global_SCLZ2/10000;
			
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//ポジションX比較
          if (Global_POSX == VER_LR_Sel_Global_POSX)
               {
               Logmessage(VER_LR_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+VER_LR_Sel+"\n    ↑こいつらが対象じゃないです！(ポジションXにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//ポジションy比較
          if (Global_POSY == VER_LR_Sel_Global_POSY)
               {
               Logmessage(VER_LR_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+VER_LR_Sel+"\n    ↑こいつらが対象じゃないです！(ポジションYにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//ポジションz比較
          if (Global_POSZ == VER_LR_Sel_Global_POSZ)
               {
               Logmessage(VER_LR_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+VER_LR_Sel+"\n    ↑こいつらが対象じゃないです！(ポジションZにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//ローテx比較
          if (Global_ROTX == VER_LR_Sel_Global_ROTX)
               {
               Logmessage(VER_LR_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+VER_LR_Sel+"\n    ↑こいつらが対象じゃないです！(ローテーションXにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//ローテy比較
          if (Global_ROTY == VER_LR_Sel_Global_ROTY)
               {
               Logmessage(VER_LR_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+VER_LR_Sel+"\n    ↑こいつらが対象じゃないです！(ローテーションYにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			    
////////////////////////////////////////////////////////////////////////////////////
//ローテx比較
          if (Global_ROTZ == VER_LR_Sel_Global_ROTZ)
               {
               Logmessage(VER_LR_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+VER_LR_Sel+"\n    ↑こいつらが対象じゃないです！(ローテーションZにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//スケールx比較
          if (Global_SCLX == VER_LR_Sel_Global_SCLX)
               {
               Logmessage(VER_LR_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+VER_LR_Sel+"\n    ↑こいつらが対象じゃないです！(スケールXにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//スケールy比較
          if (Global_SCLY == VER_LR_Sel_Global_SCLY)
               {
               Logmessage(VER_LR_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+VER_LR_Sel+"\n    ↑こいつらが対象じゃないです！(スケールYにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//スケールz比較
          if (Global_SCLZ == VER_LR_Sel_Global_SCLZ)
               {
               Logmessage(VER_LR_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+VER_LR_Sel+"\n    ↑こいつらが対象じゃないです！(スケールZにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
/////////////////////////////////////////////////////////////////////////////////////

                    VER_L_Sel = Selectobj(oSel(i));
                    VER_L_Sel_2 = Selection(0);
					DeselectAll();
                  }  
/////////////////////////////////////////////////////////////////////////////////////
          }
          else if(Base_Sel_Name.match("003"))
               {
                    machi(003,002);
                    Logmessage(Ch);
					VER_RL = oRoot.FindChildren(Change);
					Logmessage(VER_RL.GetAsText());
                    TEST = Selectobj(VER_RL);
                    VER_RL_Sel = Selection(0);
/////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////     
//ポジション
		  //Xポジション格納
		VER_RL_Sel_Global_POSX0 = VER_RL_Sel.kinematics.Global.posx.value;
			VER_RL_Sel_Global_POSX1 = VER_RL_Sel_Global_POSX0*10000
			VER_RL_Sel_Global_POSX2 = Math.round(VER_RL_Sel_Global_POSX1);
			VER_RL_Sel_Global_POSX3 = VER_RL_Sel_Global_POSX2/10000;
			VER_RL_Sel_Global_POSX = VER_RL_Sel_Global_POSX3*-1;
			
		  //Yポジション格納			
		VER_RL_Sel_Global_POSY0 = VER_RL_Sel.kinematics.Global.posy.value;
			VER_RL_Sel_Global_POSY1 = VER_RL_Sel_Global_POSY0*10000
			VER_RL_Sel_Global_POSY2 = Math.round(VER_RL_Sel_Global_POSY1);
			VER_RL_Sel_Global_POSY = VER_RL_Sel_Global_POSY2/10000;

		  //Zポジション格納
		VER_RL_Sel_Global_POSZ0 = VER_RL_Sel.kinematics.Global.posz.value;
			VER_RL_Sel_Global_POSZ1 = VER_RL_Sel_Global_POSZ0*10000
			VER_RL_Sel_Global_POSZ2 = Math.round(VER_RL_Sel_Global_POSZ1);
			VER_RL_Sel_Global_POSZ = VER_RL_Sel_Global_POSZ2/10000;
			
////////////////////////////////////////////////////////////////////////////////////
//ローテーション
		  //Xポジション格納
		VER_RL_Sel_Global_ROTX0 = VER_RL_Sel.kinematics.Global.rotx.value;
			VER_RL_Sel_Global_ROTX1 = VER_RL_Sel_Global_ROTX0*10000
			VER_RL_Sel_Global_ROTX2 = Math.round(VER_RL_Sel_Global_ROTX1);
			VER_RL_Sel_Global_ROTX = VER_RL_Sel_Global_ROTX2/10000;
			
		  //Yポジション格納			
		VER_RL_Sel_Global_ROTY0 = VER_RL_Sel.kinematics.Global.roty.value;
			VER_RL_Sel_Global_ROTY1 = VER_RL_Sel_Global_ROTY0*10000
			VER_RL_Sel_Global_ROTY2 = Math.round(VER_RL_Sel_Global_ROTY1);
			VER_RL_Sel_Global_ROTY = VER_RL_Sel_Global_ROTY2/10000;

		  //Zポジション格納
		VER_RL_Sel_Global_ROTZ0 = VER_RL_Sel.kinematics.Global.rotz.value;
			VER_RL_Sel_Global_ROTZ1 = VER_RL_Sel_Global_ROTZ0*10000
			VER_RL_Sel_Global_ROTZ2 = Math.round(VER_RL_Sel_Global_ROTZ1);
			VER_RL_Sel_Global_ROTZ3 = VER_RL_Sel_Global_ROTZ2/10000;
			VER_RL_Sel_Global_ROTZ = VER_RL_Sel_Global_ROTZ3*-1;
			
////////////////////////////////////////////////////////////////////////////////////
//スケール
		  //Xポジション格納
		VER_RL_Sel_Global_SCLX0 = VER_RL_Sel.kinematics.Global.sclx.value;
			VER_RL_Sel_Global_SCLX1 = VER_RL_Sel_Global_SCLX0*10000
			VER_RL_Sel_Global_SCLX2 = Math.round(VER_RL_Sel_Global_SCLX1);
			VER_RL_Sel_Global_SCLX = VER_RL_Sel_Global_SCLX2/10000;
			
		  //Yポジション格納			
		VER_RL_Sel_Global_SCLY0 = VER_RL_Sel.kinematics.Global.scly.value;
			VER_RL_Sel_Global_SCLY1 = VER_RL_Sel_Global_SCLY0*10000
			VER_RL_Sel_Global_SCLY2 = Math.round(VER_RL_Sel_Global_SCLY1);
			VER_RL_Sel_Global_SCLY = VER_RL_Sel_Global_SCLY2/10000;

		  //Zポジション格納
		VER_RL_Sel_Global_SCLZ0 = VER_RL_Sel.kinematics.Global.sclz.value;
			VER_RL_Sel_Global_SCLZ1 = VER_RL_Sel_Global_SCLZ0*10000
			VER_RL_Sel_Global_SCLZ2 = Math.round(VER_RL_Sel_Global_SCLZ1);
			VER_RL_Sel_Global_SCLZ = VER_RL_Sel_Global_SCLZ2/10000;
			
////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////
//ポジションX比較
          if (Global_POSX == VER_RL_Sel_Global_POSX)
               {
               Logmessage(VER_RL_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+VER_RL_Sel+"\n    ↑こいつらが対象じゃないです！(ポジションXにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//ポジションy比較
          if (Global_POSY == VER_RL_Sel_Global_POSY)
               {
               Logmessage(VER_RL_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+VER_RL_Sel+"\n    ↑こいつらが対象じゃないです！(ポジションYにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//ポジションz比較
          if (Global_POSZ == VER_RL_Sel_Global_POSZ)
               {
               Logmessage(VER_RL_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+VER_RL_Sel+"\n    ↑こいつらが対象じゃないです！(ポジションZにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   	   
////////////////////////////////////////////////////////////////////////////////////
//ローテx比較
          if (Global_ROTX == VER_RL_Sel_Global_ROTX)
               {
               Logmessage(VER_RL_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+VER_RL_Sel+"\n    ↑こいつらが対象じゃないです！(ローテーションXにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			     
////////////////////////////////////////////////////////////////////////////////////
//ローテy比較
          if (Global_ROTY == VER_RL_Sel_Global_ROTY)
               {
               Logmessage(VER_RL_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+VER_RL_Sel+"\n    ↑こいつらが対象じゃないです！(ローテーションYにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   			   
////////////////////////////////////////////////////////////////////////////////////
//ローテx比較
          if (Global_ROTZ == VER_RL_Sel_Global_ROTZ)
               {
               Logmessage(VER_RL_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+VER_RL_Sel+"\n    ↑こいつらが対象じゃないです！(ローテーションZにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   		   
////////////////////////////////////////////////////////////////////////////////////
//スケールx比較
          if (Global_SCLX == VER_RL_Sel_Global_SCLX)
               {
               Logmessage(VER_RL_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+VER_RL_Sel+"\n    ↑こいつらが対象じゃないです！(スケールXにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//スケールy比較
          if (Global_SCLY == VER_RL_Sel_Global_SCLY)
               {
               Logmessage(VER_RL_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+VER_RL_Sel+"\n    ↑こいつらが対象じゃないです！(スケールYにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
////////////////////////////////////////////////////////////////////////////////////
//スケールz比較
          if (Global_SCLZ == VER_RL_Sel_Global_SCLZ)
               {
               Logmessage(VER_RL_Sel+"はOK");
               }
          else
               {
               var buttonPressed = XSIUIToolkit.Msgbox(oSel(i)+"←--→"+VER_RL_Sel+"\n    ↑こいつらが対象じゃないです！(スケールZにミス！)↑", siMsgOkOnly , "注意!" );   
               Miss_BOX.add(oSel(i));
			   }
			   
/////////////////////////////////////////////////////////////////////////////////////

                    VER_R_Sel = Selectobj(oSel(i));
                    VER_R_Sel_2 = Selection(0);
					DeselectAll();
                   } 
/////////////////////////////////////////////////////////////////////////////////////

          }
Logmessage("終了" );
var TO = XSIUIToolkit.Msgbox(  Miss_BOX+"\n ↑ 処理完了　ミスがあったやつは修正して下さい！", siMsgOkOnly , "確認" );  
SelectObj(Miss_BOX);
}
else
{
var M = XSIUIToolkit.Msgbox("エラー！！！\n\nなにか選んでください。");  
}


function machi(L,R)
{
   Ch = Base_Sel_Name.replace( L, R );//右左置き換え
    return Ch
}

