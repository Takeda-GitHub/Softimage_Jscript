var oPC = Dictionary.GetObject( "PlayControl" );
var Start = oPC.In.value;
var End = oPC.Out.value;
var Name = ActiveProject.ActiveScene;
var oFlame = XSIInputBox("セットしたいシーケンス数を入力して下さい。","Create_Sequence","3" ) ;
var oP = ActiveSceneRoot.AddProperty("CustomProperty",  false,  "Sequence_Set");

for ( var i=0; i<oFlame; i++ )
{
	oP.AddParameter2( "Name"+i, siString, Name );
	oP.AddParameter2( "GetStart"+i, siString, Start );
	oP.AddParameter2( "GetEnd"+i, siString, End );
	oP.AddParameter2( "GetText"+i, siBool, true );
	oP.AddParameter2( "FrameSet"+i, siBool, true );
}
///////////////////////////////////////////////////////////////////////////////////////////////
//PPG
var oL, oItem;
oL = oP.PPGLayout;
for ( var i=0; i<oFlame; i++ )
{
		oL.AddGroup( " Sequence_Set"+i, true, 350);
		oL.AddRow();
			oItem = oL.AddItem( "Name"+i, "Name" );
		oL.EndRow();
		oL.AddRow();
			oItem = oL.AddItem( "GetStart"+i, "Start" );
			oItem = oL.AddItem( "GetEnd"+i, "End" );
			oItem = oL.AddButton( "GetSet"+i, "Set" );
			oItem.SetAttribute( siUICX, 80 );
			oItem.SetAttribute( siUICY, 45 );
		oL.EndRow();
			oL.AddRow();
				oItem = oL.AddItem("FrameSet"+i, "FrameSet" );
				oItem = oL.AddItem("GetText"+i, "Text" );
			oL.EndRow();
		oL.EndGroup();
}

