var oSel = Getvalue("SelectionList");
var oModel = oSel(0).model;
var oLen = new Array();

for(var i=0; i<oSel.Count; i++)
{
	oLen.push(oSel(i));
}
var Last = oLen[oLen.length-1];


for(var i=0; i<oSel.Count-1; i++)
{
	var Null = GetPrim("Null", null, null, null);
	SetValue(Null+".null.primary_icon", 2, null);
	SetValue(Null+".null.size", 0.01, null);
	MatchTransform(Null, oSel(i), siTrn, null);
	MatchTransform(Null, oSel(i), siRot, null);
	var Par = oSel(i).Parent;
	ParentObj(Par, Null);
	SetNeutralPose(Null, siSRT, null);
	ParentObj(Null,oSel(i));
	ApplyCns("Direction", Null, Last, true);
}
SetUserPref("SI3D_CONSTRAINT_COMPENSATION_MODE", 0);
