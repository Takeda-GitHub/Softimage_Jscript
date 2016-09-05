var oSel = Selection(0);
var oSel2 = PickObject();
var oSel3 = oSel2(2).name;
ApplyCns("Orientation", oSel, oSel3, null);
ApplyCns("Position", oSel, oSel3, null);