//////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////
//execute
var GetSet_For = "";
for ( var i=0; i<oFlame; i++ )
{
	GetSet_For += "function GetSet" + i + "_OnClicked()" +
    "{" +
	"var GetIn =PPG.GetStart" + i + ".value;"+
	"var GetOut =PPG.GetEnd" + i + ".value;" +
	"var Scene_Name =PPG.Name" + i + ".value;" +
	"var Text_Set  = PPG.GetText" + i + ".value;" +
	"var FrameSet  = PPG.FrameSet" + i + ".value;" +
	"var oRoot = Application.ActiveSceneRoot;"+
	"var Gin = GetValue('PlayControl.GlobalIn');"+
	"var Gend = GetValue('PlayControl.GlobalOut');"+
	"var Pin = GetValue('PlayControl.In');"+
	"var Pend = GetValue('PlayControl.Out');"+
	"if(FrameSet == true)"+
			"{"+
				"SetValue(['PlayControl.GlobalIn', 'PlayControl.In'], GetIn);"+
				"SetValue(['PlayControl.GlobalOut','PlayControl.Out'], GetOut);"+
			"}"+
		"if(Text_Set == true)"+
			"{"+
							" var oModel = oRoot.FindChildren('Sequence_Text_Model',siModelType); "+
							"if(oModel.Count == 0)"+
								"{"+
									"SICreateModel(oRoot,'Sequence_Text_Model');"+
								"}"+
							"var oTEXT_OBJ =oRoot.FindChildren( 'Sequence_Text"+i+"',siCrvListPrimType); "+
							"if(oTEXT_OBJ.Count == 0)"+
								"{"+
									"var Sequence_Text = 'Sequence_Text"+i+"';"+
									"SetValue('preferences.scripting.cmdlog', false, null);"+
									"SetValue('preferences.Interaction.autoinspect', false);"+
									"var oText = CreatePrim('Text', 'NurbsCurve', 'Sequence_Text"+i+"','Sequence_Text_Model');" +
									"var Time_Change =  Scene_Name +'\\n '+GetIn +' F------------ '+ GetOut+'F';"+
									"SetValue('preferences.Interaction.autoinspect', false);"+
									"SetValue(oText + '.crvlist.TextToCurveList.fitsize', 1);"+
									"SetValue(oText + '.text.singleline', 0);"+
									"SetValue(oText + '.text.text', '_RTF_{\\\\rtf1{{}}'+Time_Change+'}');"+                 
									"oTrans = oText.Kinematics.Local.Transform;"+
									"var POSX = oTrans.PosX = 10.0;"+
									"var POSY = oTrans.PosY ="+ i+" *-2;"+
									"var POSZ = oTrans.PosZ = 0.0;"+
									"oText.Kinematics.Local.Transform = oTrans;"+
									"SetValue([oText + '.kine.local.posxminactive',oText + '.kine.local.posyminactive',oText + '.kine.local.poszminactive',oText + '.kine.local.posxmaxactive',oText + '.kine.local.posymaxactive',oText + '.kine.local.poszmaxactive'], true, null);"+
									"SetValue([oText + '.kine.local.posxminlimit',oText + '.kine.local.posxmaxlimit'], POSX, null);"+
									"SetValue([oText + '.kine.local.posyminlimit',oText + '.kine.local.posymaxlimit'], POSY, null);"+
									"SetValue([oText + '.kine.local.poszminlimit',oText + '.kine.local.poszmaxlimit'], POSZ, null);"+                   
									"SetValue('preferences.Interaction.autoinspect', true, null);"+
									"SetValue('preferences.scripting.cmdlog', true, null);"+
									"DeselectAll();"+
								 "}"+
							"else"+
								"{"+
									"SetValue('preferences.scripting.cmdlog', false, null);"+
									"SetValue('preferences.Interaction.autoinspect', false);"+
									"DeleteObj('Sequence_Text_Model.Sequence_Text"+i+"');"+
									"var oText = 'Sequence_Text"+i+"';"+ 
									"var oText = CreatePrim('Text', 'NurbsCurve', 'Sequence_Text"+i+"','Sequence_Text_Model');" +
									"SetValue(oText + '.crvlist.TextToCurveList.fitsize', 1);"+
									"SetValue(oText + '.text.singleline', 0);"+
									"var Time_Change =  Scene_Name +'\\n '+GetIn +' F------------ '+ GetOut+'F';"+
									"SetValue(oText + '.text.text', '_RTF_{\\\\rtf1{{}}'+Time_Change+'}');"+
									"oTrans = oText.Kinematics.Local.Transform;"+
									"var POSX = oTrans.PosX = 10.0;"+
									"var POSY = oTrans.PosY ="+ i+" *-2;"+
									"var POSZ = oTrans.PosZ = 0.0;"+
									"oText.Kinematics.Local.Transform = oTrans;"+
									"SetValue([oText + '.kine.local.posxminactive',oText + '.kine.local.posyminactive',oText + '.kine.local.poszminactive',oText + '.kine.local.posxmaxactive',oText + '.kine.local.posymaxactive',oText + '.kine.local.poszmaxactive'], true, null);"+
									"SetValue([oText + '.kine.local.posxminlimit',oText + '.kine.local.posxmaxlimit'], POSX, null);"+
									"SetValue([oText + '.kine.local.posyminlimit',oText + '.kine.local.posymaxlimit'], POSY, null);"+
									"SetValue([oText + '.kine.local.poszminlimit',oText + '.kine.local.poszmaxlimit'], POSZ, null);"+                   
									"SetValue('preferences.Interaction.autoinspect', true, null);"+
									"SetValue('preferences.scripting.cmdlog', true, null);"+
									"DeselectAll();"+
								"}"+
			"}"+   
	"}";
}
oL.Language = "JScript";
oL.Logic = GetSet_For;
//////////////////////////////////////
InspectObj( oP, null, null, siLock );
