SetValue("preferences.Interaction.autoinspect", false, null);
SetValue("preferences.scripting.cmdlog", false, null);
/////////////////////////////////////////////////////////
var Curve_Saki = SICreateCurve("KenSaki_Curve", 1, 1);
SIAddPointOnCurveAtEnd(Curve_Saki, -2, 3, 0, false, 0, null);
SIAddPointOnCurveAtEnd(Curve_Saki, -1, 3, 0, false, 0, null);
SIAddPointOnCurveAtEnd(Curve_Saki, 0, 3, 0, false, 0, null);
SIAddPointOnCurveAtEnd(Curve_Saki, 1, 3, 0, false, 0, null);
SIAddPointOnCurveAtEnd(Curve_Saki, 2, 3, 0, false, 0, null);
CreateClusterCenterWithNull(Curve_Saki+".pnt[0]", 0);
CreateClusterCenterWithNull(Curve_Saki+".pnt[1]", 0);
CreateClusterCenterWithNull(Curve_Saki+".pnt[2]", 0);
CreateClusterCenterWithNull(Curve_Saki+".pnt[3]", 0);
CreateClusterCenterWithNull(Curve_Saki+".pnt[LAST]", 0);
///////////////////////////////////////////////////////////
SetValue(Curve_Saki+"." + Curve_Saki + "_Point_ClsCtr.Name", "Saki01_ClsCtr", null);
SetValue(Curve_Saki+"." + Curve_Saki + "_Point1_ClsCtr.Name", "Saki02_ClsCtr", null);
SetValue(Curve_Saki+"." + Curve_Saki + "_Point2_ClsCtr.Name", "Saki03_ClsCtr", null);
SetValue(Curve_Saki+"." + Curve_Saki + "_Point3_ClsCtr.Name", "Saki04_ClsCtr", null);
SetValue(Curve_Saki+"." + Curve_Saki + "_Point4_ClsCtr.Name", "Saki05_ClsCtr", null);
////////////////////////////////////////////////////////////
var Curve_Moto = SICreateCurve("KenMotoCurve", 1, 1);
SIAddPointOnCurveAtEnd(Curve_Moto, -2, 0, 0, false, 0, null);
SIAddPointOnCurveAtEnd(Curve_Moto, -1, 0, 0, false, 0, null);
SIAddPointOnCurveAtEnd(Curve_Moto, 0, 0, 0, false, 0, null);
SIAddPointOnCurveAtEnd(Curve_Moto, 1, 0, 0, false, 0, null);
SIAddPointOnCurveAtEnd(Curve_Moto, 2, 0, 0, false, 0, null);
CreateClusterCenterWithNull(Curve_Moto+".pnt[0]", 0);
CreateClusterCenterWithNull(Curve_Moto+".pnt[1]", 0);
CreateClusterCenterWithNull(Curve_Moto+".pnt[2]", 0);
CreateClusterCenterWithNull(Curve_Moto+".pnt[3]", 0);
CreateClusterCenterWithNull(Curve_Moto+".pnt[LAST]", 0);
///////////////////////////////////////////////////////////
SetValue(Curve_Moto+"." + Curve_Moto + "_Point_ClsCtr.Name", "Moto01_ClsCtr", null);
SetValue(Curve_Moto+"." + Curve_Moto + "_Point1_ClsCtr.Name", "Moto02_ClsCtr", null);
SetValue(Curve_Moto+"." + Curve_Moto + "_Point2_ClsCtr.Name", "Moto03_ClsCtr", null);
SetValue(Curve_Moto+"." + Curve_Moto + "_Point3_ClsCtr.Name", "Moto04_ClsCtr", null);
SetValue(Curve_Moto+"." + Curve_Moto + "_Point4_ClsCtr.Name", "Moto05_ClsCtr", null);
SelectObj([Curve_Saki,Curve_Moto], null, null);
var KenKiseki_Moto = CreateModel(null, "KenKiseki", null, null);
var KenKiseki = KenKiseki_Moto.value("Value");
DeselectAll();
var Mesh = ApplyGenOp("Loft", "MeshSurface", [Curve_Saki,Curve_Moto], 3, siPersistentOperation, siKeepGenOpInputs, null)(0);
var oMesh_Cash = Mesh.OutputPorts(0).Target2.Parent;
var oMesh = oMesh_Cash.Name
Logmessage(oMesh);

