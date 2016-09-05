var oSel = GetValue("SelectionList");
var oSelCount = oSel.count;
var oP = XSIFactory.CreateObject( "CustomProperty" );
oP.name = "RE:RE:REName";
oP.AddParameter2( "Target", siString,  "R1");
oP.AddParameter2( "ReName", siString,  "L");
var oL, oItem;
oL = oP.PPGLayout;
     oL.AddGroup( "ReNameing_Set", true);
		oL.AddRow();
					oL.AddGroup( "selection_Item_Name", true);
						oItem = oL.AddItem( "Target", "Target" );
					oL.EndGroup();
					oL.AddGroup( "Renameing_Name", true);
						oItem = oL.AddItem( "ReName", "ReName" );
					oL.EndGroup();
		oL.EndRow();
	oL.EndGroup();
	oItem = oL.AddButton( "Change", "Change" );
	oItem.SetAttribute( siUICX, 380 );
	oItem.SetAttribute( siUICY, 60 );

oL.Language = "JScript";
oL.Logic = Change_OnClicked.toString();
     
function Change_OnClicked()
{
var oSel = Getvalue("SelectionList");
var oSelCount = oSel.count;
var Target_Item = PPG.Target.value;
var ReName_Item = PPG.ReName.value;
if(oSel.count > 0 )
	{
	for(var i=0; i<oSelCount; i++)
		{
		var TargetName = oSel(i).name;
		if( TargetName.match(Target_Item))
			{
			var Change = TargetName.substring(TargetName.lastIndexOf(Target_Item));
			var ChangeName  = Change.replace(Target_Item, ReName_Item);
			var Final_Name = TargetName.replace(Change, ChangeName);
			oSel(i).name = Final_Name;
			}
		}
	}
else
	{
	var Ed = XSIUIToolkit.Msgbox( "You must select one or more.", siMsgOkOnly | siMsgQuestion, "attention" );
	}
}
InspectObj( oP, null, null, siLock );
	
