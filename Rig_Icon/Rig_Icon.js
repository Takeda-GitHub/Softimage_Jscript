if(Selection.count > 0)
	{
	var oSel = SelectChildNodes(Selection(0));
	var model_name = Selection(0).name;
	var oRoot =  ActiveSceneRoot;
	
		//move,moveoff,rot
		var Move = CreatePrim("Circle", "NurbsCurve", "move", null);
		SetValue(Move+".circle.radius", 4);
		var Move_Point = SelectGeometryComponents(Move+".pnt[*]");
		Rotate(Move_Point, -90, 0, 0, siRelative, siAdd, siObj, siXYZ);
		MakeLocal(Move+".display", siNodePropagation);
		SetValue(Move+".display.wirecolorr", 0.125, null);
		SetValue(Move+".display.wirecolorg", 0.878, null);
		SetValue(Move+".display.wirecolorb", 0.125, null);
		var Rot = CreatePrim("Circle", "NurbsCurve", "rot", null);
		SetValue(Rot+".circle.radius", 3);
		var Rot_Point = SelectGeometryComponents(Rot+".pnt[*]");
		Rotate(Rot_Point, -90, 0, 0, siRelative, siAdd, siObj, siXYZ);
		MakeLocal(Rot+".display", siNodePropagation);
		SetValue(Rot+".display.wirecolorr", 0, null);
		SetValue(Rot+".display.wirecolorg", 0.251, null);
		SetValue(Rot+".display.wirecolorb", 0, null);
		var Move_Off = GetPrim("Null", "move_off", null, null);
		ParentObj(Move_Off , Rot);
		ParentObj(Move , Move_Off);
		DeselectAll();
		SelectObj(Move);
		var Model_Create = SICreateModel("", model_name + "_Rig");
		var Model = Model_Create.Value( "Value" );
		var Create_Icon = RingNull( );
		MatchTransform(Create_Icon, oSel(i), siTrn, null);
		ParentObj(Rot, Create_Icon);
		Create_Icon.name = "COG";

	for(var i = 0 ; i < oSel.Count ; i++)
		{
		switch(oSel(i).name)
			{
			case "stomach":	
				var Create_Icon = Box( );
				MatchTransform(Create_Icon, oSel(i), siTrn, null);
				ParentObj(Model, Create_Icon);
				Create_Icon.name = "stomach";
				ApplyCns("Pose", oSel(i), Create_Icon, null);
			break;
			}
		}
	}
else
	{
	Logmessage("selection!");
	}
	
	
	
function Box( )
{
	SetValue("preferences.scripting.cmdlog", false, null);
	var Box = CreatePrim("Cube", "MeshSurface","Cube_Control", null);
	SetValue(Box+".cube.length", 1);
	var Cur = ApplyGenOp("ExtractEdgeLoopOp", "MeshSurface", Box+".edge[*]", siUnspecified, siPersistentOperation, siKeepGenOpInputs,null)(0);
	var NewObj = Cur.OutputPorts(0).Target2.Parent;
	NewObj.Name = "Box_Icon";
	var oSelF = SelectObj([Box,NewObj]);
	FreezeObj(oSelF);
	DeleteObj(Box);
	SetValue("preferences.scripting.cmdlog", true, null);
	return NewObj;
}

function RingNull( )
{
	SetValue("preferences.scripting.cmdlog", false, null);
	var Part1 = SICreateCurve("Part1", 1, 1);
	SIAddPointOnCurveAtEnd(Part1, 0, 0, -4, false, 0, null);
	SIAddPointOnCurveAtEnd(Part1, 0, 0, 4, false, 0, null);
	var Part2 = SICreateCurve("Part2", 1, 1);
	SIAddPointOnCurveAtEnd(Part2, -4, -3.74915180455534E-29, 0, false, 0, null);
	SIAddPointOnCurveAtEnd(Part2, 4, -3.74915180455534E-29, 0, false, 0, null);
	var Part3 = CreatePrim("Circle", "NurbsCurve", null, null);
	Rotate(Part3, 90, 0, 0, siRelative, siLocal);
	var Part4 = CreatePrim("Circle", "NurbsCurve", null, null);
	Rotate(Part4, 90, 0, 0, siAbsolute, siLocal);
	SetValue(Part4+".circle.radius", 4.5, null);
	SetValue(Part4+".crvlist.geom.subdivu", 60, null);
	var Point = SelectGeometryComponents( Part4+".pnt[15,45,0,30]");
	SetUserPref("3D_TRANSFO_PROPORTIONAL_CHANGED", 1);
	SetValue("Scene Defaults.movecomponentproportional.distlimit", 1.5, null);
	Scale(Point, 1.43510010912283, 1.43510010912283, 1, siRelative, siLocal);
	SetUserPref("3D_TRANSFO_PROPORTIONAL_CHANGED", 0);
	ActivateObjectSelTool(null);
	SelectObj([Part1,Part2,Part3,Part4], null, true);
	var oSel = Getvalue("SelectionList");
	var oCurveList = ActiveSceneRoot.AddNurbsCurveList();
	oCurveList.Name = "RingNull";
	for(var i=0; i<oSel.Count; i++)
		{
			gtCurveTools_AddCurve(oCurveList, oSel(i));
		}
	DeleteObj(oSel);
	Scale(oCurveList, 0.2, 0.2, 0.2, siAbsolute);
	ResetTransform(oCurveList, siCtr, siScl, siXYZ);
	SelectObj(oCurveList);
	SetValue("preferences.scripting.cmdlog", true, null);

		function gtCurveTools_AddCurve(in_base, in_item) 
			{
				var oWorkCurve = Duplicate(in_item, 1, 0, 0, 0, 2, 1, 2, 1)(0);
				in_base.AddChild(oWorkCurve);
				ResetTransform(oWorkCurve, siCtr, siSRT, siXYZ);
				FreezeObj(oWorkCurve);
				var oCurveList = in_base.ActivePrimitive.Geometry;
				var oCurveItems = oWorkCurve.ActivePrimitive.Geometry.Curves;
				for(var i=0; i<oCurveItems.Count; i++) 
					{
						var aData = oCurveItems(i).Get2(siSINurbs).toArray();
						var aPos = aData[0].toArray();
						var aKnot = aData[1].toArray();
						if(aKnot == undefined)
							{
							aKnot = [];
							}
					var close = aData[2];
					var degree = aData[3];
					var parame = aData[4];
					oCurveList.AddCurve(aPos, aKnot, close, degree, parame, 0);
					}
				DeleteObj(oWorkCurve);
			}
}