SetValue(oMesh + ".polymsh.loft.subdivuperspan", 2, null);
SetValue(oMesh + ".polymsh.loft.subdivvperspan", 2, null);
var oSel_obj = SelectObj(oMesh);
var oSel = Getvalue("SelectionList");
SetValue(oSel(0)+".Name", "Kiseki_Mesh", null);
ParentObj(KenKiseki, oSel);
////////////////////////////////////////////////////////////////
GetPrim( "null", "KenSaki", KenKiseki, null);
GetPrim( "null", "KenMoto", KenKiseki, null);
//////////////////////////////////////////////////////////////
GetPrim( "null", "KenSaki_Tsuijyu", KenKiseki, null);
ApplyCns("Pose", KenKiseki + ".KenSaki_Tsuijyu", KenKiseki+".KenSaki", null);
var In =  Getvalue("PlayControl.In");
var Out = Getvalue("PlayControl.Out")+1 ;
PlotAndApplyActions(KenKiseki + ".KenSaki.kine.local.posx," + KenKiseki + ".KenSaki.kine.local.posy," + KenKiseki + ".KenSaki.kine.local.posz", "plot", In, Out, null, 20, 3, null, null, null, null, true, true);
PlotAndApplyActions(KenKiseki + ".KenMoto.kine.local.posx," + KenKiseki + ".KenMoto.kine.local.posy,"+ KenKiseki + ".KenMoto.kine.local.posz", "plot", In, Out, null, 20, 3, null, null, null, null, true, true);
////////////////////////////////////////////////////////////
SetExpr(KenKiseki + ".Moto01_ClsCtr.kine.local.posx", KenKiseki + ".KenMoto.kine.local.posx", null);
SetExpr(KenKiseki + ".Moto01_ClsCtr.kine.local.posy", KenKiseki + ".KenMoto.kine.local.posy", null);
SetExpr(KenKiseki + ".Moto01_ClsCtr.kine.local.posz", KenKiseki + ".KenMoto.kine.local.posz", null);
SetExpr(KenKiseki + ".Moto02_ClsCtr.kine.local.posx", "at_frame( Fc-1, " + KenKiseki + ".KenMoto.kine.local.posx )", null);
SetExpr(KenKiseki + ".Moto02_ClsCtr.kine.local.posy", "at_frame( Fc-1, " + KenKiseki + ".KenMoto.kine.local.posy )", null);
SetExpr(KenKiseki + ".Moto02_ClsCtr.kine.local.posz", "at_frame( Fc-1, " + KenKiseki + ".KenMoto.kine.local.posz )", null);
SetExpr(KenKiseki + ".Moto03_ClsCtr.kine.local.posx", "at_frame( Fc-2, " + KenKiseki + ".KenMoto.kine.local.posx )", null);
SetExpr(KenKiseki + ".Moto03_ClsCtr.kine.local.posy", "at_frame( Fc-2, " + KenKiseki + ".KenMoto.kine.local.posy )", null);
SetExpr(KenKiseki + ".Moto03_ClsCtr.kine.local.posz", "at_frame( Fc-2, " + KenKiseki + ".KenMoto.kine.local.posz )", null);
SetExpr(KenKiseki + ".Moto04_ClsCtr.kine.local.posx", "at_frame( Fc-3, " + KenKiseki + ".KenMoto.kine.local.posx )", null);
SetExpr(KenKiseki + ".Moto04_ClsCtr.kine.local.posy", "at_frame( Fc-3, " + KenKiseki + ".KenMoto.kine.local.posy )", null);
SetExpr(KenKiseki + ".Moto04_ClsCtr.kine.local.posz", "at_frame( Fc-3, " + KenKiseki + ".KenMoto.kine.local.posz )", null);
SetExpr(KenKiseki + ".Moto05_ClsCtr.kine.local.posx", "at_frame( Fc-4, " + KenKiseki + ".KenMoto.kine.local.posx )", null);
SetExpr(KenKiseki + ".Moto05_ClsCtr.kine.local.posy", "at_frame( Fc-4, " + KenKiseki + ".KenMoto.kine.local.posy )", null);
SetExpr(KenKiseki + ".Moto05_ClsCtr.kine.local.posz", "at_frame( Fc-4, " + KenKiseki + ".KenMoto.kine.local.posz )", null);
/////////////////////////////////////////////////////////////////////////////
SetExpr(KenKiseki + ".Saki01_ClsCtr.kine.local.posx", KenKiseki + ".KenSaki.kine.local.posx", null);
SetExpr(KenKiseki + ".Saki01_ClsCtr.kine.local.posy", KenKiseki + ".KenSaki.kine.local.posy", null);
SetExpr(KenKiseki + ".Saki01_ClsCtr.kine.local.posz", KenKiseki + ".KenSaki.kine.local.posz", null);
SetExpr(KenKiseki + ".Saki02_ClsCtr.kine.local.posx", "at_frame( Fc-1, " + KenKiseki + ".KenSaki.kine.local.posx )", null);
SetExpr(KenKiseki + ".Saki02_ClsCtr.kine.local.posy", "at_frame( Fc-1, " + KenKiseki + ".KenSaki.kine.local.posy )", null);
SetExpr(KenKiseki + ".Saki02_ClsCtr.kine.local.posz", "at_frame( Fc-1, " + KenKiseki + ".KenSaki.kine.local.posz )", null);
SetExpr(KenKiseki + ".Saki03_ClsCtr.kine.local.posx", "at_frame( Fc-2, " + KenKiseki + ".KenSaki.kine.local.posx )", null);
SetExpr(KenKiseki + ".Saki03_ClsCtr.kine.local.posy", "at_frame( Fc-2, " + KenKiseki + ".KenSaki.kine.local.posy )", null);
SetExpr(KenKiseki + ".Saki03_ClsCtr.kine.local.posz", "at_frame( Fc-2, " + KenKiseki + ".KenSaki.kine.local.posz )", null);
SetExpr(KenKiseki + ".Saki04_ClsCtr.kine.local.posx", "at_frame( Fc-3, " + KenKiseki + ".KenSaki.kine.local.posx )", null);
SetExpr(KenKiseki + ".Saki04_ClsCtr.kine.local.posy", "at_frame( Fc-3, " + KenKiseki + ".KenSaki.kine.local.posy )", null);
SetExpr(KenKiseki + ".Saki04_ClsCtr.kine.local.posz", "at_frame( Fc-3, " + KenKiseki + ".KenSaki.kine.local.posz )", null);
SetExpr(KenKiseki + ".Saki05_ClsCtr.kine.local.posx", "at_frame( Fc-4, " + KenKiseki + ".KenSaki.kine.local.posx )", null);
SetExpr(KenKiseki + ".Saki05_ClsCtr.kine.local.posy", "at_frame( Fc-4, " + KenKiseki + ".KenSaki.kine.local.posy )", null);
SetExpr(KenKiseki + ".Saki05_ClsCtr.kine.local.posz", "at_frame( Fc-4, " + KenKiseki + ".KenSaki.kine.local.posz )", null);
///////////////////////////////////////////////////////////////////////////////
SelectObj(KenKiseki + ".Kiseki_Mesh", null, true);
GenerateAutomaticUVs(KenKiseki + ".Kiseki_Mesh.polymsh.loft", KenKiseki+".Kiseki_Mesh", "AutoUVTxtCoords");
SetValue("" + KenKiseki + ".visibility.viewvis," + KenKiseki + ".Moto02_ClsCtr.visibility.viewvis," + KenKiseki + ".Saki03_ClsCtr.visibility.viewvis," + KenKiseki + ".Saki01_ClsCtr.visibility.viewvis," + KenKiseki + ".Saki04_ClsCtr.visibility.viewvis," + KenKiseki + ".KenSaki_Tsuijyu.visibility.viewvis," + KenKiseki + ".Moto05_ClsCtr.visibility.viewvis," + KenKiseki + ".Moto01_ClsCtr.visibility.viewvis," + KenKiseki + ".Moto03_ClsCtr.visibility.viewvis," + KenKiseki + ".KenMotoCurve.visibility.viewvis," + KenKiseki + ".Saki02_ClsCtr.visibility.viewvis," + KenKiseki + ".Moto04_ClsCtr.visibility.viewvis," + KenKiseki + ".Saki05_ClsCtr.visibility.viewvis," + KenKiseki + ".KenSaki_Curve.visibility.viewvis", [false, false, false, false, false, false, false, false, false, false, false, false, false, false], null);
Lock(KenKiseki, siLockLevelConstruction);
SetValue("preferences.Interaction.autoinspect", true, null);
SetValue("preferences.scripting.cmdlog", true, null);