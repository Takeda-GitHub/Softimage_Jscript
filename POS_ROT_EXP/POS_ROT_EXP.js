var oSel = Selection(0);
var oSel2 = PickObject();
var oSel3 = oSel2(2).name;
SetExpr(oSel+".kine.local.posx", oSel3+".kine.local.posx", null);
SetExpr(oSel+".kine.local.posy", oSel3+".kine.local.posy", null);
SetExpr(oSel+".kine.local.posz", oSel3+".kine.local.posz", null);
SetExpr(oSel+".kine.local.rotx", oSel3+".kine.local.rotx", null);
SetExpr(oSel+".kine.local.roty", oSel3+".kine.local.roty", null);
SetExpr(oSel+".kine.local.rotz", oSel3+".kine.local.rotz", null);