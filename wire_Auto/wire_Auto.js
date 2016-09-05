var oP = XSIFactory.CreateObject( "CustomProperty" );
SetValue("preferences.Interaction.autoinspect", false, null);
var oXSIUIT = new ActiveXObject( "XSI.UIToolkit" );
var Ed = oXSIUIT.Msgbox( "please Local_Value 0,0,0?", siMsgOkOnly | siMsgQuestion, "please Local_Value 0,0,0?" );

oP.name = "Set_wirev";
oP.AddParameter2( "bone", siInt4, "10","5","20");
oP.AddParameter2( "size", sifloat, "0.1");
oP.AddParameter2( "B_size", sifloat, "0.5");
//oP.AddParameter2( "Mass", sifloat, "1");
oP.AddParameter2( "YDown", sibool, false);
var oL, oItem;
oL = oP.PPGLayout;
	oL.AddGroup();
		oItem = oL.AddItem( "bone", "bone" );
		oItem = oL.AddItem( "size", "Bone_size" );
		oItem = oL.AddItem( "B_size", "controller_size" );
		//oItem = oL.AddItem( "Mass", "Mass" );
		oItem = oL.AddItem( "YDown", "Create_YDown" );
	oL.EndGroup();
	oL.AddGroup();
		oItem = oL.AddButton( "Set", "開始" );
		oItem.SetAttribute( siUICX, 150 );
		oItem.SetAttribute( siUICY, 80 );
	oL.EndGroup();
oL.Language = "JScript";
oL.Logic = Set_OnClicked.toString();
	
