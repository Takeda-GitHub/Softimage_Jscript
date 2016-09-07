var oSel = Getvalue("SelectionList");
var oRoot = ActiveSceneRoot;
for(var i= 0 ; i<oSel.Count ;i++)
	{
	var NUll = oRoot.addnull("Null_Controll");
	MatchTransform(NUll, oSel(i), siSRT, null);
	var Per = oSel(i).Parent;
	Logmessage(Per);
	ParentObj(Per, NUll);
	ParentObj(NUll, oSel());
	}