function Set_OnClicked()
{
SetValue("preferences.scripting.cmdlog", false, null);
SetValue("preferences.Interaction.autoinspect", false, null);
var ohako = XSIFactory.CreateObject( "XSI.Collection" );
var ohako2 = XSIFactory.CreateObject( "XSI.Collection" );
var ohako3 = XSIFactory.CreateObject( "XSI.Collection" );
var oSel = Getvalue("SelectionList");
if(oSel.Count > 0)
	{
		var Nulls = PPG.bone.value - 5;
		var Size = PPG.size.value;
		var B_Size = PPG.B_size.value;
		//var MASS = PPG.Mass.value;
		var YDown= PPG.YDown.value;
		var oRoot =  ActiveSceneRoot;
		var RootNull = oRoot.addNull(oSel(0).name + "_Global");
		var Model = oSel(0).Parent;
		MatchTransform(RootNull, oSel(0), siTrn, null);
		var Dis = oRoot.Addnull("Distance");
		SetExpr(Dis + ".kine.global.posy", "ctr_dist( " + oSel(0) + ".kine.global.pos , " + oSel(1) + ".kine.global.pos )", null);
		var DisY = Dis.kinematics.global.posy.value;
		var Count = 1;
		ohako.add(oSel(0));
		for(var i=0; i<Nulls; i++)
			{
			var Set_Guide = oRoot.Addnull("Guide_"+i);
			MatchTransform(Set_Guide, oSel(0), siSRT);
			var Move = DisY / (Nulls + 1) * Count;
			if(YDown == false)
				{
				Set_Guide.kinematics.global.posx.value =  Set_Guide.kinematics.global.posx.value + Move;
				}
			else
				{
				Set_Guide.kinematics.global.posy.value =  Set_Guide.kinematics.global.posy.value - Move;
				}
			//after
			Count += 1 ;
			ohako.add(Set_Guide);
			ohako2.add(Set_Guide);
			}
	ohako.add(oSel(1));
	var oRootPos = XSIMath.CreateVector3();
	var oTipPos = XSIMath.CreateVector3();
	var oCurve = SICreateCurve("", 3, 1);
	ParentObj(RootNull,oCurve );
	ohako(0).kinematics.global.Transform.GetTranslation(oRootPos);
	SIAddPointOnCurveAtEnd(oCurve, oRootPos.x, oRootPos.y, oRootPos.z,  false, 0, null);
	for(var k=1; k<ohako.Count; k++)
		{
		ohako(k).Kinematics.Global.Transform.GetTranslation(oTipPos);
		SIAddPointOnCurveAtEnd(oCurve, oTipPos.x, oTipPos.y, oTipPos.z, false, 0, null);
		}
		var oGeo = oCurve.ActivePrimitive.Geometry;
		var oVertex = oGeo.points;
		for (var p=0;p<oVertex.Count;p++)
			{
			var Clu = CreateClusterCenterWithNull(oVertex(p), 0);
			}
		DeleteObj(ohako2);
		var oClusters = oCurve.Children;
		for (var v=0;v<oClusters.Count ;v++)
			{
				SetValue(oClusters(v)+".null.size", 0.01, null);
			}
		var oCl_Count = oClusters.Count;
		var CurveDup = Duplicate(oCurve, 1, 2, 1, 1, 0, 0, 1, 0, 1, null, null, null, null, null, null, null, null, null, null, 0);
		//MakeControlSplines(CurveDup, Nulls*2, Size,Model,0,1,0);
		var Target_Null = Nulls + 5;
		var ARRAY = new Array();
		for (var m = 0 ; m < Target_Null ; m++)
			{
				var PathCns = oRoot.Addnull("PathCns");
				var Cont = Box();
				Cont.name = "PathCns_Cont";
				ParentObj(PathCns, Cont);
				SetValue(PathCns+".null.size", 0.1);
				MakeLocal(Cont+".display", siNodePropagation);
				SetValue(Cont+".display.wirecolorr", 0.878, null);
				SetValue(Cont+".display.wirecolorg", 0.878, null);
				SetValue(Cont+".display.wirecolorb", 0, null);
				ARRAY.push(PathCns);
			}
			ARRAY.sort(
			function sort(a,b)
				{
    			if( a < b ) return 1;
        		if( a > b ) return -1;
        		return 0;
    			});
		for (var b=0;b<ARRAY.length ;b++)
			{
				ApplyCns("Path", ARRAY[b], CurveDup, null);
				var Per_Number = ((100 / (ARRAY.length - 1)) * b );
				ParentObj(CurveDup, ARRAY[b]);
				if(b == 0)
					{
						SetValue(ARRAY[b]+".kine.pathcns.perc", 0);
					}
				else if(b == ARRAY.length-1)
					{
						SetValue(ARRAY[b]+".kine.pathcns.perc", 100);
					}
				else
					{
						SetValue(ARRAY[b]+".kine.pathcns.perc", Per_Number);
					}
			}
		for (var y=0;y<ohako3.Count;y++)
			{
				ApplyCns("Pose", ohako3(y), oClusters(y+1), null);
			}
		SetValue("preferences.Interaction.autoinspect", true, null);
		//ApplyCns("Pose", oSel(0), oClusters(0), true);
		//ApplyCns("Pose", oSel(1), oClusters(oCl_Count-1), true);
		SaveKey(oClusters(oCl_Count-1)+".kine.local.posx,"+oClusters(oCl_Count-1)+".kine.local.posy,"+oClusters(oCl_Count-1)+".kine.local.posz");
		SetValue("preferences.Interaction.autoinspect", false, null);
		if(YDown == false)
			{
			var ParentX = oClusters(oCl_Count-1).kinematics.Local.posx.value;
			}		
		else
			{
			var ParentY = oClusters(oCl_Count-1).kinematics.Local.posy.value;
			}
		var wari = 1 / (oCl_Count-1);
		var TI = 1;
		var VI = oCl_Count/2 - 1;
		for (var u=2;u<oCl_Count;u++)
			{
			var Num = new Number(u);
			if(u == 2)
				{
				SetValue(oClusters(oCl_Count-1)+".null.size", B_Size);
				SetValue(oClusters(oCl_Count-1)+".null.primary_icon", 4);
				MakeLocal(oClusters(oCl_Count-1)+".display", siNodePropagation);
				SetValue(oClusters(oCl_Count-1)+".display.wirecolorr", 0.878, null);
				SetValue(oClusters(oCl_Count-1)+".display.wirecolorg", 0, null);
				SetValue(oClusters(oCl_Count-1)+".display.wirecolorb", 0, null);
				AddProp("Custom_parameter_list", oClusters(oCl_Count-1), "", "DisplayInfo_slash_arm", null);
				SIAddCustomParameter(oClusters(oCl_Count-1), "Local", siBool, 0, 0, 1, null, 2053, 0, 1, null, null);
				SIAddCustomParameter(oClusters(oCl_Count-1), "Expression_Toggle", siBool, 0, 0, 1, null, 2053, 0, 1, null, null);
				}
			if(YDown == false)
				{
				var ChildX = oClusters(oCl_Count - Num).kinematics.Local.posx.value;
				var Offset  =  ParentX - ChildX;
				if(TI + 1  > oCl_Count/2)
					{
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.posx", "( " + oClusters(oCl_Count - 1) + ".kine.local.posx + ( "+oClusters(0) + ".kine.local.posx - "+ oClusters(oCl_Count - 1) + ".kine.local.posx))-((" + oClusters(0) + ".kine.local.posx - "+oClusters(oCl_Count - 1) + ".kine.local.posx)*" + wari *(oCl_Count - Num)+")",null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.posy", "(at_frame( Fc -" + VI  +"  , " + oClusters(oCl_Count - 1) + ".kine.local.posy) + ( "+ oClusters(0) + ".kine.local.posy - "+oClusters(oCl_Count - 1) + ".kine.local.posy))-((" + oClusters(0) + ".kine.local.posy - "+oClusters(oCl_Count - 1) + ".kine.local.posy)*" + wari *(oCl_Count - Num)+")", null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.posz", "(at_frame( Fc -" + VI  +"  , " + oClusters(oCl_Count - 1) + ".kine.local.posz) + ( "+ oClusters(0) + ".kine.local.posz - "+oClusters(oCl_Count - 1) + ".kine.local.posz))-((" + oClusters(0) + ".kine.local.posz - "+oClusters(oCl_Count - 1) + ".kine.local.posz)*" + wari *(oCl_Count - Num)+")", null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.pos.posx.Expression.Active", oClusters(oCl_Count-1)+".DisplayInfo_slash_arm.Expression_Toggle", null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.pos.posy.Expression.Active", oClusters(oCl_Count-1)+".DisplayInfo_slash_arm.Expression_Toggle", null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.pos.posz.Expression.Active", oClusters(oCl_Count-1)+".DisplayInfo_slash_arm.Expression_Toggle", null);
					VI -= 1;
					}
				else
					{
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.posx", "( " + oClusters(oCl_Count - 1) + ".kine.local.posx + ( "+oClusters(0) + ".kine.local.posx - "+ oClusters(oCl_Count - 1) + ".kine.local.posx))-((" + oClusters(0) + ".kine.local.posx - "+oClusters(oCl_Count - 1) + ".kine.local.posx)*" + wari *(oCl_Count - Num)+")",null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.posy", "(at_frame( Fc -" + TI  +"  , " + oClusters(oCl_Count - 1) + ".kine.local.posy) + ( "+ oClusters(0) + ".kine.local.posy - "+oClusters(oCl_Count - 1) + ".kine.local.posy))-((" + oClusters(0) + ".kine.local.posy - "+oClusters(oCl_Count - 1) + ".kine.local.posy)*" + wari *(oCl_Count - Num)+")", null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.posz", "(at_frame( Fc -" + TI  +"  , " + oClusters(oCl_Count - 1) + ".kine.local.posz) + ( "+ oClusters(0) + ".kine.local.posz - "+oClusters(oCl_Count - 1) + ".kine.local.posz))-((" + oClusters(0) + ".kine.local.posz - "+oClusters(oCl_Count - 1) + ".kine.local.posz)*" + wari *(oCl_Count - Num)+")", null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.pos.posx.Expression.Active", oClusters(oCl_Count-1)+".DisplayInfo_slash_arm.Expression_Toggle", null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.pos.posy.Expression.Active", oClusters(oCl_Count-1)+".DisplayInfo_slash_arm.Expression_Toggle", null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.pos.posz.Expression.Active", oClusters(oCl_Count-1)+".DisplayInfo_slash_arm.Expression_Toggle", null);
					}
				}
			else
				{
				var ChildY = oClusters(oCl_Count - Num).kinematics.Local.posy.value;
				var Offset  =  ParentY - ChildY;
				if(TI + 1  > oCl_Count/2)
					{
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.posx", "(at_frame( Fc -" + VI  +" , " + oClusters(oCl_Count - 1) + ".kine.local.posx)+( "+oClusters(0) + ".kine.local.posx - "+oClusters(oCl_Count - 1) + ".kine.local.posx))-((" + oClusters(0) + ".kine.local.posx - "+oClusters(oCl_Count - 1) + ".kine.local.posx)*" + wari *(oCl_Count - Num)+")", null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.posy", "( " + oClusters(oCl_Count - 1)  + ".kine.local.posy + ( "+oClusters(0) + ".kine.local.posy - "+oClusters(oCl_Count - 1) + ".kine.local.posy))-((" + oClusters(0) + ".kine.local.posy - "+oClusters(oCl_Count - 1) + ".kine.local.posy)*" + wari *(oCl_Count - Num)+")",null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.posz", "(at_frame( Fc -" + VI  +" , " + oClusters(oCl_Count - 1) + ".kine.local.posz)+( "+oClusters(0) + ".kine.local.posz - "+oClusters(oCl_Count - 1) + ".kine.local.posz))-((" +oClusters(0) + ".kine.local.posz - "+oClusters(oCl_Count - 1) + ".kine.local.posz)*" + wari *(oCl_Count - Num)+")", null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.pos.posx.Expression.Active", oClusters(oCl_Count-1)+".DisplayInfo_slash_arm.Expression_Toggle", null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.pos.posy.Expression.Active", oClusters(oCl_Count-1)+".DisplayInfo_slash_arm.Expression_Toggle", null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.pos.posz.Expression.Active", oClusters(oCl_Count-1)+".DisplayInfo_slash_arm.Expression_Toggle", null);
					VI -= 1;
					}
				else
					{
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.posx", "(at_frame( Fc -" + TI  +" , " + oClusters(oCl_Count - 1) + ".kine.local.posx)+( "+oClusters(0) + ".kine.local.posx - "+oClusters(oCl_Count - 1) + ".kine.local.posx))-((" + oClusters(0) + ".kine.local.posx - "+oClusters(oCl_Count - 1) + ".kine.local.posx)*" + wari *(oCl_Count - Num)+")", null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.posy", "( " + oClusters(oCl_Count - 1)  + ".kine.local.posy + ( "+oClusters(0) + ".kine.local.posy - "+oClusters(oCl_Count - 1) + ".kine.local.posy))-((" + oClusters(0) + ".kine.local.posy - "+oClusters(oCl_Count - 1) + ".kine.local.posy)*" + wari *(oCl_Count - Num)+")",null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.posz", "(at_frame( Fc -" + TI  +" , " + oClusters(oCl_Count - 1) + ".kine.local.posz)+( "+oClusters(0) + ".kine.local.posz - "+oClusters(oCl_Count - 1) + ".kine.local.posz))-((" +oClusters(0) + ".kine.local.posz - "+oClusters(oCl_Count - 1) + ".kine.local.posz)*" + wari *(oCl_Count - Num)+")", null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.pos.posx.Expression.Active", oClusters(oCl_Count-1)+".DisplayInfo_slash_arm.Expression_Toggle", null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.pos.posy.Expression.Active", oClusters(oCl_Count-1)+".DisplayInfo_slash_arm.Expression_Toggle", null);
					SetExpr(oClusters(oCl_Count - Num) + ".kine.local.pos.posz.Expression.Active", oClusters(oCl_Count-1)+".DisplayInfo_slash_arm.Expression_Toggle", null);
					}
				}
			TI += 1;
			}
			if(Model != "Scene_Root")
				{
				//ParentObj(Model, oCurve);
				}
	}
else
	{
	var Ed = XSIUIToolkit.Msgbox( 'NotingSelection', siMsgOkOnly | siMsgQuestion, 'END' );
	return;
	}
	DeleteObj(Dis);
	Selectobj(oCurve);
	ApplyCurveLengthProp();
	
function Box()
{
	var Box = CreatePrim("Cube", "MeshSurface","Cube_Control", null);
	SetValue(Box+".cube.length", 0.2);
	var Cur = ApplyGenOp("ExtractEdgeLoopOp", "MeshSurface", Box+".edge[*]", siUnspecified, siPersistentOperation, siKeepGenOpInputs,null)(0);
	var NewObj = Cur.OutputPorts(0).Target2.Parent;
	NewObj.Name = "Box_Icon";
	var oSelF = SelectObj([Box,NewObj]);
	FreezeObj(oSelF);
	DeleteObj(Box);
	return NewObj;
}

function Controller()
	{
		//Create controller
		var Dia = CreatePrim("Octahedron", "MeshSurface");
		SetValue(Dia + ".octahedron.radius", Size, null);
		Scale( Dia , 1, 0.6, 1, siAbsolute);
		Rotate( Dia , 0, -45, 0, siRelative);
		var Cur = ApplyGenOp("ExtractEdgeLoopOp", "MeshSurface", Dia+".edge[*]", siUnspecified, siPersistentOperation, siKeepGenOpInputs,null)(0);
		var NewObj = Cur.OutputPorts(0).Target2.Parent;
		NewObj.Name = "SlashIcon1";
		var oSelF = SelectObj([Dia,NewObj]);
		FreezeObj(oSelF);
		DeleteObj(Dia);
		return NewObj;
	}
function CurveLengthOp_Update( In_UpdateContext, Out, Incrvlist ) {
    Out.Value = Incrvlist.Value.Geometry.Curves(0).Length;
    return true;
}
function ApplyCurveLengthProp() {
    oEnum = new Enumerator( Application.Selection ) ;
    for (;!oEnum.atEnd();oEnum.moveNext() )
    {
        var sel = oEnum.item();
        if (sel.Type == "crvlist") {
            var oProp = sel.AddProperty( "Custom_parameter_list", false, "CurveLength" );
            var p = oProp.AddParameter2("CurveLength",siDouble,0,-8000,8000,-8000,8000,siClassifUnknown,siPersistable | siAnimatable, "Length");
            var crvList = sel.ActivePrimitive;
            var newOp = AddScriptedOp( p, CurveLengthOp_Update.toString(), crvList, "CurveLengthOp", "JScript" );
            
            newOp.Debug = 0;
            newOp.AlwaysEvaluate = true;
            newOp.Connect();
        }
    }
}

	
	
	
}
InspectObj( oP, null, null, siLock );
 


