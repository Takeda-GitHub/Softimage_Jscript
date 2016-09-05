var oXSIUIT = new ActiveXObject( "XSI.UIToolkit" );
SetValue("preferences.scripting.cmdlog", false, null);
SetValue("preferences.Interaction.autoinspect", false, null);
if(Selection.count > 0)
{
 if(Selection(0).type == "#model")
  {
    var Kind = Selection(0).modelkind;
    if(Kind == 1)
      {
	var oHako = XSIFactory.CreateObject( "XSI.Collection" );
	var oHako_Bone = XSIFactory.CreateObject( "XSI.Collection" );
	var oHako_Bone_Foot = XSIFactory.CreateObject( "XSI.Collection" );
	var oHako_Arm_Scaling = XSIFactory.CreateObject( "XSI.Collection" );
	var oHako_Foot_Scaling = XSIFactory.CreateObject( "XSI.Collection" );
	var oHako_Del = XSIFactory.CreateObject( "XSI.Collection" );
	var Selection_Zero = Selection(0);
	var Bone_Model =  Selection_Zero.name;
	var oSel = SelectChildNodes(Selection(0));
	var model_name = Selection(0).name;
	var oRoot =  ActiveSceneRoot;
	var Move = CreatePrim("Circle", "NurbsCurve", "move", null);
	SetValue(Move+".circle.radius", 3);
	var Move_Point = SelectGeometryComponents(Move+".pnt[*]");
	Rotate(Move_Point, -90, 0, 0, siRelative, siAdd, siObj, siXYZ);
	MakeLocal(Move+".display", siNodePropagation);
	SetValue(Move+".display.wirecolorr", 0.125, null);
	SetValue(Move+".display.wirecolorg", 0.878, null);
	SetValue(Move+".display.wirecolorb", 0.125, null);
	var Rot = CreatePrim("Circle", "NurbsCurve", "rot", null);
	SetValue(Rot+".circle.radius", 2);
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
	for(var i = 0 ; i < oSel.Count ; i++)
		{
		switch(oSel(i).name)
			{
			case "stomach":	
				var stomach_bone = oSel(i);
				var Create_COG = RingNull( );
				Create_COG.name = "COG";
				MatchTransform(Create_COG, oSel(i), siTrn, null);
				ParentObj(Rot, Create_COG);
				MakeLocal(Create_COG+".display", siNodePropagation);
				SetValue(Create_COG+".display.wirecolorr", 0.878, null);
				SetValue(Create_COG+".display.wirecolorg", 0, null);
				SetValue(Create_COG+".display.wirecolorb", 0, null);
				oHako.add(Create_COG);
				var HipNull = Create_COG.AddNull("Hip");
				var Create_stomach = Box( );
				MatchTransform(HipNull, oSel(i), siTrn, null);
				MatchTransform(Create_stomach, oSel(i), siTrn, null);
				ParentObj(Model, Create_stomach);
				Create_stomach.name = "stomach";
				MakeLocal(Create_stomach+".display", siNodePropagation);
				SetValue(Create_stomach+".display.wirecolorr", 0.125, null);
				SetValue(Create_stomach+".display.wirecolorg", 0.878, null);
				SetValue(Create_stomach+".display.wirecolorb", 0.125, null);
				var Icon_Point = SelectGeometryComponents(Create_stomach+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Icon_Point, 1.55, 0.65, 2.56, siRelative, siGlobal, siObj, siXYZ);
				DeselectAll();
				ApplyCns("Pose", oSel(i), Create_stomach, null);
				oHako.add(Create_stomach);
			break;
			case "chest":
				var Create_chest = Box( );
				MatchTransform(Create_chest, oSel(i), siTrn, null);
				ParentObj(Model, Create_chest);
				Create_chest.name = "chest";
				MakeLocal(Create_chest+".display", siNodePropagation);
				SetValue(Create_chest+".display.wirecolorr", 0.878, null);
				SetValue(Create_chest+".display.wirecolorg", 0.878, null);
				SetValue(Create_chest+".display.wirecolorb", 0, null);
				var Icon_Point = SelectGeometryComponents(Create_chest+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Icon_Point, 2.2, 0.55, 3, siRelative, siGlobal, siObj, siXYZ);
				DeselectAll();
				ApplyCns("Pose", oSel(i), Create_chest, null);
				oHako.add(Create_chest);
			break;
			case "head":
				var Create_head = Box( );
				MatchTransform(Create_head, oSel(i), siTrn, null);
				ParentObj(Model, Create_head);
				Create_head.name = "head";
				MakeLocal(Create_head+".display", siNodePropagation);
				SetValue(Create_head+".display.wirecolorr", 0.125, null);
				SetValue(Create_head+".display.wirecolorg", 0.878, null);
				SetValue(Create_head+".display.wirecolorb", 0.753, null);
				var Icon_Point = SelectGeometryComponents(Create_head+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Icon_Point, 1, 1.8, 1.3, siRelative, siGlobal, siObj, siXYZ);
				DeselectAll();
				ApplyCns("Pose", oSel(i), Create_head, null);
				oHako.add(Create_head);
			break;
			case "r_shoulder":
				var r_shoulder_bone = oSel(i);

			break;
			case "l_shoulder":
				var l_shoulder_bone = oSel(i);
				var OffSet = GetPrim("Null","l_shoulder_offset");
				SetValue(OffSet+".null.size", 0.1);
				var Create_Icon = Box( );
				MatchTransform(OffSet, l_shoulder_bone, siTrn, null);
				MatchTransform(Create_Icon, l_shoulder_bone, siTrn, null);
				ParentObj(OffSet, Create_Icon);
				ParentObj(Model, OffSet);
				Create_Icon.name = "l_shoulder";
				MakeLocal(Create_Icon+".display", siNodePropagation);
				SetValue(Create_Icon+".display.wirecolorr", 0.878, null);
				SetValue(Create_Icon+".display.wirecolorg", 0.251, null);
				SetValue(Create_Icon+".display.wirecolorb", 0, null);
				var Icon_Point = SelectGeometryComponents(Create_Icon+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Icon_Point, 2.2, 1.5, 1.2, siRelative, siGlobal, siObj, siXYZ);
				DeselectAll();
				var Scaling = GetPrim("Null","l_arm_scaling");
				var Scaling_null_0 =Arrow( );
				Scaling_null_0.name = "l_arm_scaling0";				
				MatchTransform([Scaling,Scaling_null_0], oSel(i), siTrn, null);
				SetValue(Scaling+".null.size", 0.1);
				var Scaling_null_0_Point = SelectGeometryComponents(Scaling_null_0+".pnt[*]");
				Rotate(Scaling_null_0_Point, 90, 0, 0, siRelative, siGlobal, siObj, siXYZ);
				Rotate(Scaling_null_0_Point, 0, 90, 0, siRelative, siGlobal, siObj, siXYZ);
				Scale(Scaling_null_0_Point, 0.25, 0.25, 0.25, siRelative, siLocal, siObj, siXYZ);
				Translate(Scaling_null_0_Point, 2.76, 0.4, 0, siRelative, siView, siObj, siXYZ);
				MakeLocal(Scaling_null_0+".display", siNodePropagation);
				SetValue(Scaling_null_0+".display.wirecolorr", 0.125);
				SetValue(Scaling_null_0+".display.wirecolorg", 0.878);
				SetValue(Scaling_null_0+".display.wirecolorb", 0.125);
				ParentObj(Model, [Scaling,Scaling_null_0]);

				var Invert_offset_sho = DuplicateSymmetry(OffSet,false, null, 1, 0, 0, 0, null);
				Invert_offset_sho(0).name = "r_shoulder_offset";
				var Invert_Create_Icon = DuplicateSymmetry(Create_Icon,false, null, 1, 0, 0, 0, null);
				ParentObj(Invert_offset_sho(0), Invert_Create_Icon(0));
				ParentObj(Model, Invert_offset_sho(0));
				Invert_Create_Icon(0).name = "r_shoulder";
				MakeLocal(Invert_Create_Icon(0)+".display", siNodePropagation);
				SetValue(Invert_Create_Icon(0)+".display.wirecolorr", 0, null);
				SetValue(Invert_Create_Icon(0)+".display.wirecolorg", 0.125, null);
				SetValue(Invert_Create_Icon(0)+".display.wirecolorb", 0.627, null);

				var Invert_Scaling = GetPrim("Null","r_arm_scaling");
				var Invert_Scaling_null_0 = Arrow( );
				Invert_Scaling_null_0.name = "r_arm_scaling0";				
				MatchTransform([Invert_Scaling,Invert_Scaling_null_0], Bone_Model+".r_shoulder", siTrn, null);
				SetValue(Invert_Scaling+".null.size", 0.1);
				var Invert_Scaling_null_0_Point = SelectGeometryComponents(Invert_Scaling_null_0+".pnt[*]");
				Rotate(Invert_Scaling_null_0_Point, 90, 0, 0, siRelative, siGlobal, siObj, siXYZ);
				Rotate(Invert_Scaling_null_0_Point, 0, 90, 0, siRelative, siGlobal, siObj, siXYZ);
				Scale(Invert_Scaling_null_0_Point, 0.25, 0.25, 0.25, siRelative, siLocal, siObj, siXYZ);
				Translate(Invert_Scaling_null_0_Point, -2.76, 0.4, 0, siRelative, siView, siObj, siXYZ);
				MakeLocal(Invert_Scaling_null_0+".display", siNodePropagation);
				SetValue(Invert_Scaling_null_0+".display.wirecolorr", 0.125);
				SetValue(Invert_Scaling_null_0+".display.wirecolorg", 0.878);
				SetValue(Invert_Scaling_null_0+".display.wirecolorb", 0.125);
				ParentObj(Model, [Invert_Scaling,Invert_Scaling_null_0]);
				oHako.add(Invert_Scaling_null_0);
				oHako.add(Invert_Scaling);
				oHako.add(Invert_offset_sho(0));
				oHako.add(Invert_Create_Icon(0));
				oHako.add(Scaling_null_0);
				oHako.add(OffSet);
				oHako.add(Scaling);
				oHako.add(Create_Icon);
			break;
			case "r_ankle":
				var r_ankle_bone = oSel(i);
				var Invert_Create_Icon_ankle = Sphere( );
				Invert_Create_Icon_ankle.name = "r_foot_All";
				var Invert_Joint = GetPrim("Null","r_ik_joint");
				MatchTransform(Invert_Create_Icon_ankle, oSel(i), siTrn, null);
				MatchTransform(Invert_Joint, oSel(i), siTrn, null);
				MatchTransform(Invert_Joint, oSel(i), siRot, null);
				ParentObj(Invert_Create_Icon_ankle, Invert_Joint);
				ParentObj(Rot, Invert_Create_Icon_ankle);
				MakeLocal(Invert_Create_Icon_ankle+".display", siNodePropagation);
				SetValue(Invert_Create_Icon_ankle+".display.wirecolorr", 0.878, null);
				SetValue(Invert_Create_Icon_ankle+".display.wirecolorg", 0.753, null);
				SetValue(Invert_Create_Icon_ankle+".display.wirecolorb", 0.251, null);
				var Invert_Foot_Scaling_null_3 = Arrow( );
				Invert_Foot_Scaling_null_3.name = "r_foot_scaling3";				
				MatchTransform(Invert_Foot_Scaling_null_3, oSel(i), siTrn, null);
				var Invert_Foot_Scaling_null_3_Point = SelectGeometryComponents(Invert_Foot_Scaling_null_3+".pnt[*]");
				Rotate(Invert_Foot_Scaling_null_3_Point, 90, 0, 0, siRelative, siGlobal, siObj, siXYZ);
				Rotate(Invert_Foot_Scaling_null_3_Point, 0, 90, 0, siRelative, siGlobal, siObj, siXYZ);
				Scale(Invert_Foot_Scaling_null_3_Point, 0.9, 0.9, 0.9, siRelative, siLocal, siObj, siXYZ);
				Translate(Invert_Foot_Scaling_null_3_Point, -2.6, 0.5, 0, siRelative, siView, siObj, siXYZ);
				MakeLocal(Invert_Foot_Scaling_null_3+".display", siNodePropagation);
				SetValue(Invert_Foot_Scaling_null_3+".display.wirecolorr", 0.878);
				SetValue(Invert_Foot_Scaling_null_3+".display.wirecolorg", 0.251);
				SetValue(Invert_Foot_Scaling_null_3+".display.wirecolorb", 0.627);
				ParentObj(Model, Invert_Foot_Scaling_null_3);
				oHako.add(Invert_Foot_Scaling_null_3);
			break;
			case "l_ankle":
				var l_ankle_bone = oSel(i);
				var Create_Icon_ankle = Sphere( );
				Create_Icon_ankle.name = "l_foot_All";
				var Joint = GetPrim("Null","l_ik_joint");
				SetValue(Joint+".null.size", 0.1);
				MatchTransform(Create_Icon_ankle, oSel(i), siTrn, null);
				MatchTransform(Joint, oSel(i), siTrn, null);
				ParentObj(Create_Icon_ankle, Joint);
				ParentObj(Rot, Create_Icon_ankle);
				MakeLocal(Create_Icon_ankle+".display", siNodePropagation);
				SetValue(Create_Icon_ankle+".display.wirecolorr", 0.878, null);
				SetValue(Create_Icon_ankle+".display.wirecolorg", 0.753, null);
				SetValue(Create_Icon_ankle+".display.wirecolorb", 0.251, null);
				oHako_Bone_Foot.add(oSel(i));
				var Foot_Scaling_null_3 = Arrow( );
				Foot_Scaling_null_3.name = "l_foot_scaling3";				
				MatchTransform(Foot_Scaling_null_3, oSel(i), siTrn, null);
				var Foot_Scaling_null_3_Point = SelectGeometryComponents(Foot_Scaling_null_3+".pnt[*]");
				Rotate(Foot_Scaling_null_3_Point, 90, 0, 0, siRelative, siGlobal, siObj, siXYZ);
				Rotate(Foot_Scaling_null_3_Point, 0, 90, 0, siRelative, siGlobal, siObj, siXYZ);
				Scale(Foot_Scaling_null_3_Point, 0.9, 0.9, 0.9, siRelative, siLocal, siObj, siXYZ);
				Translate(Foot_Scaling_null_3_Point, 2.6, 0.5, 0, siRelative, siView, siObj, siXYZ);
				MakeLocal(Foot_Scaling_null_3+".display", siNodePropagation);
				SetValue(Foot_Scaling_null_3+".display.wirecolorr", 0.878);
				SetValue(Foot_Scaling_null_3+".display.wirecolorg", 0.251);
				SetValue(Foot_Scaling_null_3+".display.wirecolorb", 0.627);
				ParentObj(Model, Foot_Scaling_null_3);
				oHako.add(Foot_Scaling_null_3);				
			break;
			case "l_leg1":
						var l_foot_bone1_cons = oSel(i);
						oHako_Bone_Foot.add(oSel(i));
						var Foot_Scaling_null_0 = Arrow( );
						Foot_Scaling_null_0.name = "l_foot_scaling0";				
						MatchTransform(Foot_Scaling_null_0, oSel(i), siTrn, null);
						var Foot_Scaling_null_0_Point = SelectGeometryComponents(Foot_Scaling_null_0+".pnt[*]");
						Rotate(Foot_Scaling_null_0_Point, 90, 0, 0, siRelative, siGlobal, siObj, siXYZ);
						Rotate(Foot_Scaling_null_0_Point, 0, 90, 0, siRelative, siGlobal, siObj, siXYZ);
						Scale(Foot_Scaling_null_0_Point, 0.75, 0.75, 0.75, siRelative, siLocal, siObj, siXYZ);
						Translate(Foot_Scaling_null_0_Point, 2.6, 0.4, 0, siRelative, siView, siObj, siXYZ);
						MakeLocal(Foot_Scaling_null_0+".display", siNodePropagation);
						SetValue(Foot_Scaling_null_0+".display.wirecolorr", 0.878);
						SetValue(Foot_Scaling_null_0+".display.wirecolorg", 0.251);
						SetValue(Foot_Scaling_null_0+".display.wirecolorb", 0.627);
						ParentObj(Model, Foot_Scaling_null_0);
						oHako.add(Foot_Scaling_null_0);
			break;
			case "r_leg1":
						var Invert_Foot_Scaling_null_0 = Arrow( );
						Invert_Foot_Scaling_null_0.name = "r_foot_scaling0";
						MatchTransform(Invert_Foot_Scaling_null_0, oSel(i), siTrn, null);
						var Invert_Foot_Scaling_null_0_Point = SelectGeometryComponents(Invert_Foot_Scaling_null_0+".pnt[*]");
						Rotate(Invert_Foot_Scaling_null_0_Point, 90, 0, 0, siRelative, siGlobal, siObj, siXYZ);
						Rotate(Invert_Foot_Scaling_null_0_Point, 0, 90, 0, siRelative, siGlobal, siObj, siXYZ);
						Scale(Invert_Foot_Scaling_null_0_Point, 0.75, 0.75, 0.75, siRelative, siLocal, siObj, siXYZ);
						Translate(Invert_Foot_Scaling_null_0_Point, -2.6, 0.4, 0, siRelative, siView, siObj, siXYZ);
						MakeLocal(Invert_Foot_Scaling_null_0+".display", siNodePropagation);
						SetValue(Invert_Foot_Scaling_null_0+".display.wirecolorr", 0.878);
						SetValue(Invert_Foot_Scaling_null_0+".display.wirecolorg", 0.251);
						SetValue(Invert_Foot_Scaling_null_0+".display.wirecolorb", 0.627);
						ParentObj(Model, Invert_Foot_Scaling_null_0);
						oHako.add(Invert_Foot_Scaling_null_0);
			break;
			case "l_knee":
						var l_foot_bone2_cons = oSel(i);
						oHako_Bone_Foot.add(oSel(i));
						var Foot_Scaling_null_1 = Arrow( );
						Foot_Scaling_null_1.name = "l_foot_scaling1";				
						MatchTransform(Foot_Scaling_null_1, oSel(i), siTrn, null);
						var Foot_Scaling_null_1_Point = SelectGeometryComponents(Foot_Scaling_null_1+".pnt[*]");
						Rotate(Foot_Scaling_null_1_Point, 90, 0, 0, siRelative, siGlobal, siObj, siXYZ);
						Rotate(Foot_Scaling_null_1_Point, 0, 90, 0, siRelative, siGlobal, siObj, siXYZ);
						Scale(Foot_Scaling_null_1_Point, 0.6, 0.6, 0.6, siRelative, siLocal, siObj, siXYZ);
						Translate(Foot_Scaling_null_1_Point, 2.6, 0.3, 0, siRelative, siView, siObj, siXYZ);
						MakeLocal(Foot_Scaling_null_1+".display", siNodePropagation);
						SetValue(Foot_Scaling_null_1+".display.wirecolorr", 0.878);
						SetValue(Foot_Scaling_null_1+".display.wirecolorg", 0.251);
						SetValue(Foot_Scaling_null_1+".display.wirecolorb", 0.627);
						ParentObj(Model, Foot_Scaling_null_1);
						oHako.add(Foot_Scaling_null_1);						
			break;
			case "r_knee":
						var Invert_Foot_Scaling_null_1 = Arrow( );
						Invert_Foot_Scaling_null_1.name = "r_foot_scaling1";
						MatchTransform(Invert_Foot_Scaling_null_1, oSel(i), siTrn, null);
						var Invert_Foot_Scaling_null_1_Point = SelectGeometryComponents(Invert_Foot_Scaling_null_1+".pnt[*]");
						Rotate(Invert_Foot_Scaling_null_1_Point, 90, 0, 0, siRelative, siGlobal, siObj, siXYZ);
						Rotate(Invert_Foot_Scaling_null_1_Point, 0, 90, 0, siRelative, siGlobal, siObj, siXYZ);
						Scale(Invert_Foot_Scaling_null_1_Point, 0.6, 0.6, 0.6, siRelative, siLocal, siObj, siXYZ);
						Translate(Invert_Foot_Scaling_null_1_Point, -2.6, 0.3, 0, siRelative, siView, siObj, siXYZ);
						MakeLocal(Invert_Foot_Scaling_null_1+".display", siNodePropagation);
						SetValue(Invert_Foot_Scaling_null_1+".display.wirecolorr", 0.878);
						SetValue(Invert_Foot_Scaling_null_1+".display.wirecolorg", 0.251);
						SetValue(Invert_Foot_Scaling_null_1+".display.wirecolorb", 0.627);
						ParentObj(Model, Invert_Foot_Scaling_null_1);
						oHako.add(Invert_Foot_Scaling_null_1);
			break;
			case "l_leg2":
						var l_foot_bone3_cons = oSel(i);
						oHako_Bone_Foot.add(oSel(i));
						var Foot_Scaling_null_2 = Arrow( );
						Foot_Scaling_null_2.name = "l_foot_scaling2";				
						MatchTransform(Foot_Scaling_null_2, oSel(i), siTrn, null);
						var Foot_Scaling_null_2_Point = SelectGeometryComponents(Foot_Scaling_null_2+".pnt[*]");
						Rotate(Foot_Scaling_null_2_Point, 90, 0, 0, siRelative, siGlobal, siObj, siXYZ);
						Rotate(Foot_Scaling_null_2_Point, 0, 90, 0, siRelative, siGlobal, siObj, siXYZ);
						Scale(Foot_Scaling_null_2_Point, 0.55, 0.55, 0.55, siRelative, siLocal, siObj, siXYZ);
						Translate(Foot_Scaling_null_2_Point, 2.6, -0.2, 0, siRelative, siView, siObj, siXYZ);
						MakeLocal(Foot_Scaling_null_2+".display", siNodePropagation);
						SetValue(Foot_Scaling_null_2+".display.wirecolorr", 0.878);
						SetValue(Foot_Scaling_null_2+".display.wirecolorg", 0.251);
						SetValue(Foot_Scaling_null_2+".display.wirecolorb", 0.627);
						ParentObj(Model, Foot_Scaling_null_2);
						oHako.add(Foot_Scaling_null_2);					
			break;
			case "r_leg2":
						var Invert_Foot_Scaling_null_2 = Arrow( );
						Invert_Foot_Scaling_null_2.name = "r_foot_scaling2";
						MatchTransform(Invert_Foot_Scaling_null_2, oSel(i), siTrn, null);
						var Invert_Foot_Scaling_null_2_Point = SelectGeometryComponents(Invert_Foot_Scaling_null_2+".pnt[*]");
						Rotate(Invert_Foot_Scaling_null_2_Point, 90, 0, 0, siRelative, siGlobal, siObj, siXYZ);
						Rotate(Invert_Foot_Scaling_null_2_Point, 0, 90, 0, siRelative, siGlobal, siObj, siXYZ);
						Scale(Invert_Foot_Scaling_null_2_Point, 0.55, 0.55, 0.55, siRelative, siLocal, siObj, siXYZ);
						Translate(Invert_Foot_Scaling_null_2_Point, -2.6, -0.2, 0, siRelative, siView, siObj, siXYZ);
						MakeLocal(Invert_Foot_Scaling_null_2+".display", siNodePropagation);
						SetValue(Invert_Foot_Scaling_null_2+".display.wirecolorr", 0.878);
						SetValue(Invert_Foot_Scaling_null_2+".display.wirecolorg", 0.251);
						SetValue(Invert_Foot_Scaling_null_2+".display.wirecolorb", 0.627);
						ParentObj(Model, Invert_Foot_Scaling_null_2);
						oHako.add(Invert_Foot_Scaling_null_2);
			break;
			case "l_hand":
						var Create_l_hand = Sphere( );
						Create_l_hand.name = "l_hand_tra";
						var Create_Icon_Rot = Box( );
						Create_Icon_Rot.name = "l_hand_rot";
						var OffSet_handrot = GetPrim("Null","l_hand_rot_offset");
						var Wepon = GetPrim("Null","l_hand_wep");
						SetValue(OffSet_handrot+".null.size", 0.1);
						SetValue(Wepon+".null.size", 0.1);
						var Invert_Create_l_hand = Sphere( );
						Invert_Create_l_hand.name = "r_hand_tra";
						MakeLocal(Invert_Create_l_hand+".display", siNodePropagation);
						SetValue(Invert_Create_l_hand+".display.wirecolorr", 0, null);
						SetValue(Invert_Create_l_hand+".display.wirecolorg", 0.125, null);
						SetValue(Invert_Create_l_hand+".display.wirecolorb", 0.627, null);
						var Invert_Create_Icon_Point = SelectGeometryComponents(Invert_Create_l_hand+".pnt[(0,0),(0,1),(0,2),(0,3),(0,4),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(2,3),(2,4),(2,5),(2,6),(3,0),(3,1),(3,2),(3,3),(3,4),(4,0),(4,1),(4,2),(4,3),(4,4),(4,5),(4,6),(5,0),(5,1),(5,2),(5,3),(5,4),(5,5),(5,6),(5,7),(5,8),(6,0),(6,1),(6,2),(6,3),(6,4),(6,5),(6,6),(6,7),(6,8),(6,9)]");
						Scale(Invert_Create_Icon_Point, 0.74, 0.74, 0.74, siRelative, siGlobal, siObj, siXYZ);
						var Invert_Create_Icon_Rot = DuplicateSymmetry(Create_Icon_Rot, false, null, 1, 0, 0, 0, null);
						Invert_Create_Icon_Rot(0).name = "r_hand_rot";
						var Invert_OffSet_handrot = DuplicateSymmetry(OffSet_handrot,false, null, 1, 0, 0, 0, false);
						Invert_OffSet_handrot(0).name = "r_hand_rot_offset";
						var Invert_Wepon = DuplicateSymmetry(Wepon, false, null, 1, 0, 0, 0, null);
						Invert_Wepon(0).name = "r_hand_wep";
						SetValue(Invert_OffSet_handrot+".null.size", 0.1);
						MatchTransform(Create_l_hand, oSel(i), siTrn, null);
						MatchTransform(Create_l_hand, oSel(i), siTrn, null);
						MatchTransform(Create_Icon_Rot, oSel(i), siTrn, null);
						MatchTransform(OffSet_handrot, oSel(i), siTrn, null);
						MatchTransform(Wepon, oSel(i), siTrn, null);
						ParentObj(Create_Icon_Rot, Wepon);
						ParentObj(OffSet_handrot, Create_Icon_Rot);
						ParentObj(Create_l_hand , OffSet_handrot);
						ParentObj(Model, Create_l_hand);
						var POS = GetPrim("Null", null, null, null);
						MatchTransform(POS, oSel(i), siTrn, null);
						var Invert_POS = DuplicateSymmetry(Wepon, false, null, 1, 0, 0, 0, null);
						MatchTransform(Invert_Create_l_hand,  Invert_POS(0), siTrn, null);
						MatchTransform(Invert_Create_Icon_Rot, Invert_POS(0), siTrn, null);
						MatchTransform(Invert_OffSet_handrot, Invert_POS(0), siTrn, null);
						MatchTransform(Invert_Wepon, Invert_POS(0), siTrn, null);
						ParentObj(Invert_Create_Icon_Rot, Invert_Wepon);
						ParentObj(Invert_OffSet_handrot, Invert_Create_Icon_Rot);
						ParentObj(Invert_Create_l_hand , Invert_OffSet_handrot);
						ParentObj(Model, Invert_Create_l_hand);
						var Create_Icon_Point = SelectGeometryComponents(Create_l_hand+".pnt[(0,0),(0,1),(0,2),(0,3),(0,4),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(2,3),(2,4),(2,5),(2,6),(3,0),(3,1),(3,2),(3,3),(3,4),(4,0),(4,1),(4,2),(4,3),(4,4),(4,5),(4,6),(5,0),(5,1),(5,2),(5,3),(5,4),(5,5),(5,6),(5,7),(5,8),(6,0),(6,1),(6,2),(6,3),(6,4),(6,5),(6,6),(6,7),(6,8),(6,9)]");
						Scale(Create_Icon_Point, 0.74, 0.74, 0.74, siRelative, siGlobal, siObj, siXYZ);
						MakeLocal(Create_l_hand+".display", siNodePropagation);
						SetValue(Create_l_hand+".display.wirecolorr", 0.878, null);
						SetValue(Create_l_hand+".display.wirecolorg", 0.251, null);
						SetValue(Create_l_hand+".display.wirecolorb", 0, null);
						var Create_Icon_Rot_Point = SelectGeometryComponents(Create_Icon_Rot+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
						Scale(Create_Icon_Rot_Point, 0.67, 0.67, 0.67, siRelative, siGlobal, siObj, siXYZ);
						MakeLocal(Create_Icon_Rot+".display", siNodePropagation);
						SetValue(Create_Icon_Rot+".display.wirecolorr", 0.878, null);
						SetValue(Create_Icon_Rot+".display.wirecolorg", 0.753, null);
						SetValue(Create_Icon_Rot+".display.wirecolorb", 0.251, null);
						var sholder_offset = GetPrim("Null","l_sholder_offset_parm");
						SetValue(sholder_offset+".null.size", 0.1);
						var offset_const = GetPrim("Null","l_hund_const");
						SetValue(offset_const+".null.size", 0.1);
						MatchTransform(sholder_offset, oSel(i), siTrn, null);
						MatchTransform(offset_const, oSel(i), siTrn, null);
						ParentObj(sholder_offset , offset_const);
						ParentObj(Model , sholder_offset);
						var Create_l_hand_wep = Box( );
						Create_l_hand_wep.name = "l_hand_sword_joint";
						MatchTransform(Create_l_hand_wep, oSel(i), siTrn, null);
						ParentObj(Wepon,Create_l_hand_wep);
						var Create_Icon_Wep_Point = SelectGeometryComponents(Create_l_hand_wep+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
						Scale(Create_Icon_Wep_Point, 0.2, 0.2, 0.8, siRelative, siGlobal, siObj, siXYZ);
						MakeLocal(Create_l_hand_wep+".display", siNodePropagation);
						SetValue(Create_l_hand_wep+".display.wirecolorr", 0.376, null);
						SetValue(Create_l_hand_wep+".display.wirecolorg", 0, null);
						SetValue(Create_l_hand_wep+".display.wirecolorb", 0.251, null);
						var Scaling_null_4 =Arrow( );
						Scaling_null_4.name = "l_arm_scaling4";	
						MatchTransform(Scaling_null_4, oSel(i), siTrn, null);
						var Scaling_null_4_Point = SelectGeometryComponents(Scaling_null_4+".pnt[*]");
						Rotate(Scaling_null_4_Point, 90, 0, 0, siRelative, siGlobal, siObj, siXYZ);
						Rotate(Scaling_null_4_Point, 0, 90, 0, siRelative, siGlobal, siObj, siXYZ);
						Scale(Scaling_null_4_Point, 0.7, 0.7, 0.7, siRelative, siLocal, siObj, siXYZ);
						Translate(Scaling_null_4_Point, 2.76, 0, 0, siRelative, siView, siObj, siXYZ);
						MakeLocal(Scaling_null_4+".display", siNodePropagation);
						SetValue(Scaling_null_4+".display.wirecolorr", 0.125);
						SetValue(Scaling_null_4+".display.wirecolorg", 0.878);
						SetValue(Scaling_null_4+".display.wirecolorb", 0.125);
						ParentObj(Model,Scaling_null_4);
						var Invert_sholder_offset = GetPrim("Null","r_sholder_offset_parm");
						SetValue(Invert_sholder_offset+".null.size", 0.1);
						var Invert_offset_const = GetPrim("Null","r_hund_const");
						SetValue(Invert_offset_const+".null.size", 0.1);
						MatchTransform(Invert_sholder_offset, Invert_POS(0), siTrn, null);
						MatchTransform(Invert_offset_const, Invert_POS(0), siTrn, null);
						ParentObj(Invert_sholder_offset , Invert_offset_const);
						ParentObj(Model , Invert_sholder_offset);
						var Invert_Create_l_hand_wep = Box( );
						Invert_Create_l_hand_wep.name = "r_hand_sword_joint";
						MatchTransform(Invert_Create_l_hand_wep, Invert_POS(0), siTrn, null);
						var Invert_Create_Icon_Wep_Point = SelectGeometryComponents(Invert_Create_l_hand_wep+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
						Scale(Invert_Create_Icon_Wep_Point, 0.2, 0.2, 0.8, siRelative, siGlobal, siObj, siXYZ);
						MakeLocal(Invert_Create_l_hand_wep+".display", siNodePropagation);
						SetValue(Invert_Create_l_hand_wep+".display.wirecolorr", 0.376, null);
						SetValue(Invert_Create_l_hand_wep+".display.wirecolorg", 0, null);
						SetValue(Invert_Create_l_hand_wep+".display.wirecolorb", 0.251, null);
						ParentObj(Invert_Wepon,Invert_Create_l_hand_wep);
						var Invert_Create_Icon_Rot_Point = SelectGeometryComponents(Invert_Create_Icon_Rot+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
						Scale(Invert_Create_Icon_Rot_Point, 0.67, 0.67, 0.67, siRelative, siGlobal, siObj, siXYZ);
						MakeLocal(Invert_Create_Icon_Rot+".display", siNodePropagation);
						SetValue(Invert_Create_Icon_Rot+".display.wirecolorr", 0.878, null);
						SetValue(Invert_Create_Icon_Rot+".display.wirecolorg", 0.753, null);
						SetValue(Invert_Create_Icon_Rot+".display.wirecolorb", 0.251, null);
						var Invert_Scaling_null_4 = Arrow( );
						Invert_Scaling_null_4.name = "r_arm_scaling4";	
						MatchTransform(Invert_Scaling_null_4, Invert_POS(0), siTrn, null);
						var Invert_Scaling_null_4_Point = SelectGeometryComponents(Invert_Scaling_null_4+".pnt[*]");
						Rotate(Invert_Scaling_null_4_Point, 90, 0, 0, siRelative, siGlobal, siObj, siXYZ);
						Rotate(Invert_Scaling_null_4_Point, 0, 90, 0, siRelative, siGlobal, siObj, siXYZ);
						Scale(Invert_Scaling_null_4_Point, 0.7, 0.7, 0.7, siRelative, siLocal, siObj, siXYZ);
						Translate(Invert_Scaling_null_4_Point, -2.76, 0, 0, siRelative, siView, siObj, siXYZ);
						MakeLocal(Invert_Scaling_null_4+".display", siNodePropagation);
						SetValue(Invert_Scaling_null_4+".display.wirecolorr", 0.125);
						SetValue(Invert_Scaling_null_4+".display.wirecolorg", 0.878);
						SetValue(Invert_Scaling_null_4+".display.wirecolorb", 0.125);			
						ParentObj(Model,Invert_Scaling_null_4);
						oHako.add(Invert_Scaling_null_4);
						oHako.add(Invert_Create_l_hand);
						oHako.add(Invert_sholder_offset);
						oHako.add(Scaling_null_4);
						oHako.add(Create_l_hand);
						oHako.add(sholder_offset);
						oHako_Bone.add(oSel(i));
						DeleteObj([POS,Invert_POS]);
			break;
			case "r_hand":
			break;
			case "l_arm1":
						var l_arm_bone1_cons = oSel(i);
						oHako_Bone.add(oSel(i));
						var Scaling_null_1 =Arrow( );
						Scaling_null_1.name = "l_arm_scaling1";	
						MatchTransform(Scaling_null_1, oSel(i), siTrn, null);
						var Scaling_null_1_Point = SelectGeometryComponents(Scaling_null_1+".pnt[*]");
						Rotate(Scaling_null_1_Point, 90, 0, 0, siRelative, siGlobal, siObj, siXYZ);
						Rotate(Scaling_null_1_Point, 0, 90, 0, siRelative, siGlobal, siObj, siXYZ);
						Scale(Scaling_null_1_Point, 0.28, 0.28, 0.28, siRelative, siLocal, siObj, siXYZ);
						Translate(Scaling_null_1_Point, 2.76, -0.2, 0, siRelative, siView, siObj, siXYZ);
						MakeLocal(Scaling_null_1+".display", siNodePropagation);
						SetValue(Scaling_null_1+".display.wirecolorr", 0.125);
						SetValue(Scaling_null_1+".display.wirecolorg", 0.878);
						SetValue(Scaling_null_1+".display.wirecolorb", 0.125);										
						oHako.add(Scaling_null_1);
			break;
			case "r_arm1":
						var Invert_l_arm_bone1_cons = oSel(i);
						var Invert_Scaling_null_1 = Arrow( );
						Invert_Scaling_null_1.name = "r_arm_scaling1";	
						MatchTransform(Invert_Scaling_null_1, oSel(i), siTrn, null);
						var Invert_Scaling_null_1_Point = SelectGeometryComponents(Invert_Scaling_null_1+".pnt[*]");
						Rotate(Invert_Scaling_null_1_Point, 90, 0, 0, siRelative, siGlobal, siObj, siXYZ);
						Rotate(Invert_Scaling_null_1_Point, 0, 90, 0, siRelative, siGlobal, siObj, siXYZ);
						Scale(Invert_Scaling_null_1_Point, 0.28, 0.28, 0.28, siRelative, siLocal, siObj, siXYZ);
						Translate(Invert_Scaling_null_1_Point, -2.76, -0.2, 0, siRelative, siView, siObj, siXYZ);
						MakeLocal(Invert_Scaling_null_1+".display", siNodePropagation);
						SetValue(Invert_Scaling_null_1+".display.wirecolorr", 0.125);
						SetValue(Invert_Scaling_null_1+".display.wirecolorg", 0.878);
						SetValue(Invert_Scaling_null_1+".display.wirecolorb", 0.125);						
						oHako.add(Invert_Scaling_null_1);
			break;
			case "l_elbow":
						var l_arm_bone2_cons = oSel(i);
						oHako_Bone.add(oSel(i));
						var Scaling_null_2 =Arrow( );
						Scaling_null_2.name = "l_arm_scaling2";
						MatchTransform(Scaling_null_2, oSel(i), siTrn, null);
						var Scaling_null_2_Point = SelectGeometryComponents(Scaling_null_2+".pnt[*]");
						Rotate(Scaling_null_2_Point, 90, 0, 0, siRelative, siGlobal, siObj, siXYZ);
						Rotate(Scaling_null_2_Point, 0, 90, 0, siRelative, siGlobal, siObj, siXYZ);
						Scale(Scaling_null_2_Point, 0.2, 0.2, 0.2, siRelative, siLocal, siObj, siXYZ);
						Translate(Scaling_null_2_Point, 2.76, 0.2, 0, siRelative, siView, siObj, siXYZ);
						MakeLocal(Scaling_null_2+".display", siNodePropagation);
						SetValue(Scaling_null_2+".display.wirecolorr", 0.125);
						SetValue(Scaling_null_2+".display.wirecolorg", 0.878);
						SetValue(Scaling_null_2+".display.wirecolorb", 0.125);
						oHako.add(Scaling_null_2);
			break;
			case "r_elbow":
						var Invert_l_arm_bone2_cons = oSel(i);
						var Invert_Scaling_null_2 =Arrow( );
						Invert_Scaling_null_2.name = "r_arm_scaling2";
						MatchTransform(Invert_Scaling_null_2, oSel(i), siTrn, null);
						var Invert_Scaling_null_2_Point = SelectGeometryComponents(Invert_Scaling_null_2+".pnt[*]");
						Rotate(Invert_Scaling_null_2_Point, 90, 0, 0, siRelative, siGlobal, siObj, siXYZ);
						Rotate(Invert_Scaling_null_2_Point, 0, 90, 0, siRelative, siGlobal, siObj, siXYZ);
						Scale(Invert_Scaling_null_2_Point, 0.2, 0.2, 0.2, siRelative, siLocal, siObj, siXYZ);
						Translate(Invert_Scaling_null_2_Point, -2.76, 0.2, 0, siRelative, siView, siObj, siXYZ);
						MakeLocal(Invert_Scaling_null_2+".display", siNodePropagation);
						SetValue(Invert_Scaling_null_2+".display.wirecolorr", 0.125);
						SetValue(Invert_Scaling_null_2+".display.wirecolorg", 0.878);
						SetValue(Invert_Scaling_null_2+".display.wirecolorb", 0.125);						
						oHako.add(Invert_Scaling_null_2);
			break;			
			case "l_arm2":
						var l_arm_bone3_cons = oSel(i);
						oHako_Bone.add(oSel(i));
						var Scaling_null_3 =Arrow( );
						Scaling_null_3.name = "l_arm_scaling3";	
						MatchTransform(Scaling_null_3, oSel(i), siTrn, null);
						var Scaling_null_3_Point = SelectGeometryComponents(Scaling_null_3+".pnt[*]");
						Rotate(Scaling_null_3_Point, 90, 0, 0, siRelative, siGlobal, siObj, siXYZ);
						Rotate(Scaling_null_3_Point, 0, 90, 0, siRelative, siGlobal, siObj, siXYZ);
						Scale(Scaling_null_3_Point, 0.2, 0.2, 0.2, siRelative, siLocal, siObj, siXYZ);
						Translate(Scaling_null_3_Point, 2.76, -0.3, 0, siRelative, siView, siObj, siXYZ);
						MakeLocal(Scaling_null_3+".display", siNodePropagation);
						SetValue(Scaling_null_3+".display.wirecolorr", 0.125);
						SetValue(Scaling_null_3+".display.wirecolorg", 0.878);
						SetValue(Scaling_null_3+".display.wirecolorb", 0.125);												
						oHako.add(Scaling_null_3);
			break;
			case "r_arm2":
						var Invert_Scaling_null_3 =Arrow( );
						var Invert_l_arm_bone3_cons = oSel(i);
						Invert_Scaling_null_3.name = "r_arm_scaling3";	
						MatchTransform(Invert_Scaling_null_3, oSel(i), siTrn, null);
						var Invert_Scaling_null_3_Point = SelectGeometryComponents(Invert_Scaling_null_3+".pnt[*]");
						Rotate(Invert_Scaling_null_3_Point, 90, 0, 0, siRelative, siGlobal, siObj, siXYZ);
						Rotate(Invert_Scaling_null_3_Point, 0, 90, 0, siRelative, siGlobal, siObj, siXYZ);
						Scale(Invert_Scaling_null_3_Point, 0.2, 0.2, 0.2, siRelative, siLocal, siObj, siXYZ);
						Translate(Invert_Scaling_null_3_Point, -2.76, -0.3, 0, siRelative, siView, siObj, siXYZ);
						MakeLocal(Invert_Scaling_null_3+".display", siNodePropagation);
						SetValue(Invert_Scaling_null_3+".display.wirecolorr", 0.125);
						SetValue(Invert_Scaling_null_3+".display.wirecolorg", 0.878);
						SetValue(Invert_Scaling_null_3+".display.wirecolorb", 0.125);						
						oHako.add(Invert_Scaling_null_3);
			break;
			case "l_finger_a1":
				var Create_l_finger_a1 = Box( );
				Create_l_finger_a1.name = "l_finger_a1";
				MatchTransform(Create_l_finger_a1, oSel(i), siTrn, null);
				ParentObj(Model, Create_l_finger_a1);
				MakeLocal(Create_l_finger_a1+".display", siNodePropagation);
				SetValue(Create_l_finger_a1+".display.wirecolorr", 0.125, null);
				SetValue(Create_l_finger_a1+".display.wirecolorg", 0.878, null);
				SetValue(Create_l_finger_a1+".display.wirecolorb", 0.125, null);
				var Create_Icon_Point = SelectGeometryComponents(Create_l_finger_a1+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Create_Icon_Point, 0.14, 0.3, 0.12, siRelative, siGlobal, siObj, siXYZ);
				Rotate(Create_l_finger_a1, 0, -90, 0, siRelative, siLocal, siObj, siXYZ);
				var Invert_Create_l_finger_a1 = DuplicateSymmetry(Create_l_finger_a1, false, null, 1, 0, 0, 0, null);
				Invert_Create_l_finger_a1(0).name = "r_finger_a1";
				ParentObj(Model, Invert_Create_l_finger_a1);
				oHako.add(Create_l_finger_a1);oHako.add(Invert_Create_l_finger_a1(0));
				ApplyCns("Orientation", Bone_Model+".l_finger_a1", Create_l_finger_a1, true);
				ApplyCns("Orientation", Bone_Model+".r_finger_a1", Invert_Create_l_finger_a1(0), true);
			break;
			case "l_finger_a2":
				var Create_l_finger_a2 = Box( );
				Create_l_finger_a2.name = "l_finger_a2";
				MatchTransform(Create_l_finger_a2, oSel(i), siTrn, null);
				ParentObj(Model, Create_l_finger_a2);
				MakeLocal(Create_l_finger_a2+".display", siNodePropagation);
				SetValue(Create_l_finger_a2+".display.wirecolorr", 0.125, null);
				SetValue(Create_l_finger_a2+".display.wirecolorg", 0.878, null);
				SetValue(Create_l_finger_a2+".display.wirecolorb", 0.125, null);
				var Create_Icon_Point = SelectGeometryComponents(Create_l_finger_a2+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Create_Icon_Point, 0.14, 0.3, 0.12, siRelative, siGlobal, siObj, siXYZ);
				Rotate(Create_l_finger_a2, 0, -90, 0, siRelative, siLocal, siObj, siXYZ);
				var Invert_Create_l_finger_a2 = DuplicateSymmetry(Create_l_finger_a2, false, null, 1, 0, 0, 0, null);
				Invert_Create_l_finger_a2(0).name = "r_finger_a2";
				ParentObj(Model, Invert_Create_l_finger_a2);
				oHako.add(Create_l_finger_a2);oHako.add(Invert_Create_l_finger_a2(0));
				ApplyCns("Orientation", Bone_Model+".l_finger_a2", Create_l_finger_a2, true);
				ApplyCns("Orientation", Bone_Model+".r_finger_a2", Invert_Create_l_finger_a2, true);
			break;
			case "l_finger_a3":
				var Create_l_finger_a3 = Box( );
				Create_l_finger_a3.name = "l_finger_a3";
				MatchTransform(Create_l_finger_a3, oSel(i), siTrn, null);
				ParentObj(Model, Create_l_finger_a3);
				MakeLocal(Create_l_finger_a3+".display", siNodePropagation);
				SetValue(Create_l_finger_a3+".display.wirecolorr", 0.125, null);
				SetValue(Create_l_finger_a3+".display.wirecolorg", 0.878, null);
				SetValue(Create_l_finger_a3+".display.wirecolorb", 0.125, null);
				var Create_Icon_Point = SelectGeometryComponents(Create_l_finger_a3+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Create_Icon_Point, 0.14, 0.3, 0.12, siRelative, siGlobal, siObj, siXYZ);
				Rotate(Create_l_finger_a3, 0, -90, 0, siRelative, siLocal, siObj, siXYZ);
				var Invert_Create_l_finger_a3 = DuplicateSymmetry(Create_l_finger_a3, false, null, 1, 0, 0, 0, null);
				Invert_Create_l_finger_a3(0).name = "r_finger_a3";
				ParentObj(Model, Invert_Create_l_finger_a3);
				oHako.add(Create_l_finger_a3);oHako.add(Invert_Create_l_finger_a3(0));
				ApplyCns("Orientation", Bone_Model+".l_finger_a3", Create_l_finger_a3, true);
				ApplyCns("Orientation", Bone_Model+".r_finger_a3", Invert_Create_l_finger_a3, true);
			break;
			case "l_finger_b1":
				var Create_l_finger_b1 = Box( );
				Create_l_finger_b1.name = "l_finger_b1";
				MatchTransform(Create_l_finger_b1, oSel(i), siTrn, null);
				ParentObj(Model, Create_l_finger_b1);
				MakeLocal(Create_l_finger_b1+".display", siNodePropagation);
				SetValue(Create_l_finger_b1+".display.wirecolorr", 0.125, null);
				SetValue(Create_l_finger_b1+".display.wirecolorg", 0.878, null);
				SetValue(Create_l_finger_b1+".display.wirecolorb", 0.125, null);
				var Create_Icon_Point = SelectGeometryComponents(Create_l_finger_b1+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Create_Icon_Point, 0.14, 0.3, 0.12, siRelative, siGlobal, siObj, siXYZ);
				var Invert_Create_l_finger_b1 = DuplicateSymmetry(Create_l_finger_b1, false, null, 1, 0, 0, 0, null);
				Invert_Create_l_finger_b1(0).name = "r_finger_b1";
				ParentObj(Model, Invert_Create_l_finger_b1);
				oHako.add(Create_l_finger_b1);oHako.add(Invert_Create_l_finger_b1(0));
				ApplyCns("Orientation", Bone_Model+".l_finger_b1", Create_l_finger_b1, true);
				ApplyCns("Orientation", Bone_Model+".r_finger_b1", Invert_Create_l_finger_b1, true);
			break;
			case "l_finger_b2":
				var Create_l_finger_b2 = Box( );
				Create_l_finger_b2.name = "l_finger_b2";
				MatchTransform(Create_l_finger_b2, oSel(i), siTrn, null);
				ParentObj(Model, Create_l_finger_b2);
				MakeLocal(Create_l_finger_b2+".display", siNodePropagation);
				SetValue(Create_l_finger_b2+".display.wirecolorr", 0.125, null);
				SetValue(Create_l_finger_b2+".display.wirecolorg", 0.878, null);
				SetValue(Create_l_finger_b2+".display.wirecolorb", 0.125, null);
				var Create_Icon_Point = SelectGeometryComponents(Create_l_finger_b2+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Create_Icon_Point, 0.14, 0.3, 0.12, siRelative, siGlobal, siObj, siXYZ);
				var Invert_Create_l_finger_b2 = DuplicateSymmetry(Create_l_finger_b2, false, null, 1, 0, 0, 0, null);
				Invert_Create_l_finger_b2(0).name = "r_finger_b2";
				ParentObj(Model, Invert_Create_l_finger_b2);
				oHako.add(Create_l_finger_b2);oHako.add(Invert_Create_l_finger_b2(0));
				ApplyCns("Orientation", Bone_Model+".l_finger_b2", Create_l_finger_b2, true);
				ApplyCns("Orientation", Bone_Model+".r_finger_b2", Invert_Create_l_finger_b2, true);
			break;
			case "l_finger_b3":
				var Create_l_finger_b3 = Box( );
				Create_l_finger_b3.name = "l_finger_b3";
				MatchTransform(Create_l_finger_b3, oSel(i), siTrn, null);
				ParentObj(Model, Create_l_finger_b3);
				MakeLocal(Create_l_finger_b3+".display", siNodePropagation);
				SetValue(Create_l_finger_b3+".display.wirecolorr", 0.125, null);
				SetValue(Create_l_finger_b3+".display.wirecolorg", 0.878, null);
				SetValue(Create_l_finger_b3+".display.wirecolorb", 0.125, null);
				var Create_Icon_Point = SelectGeometryComponents(Create_l_finger_b3+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Create_Icon_Point, 0.14, 0.3, 0.12, siRelative, siGlobal, siObj, siXYZ);
				var Invert_Create_l_finger_b3 = DuplicateSymmetry(Create_l_finger_b3, false, null, 1, 0, 0, 0, null);
				Invert_Create_l_finger_b3(0).name = "r_finger_b3";
				ParentObj(Model, Invert_Create_l_finger_b3);
				oHako.add(Create_l_finger_b3);oHako.add(Invert_Create_l_finger_b3(0));
				ApplyCns("Orientation", Bone_Model+".l_finger_b3", Create_l_finger_b3, true);
				ApplyCns("Orientation", Bone_Model+".r_finger_b3", Invert_Create_l_finger_b3, true);
			break;
			case "l_finger_c1":
				var Create_l_finger_c1 = Box( );
				Create_l_finger_c1.name = "l_finger_c1";
				MatchTransform(Create_l_finger_c1, oSel(i), siTrn, null);
				ParentObj(Model, Create_l_finger_c1);
				MakeLocal(Create_l_finger_c1+".display", siNodePropagation);
				SetValue(Create_l_finger_c1+".display.wirecolorr", 0.125, null);
				SetValue(Create_l_finger_c1+".display.wirecolorg", 0.878, null);
				SetValue(Create_l_finger_c1+".display.wirecolorb", 0.125, null);
				var Create_Icon_Point = SelectGeometryComponents(Create_l_finger_c1+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Create_Icon_Point, 0.14, 0.3, 0.12, siRelative, siGlobal, siObj, siXYZ);
				var Invert_Create_l_finger_c1 = DuplicateSymmetry(Create_l_finger_c1, false, null, 1, 0, 0, 0, null);
				Invert_Create_l_finger_c1(0).name = "r_finger_c1";
				ParentObj(Model, Invert_Create_l_finger_c1);
				oHako.add(Create_l_finger_c1);oHako.add(Invert_Create_l_finger_c1(0));
				ApplyCns("Orientation", Bone_Model+".l_finger_c1", Create_l_finger_c1, true);
				ApplyCns("Orientation", Bone_Model+".r_finger_c1", Invert_Create_l_finger_c1, true);
			break;
			case "l_finger_c2":
				var Create_l_finger_c2 = Box( );
				Create_l_finger_c2.name = "l_finger_c2";
				MatchTransform(Create_l_finger_c2, oSel(i), siTrn, null);
				ParentObj(Model, Create_l_finger_c2);
				MakeLocal(Create_l_finger_c2+".display", siNodePropagation);
				SetValue(Create_l_finger_c2+".display.wirecolorr", 0.125, null);
				SetValue(Create_l_finger_c2+".display.wirecolorg", 0.878, null);
				SetValue(Create_l_finger_c2+".display.wirecolorb", 0.125, null);
				var Create_Icon_Point = SelectGeometryComponents(Create_l_finger_c2+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Create_Icon_Point, 0.14, 0.3, 0.12, siRelative, siGlobal, siObj, siXYZ);
				var Invert_Create_l_finger_c2 = DuplicateSymmetry(Create_l_finger_c2, false, null, 1, 0, 0, 0, null);
				Invert_Create_l_finger_c2(0).name = "r_finger_c2";
				ParentObj(Model, Invert_Create_l_finger_c2);
				oHako.add(Create_l_finger_c2);oHako.add(Invert_Create_l_finger_c2(0));
				ApplyCns("Orientation", Bone_Model+".l_finger_c2", Create_l_finger_c2, true);
				ApplyCns("Orientation", Bone_Model+".r_finger_c2", Invert_Create_l_finger_c2, true);				
			break;
			case "l_finger_c3":
				var Create_l_finger_c3 = Box( );
				Create_l_finger_c3.name = "l_finger_c3";
				MatchTransform(Create_l_finger_c3, oSel(i), siTrn, null);
				ParentObj(Model, Create_l_finger_c3);
				MakeLocal(Create_l_finger_c3+".display", siNodePropagation);
				SetValue(Create_l_finger_c3+".display.wirecolorr", 0.125, null);
				SetValue(Create_l_finger_c3+".display.wirecolorg", 0.878, null);
				SetValue(Create_l_finger_c3+".display.wirecolorb", 0.125, null);
				var Create_Icon_Point = SelectGeometryComponents(Create_l_finger_c3+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Create_Icon_Point, 0.14, 0.3, 0.12, siRelative, siGlobal, siObj, siXYZ);
				var Invert_Create_l_finger_c3 = DuplicateSymmetry(Create_l_finger_c3, false , null, 1, 0, 0, 0, null);
				Invert_Create_l_finger_c3(0).name = "r_finger_c3";
				ParentObj(Model, Invert_Create_l_finger_c3);			
				oHako.add(Create_l_finger_c3);oHako.add(Invert_Create_l_finger_c3(0));
				ApplyCns("Orientation", Bone_Model+".l_finger_c3", Create_l_finger_c3, true);
				ApplyCns("Orientation", Bone_Model+".r_finger_c3", Invert_Create_l_finger_c3, true);				
			break;
			case "l_finger_d1":
				var Create_l_finger_d1 = Box( );
				Create_l_finger_d1.name = "l_finger_d1";
				MatchTransform(Create_l_finger_d1, oSel(i), siTrn, null);
				ParentObj(Model, Create_l_finger_d1);
				MakeLocal(Create_l_finger_d1+".display", siNodePropagation);
				SetValue(Create_l_finger_d1+".display.wirecolorr", 0.125, null);
				SetValue(Create_l_finger_d1+".display.wirecolorg", 0.878, null);
				SetValue(Create_l_finger_d1+".display.wirecolorb", 0.125, null);
				var Create_Icon_Point = SelectGeometryComponents(Create_l_finger_d1+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Create_Icon_Point, 0.14, 0.3, 0.12, siRelative, siGlobal, siObj, siXYZ);
				var Invert_Create_l_finger_d1 = DuplicateSymmetry(Create_l_finger_d1, false, null, 1, 0, 0, 0, null);
				Invert_Create_l_finger_d1(0).name = "r_finger_d1";
				ParentObj(Model, Invert_Create_l_finger_d1);
				oHako.add(Create_l_finger_d1);oHako.add(Invert_Create_l_finger_d1(0));
				ApplyCns("Orientation", Bone_Model+".l_finger_d1", Create_l_finger_d1, true);
				ApplyCns("Orientation", Bone_Model+".r_finger_d1", Invert_Create_l_finger_d1, true);
			break;
			case "l_finger_d2":
				var Create_l_finger_d2 = Box( );
				Create_l_finger_d2.name = "l_finger_d2";
				MatchTransform(Create_l_finger_d2, oSel(i), siTrn, null);
				ParentObj(Model, Create_l_finger_d2);
				MakeLocal(Create_l_finger_d2+".display", siNodePropagation);
				SetValue(Create_l_finger_d2+".display.wirecolorr", 0.125, null);
				SetValue(Create_l_finger_d2+".display.wirecolorg", 0.878, null);
				SetValue(Create_l_finger_d2+".display.wirecolorb", 0.125, null);
				var Create_Icon_Point = SelectGeometryComponents(Create_l_finger_d2+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Create_Icon_Point, 0.14, 0.3, 0.12, siRelative, siGlobal, siObj, siXYZ);
				var Invert_Create_l_finger_d2 = DuplicateSymmetry(Create_l_finger_d2, false, null, 1, 0, 0, 0, null);
				Invert_Create_l_finger_d2(0).name = "r_finger_d2";
				ParentObj(Model, Invert_Create_l_finger_d2);
				oHako.add(Create_l_finger_d2);oHako.add(Invert_Create_l_finger_d2(0));
				ApplyCns("Orientation", Bone_Model+".l_finger_d2", Create_l_finger_d2, true);
				ApplyCns("Orientation", Bone_Model+".r_finger_d2", Invert_Create_l_finger_d2, true);			
			break;
			case "l_finger_d3":
				var Create_l_finger_d3 = Box( );
				Create_l_finger_d3.name = "l_finger_d3";
				MatchTransform(Create_l_finger_d3, oSel(i), siTrn, null);
				ParentObj(Model, Create_l_finger_d3);
				MakeLocal(Create_l_finger_d3+".display", siNodePropagation);
				SetValue(Create_l_finger_d3+".display.wirecolorr", 0.125, null);
				SetValue(Create_l_finger_d3+".display.wirecolorg", 0.878, null);
				SetValue(Create_l_finger_d3+".display.wirecolorb", 0.125, null);
				var Create_Icon_Point = SelectGeometryComponents(Create_l_finger_d3+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Create_Icon_Point, 0.14, 0.3, 0.12, siRelative, siGlobal, siObj, siXYZ);
				var Invert_Create_l_finger_d3 = DuplicateSymmetry(Create_l_finger_d3, false, null, 1, 0, 0, 0, null);
				Invert_Create_l_finger_d3(0).name = "r_finger_d3";
				ParentObj(Model, Invert_Create_l_finger_d3);
				oHako.add(Create_l_finger_d3);oHako.add(Invert_Create_l_finger_d3(0));
				ApplyCns("Orientation", Bone_Model+".l_finger_d3", Create_l_finger_d3, true);
				ApplyCns("Orientation", Bone_Model+".r_finger_d3", Invert_Create_l_finger_d3, true);					
			break;
			case "l_finger_e1":
				var Create_l_finger_e1 = Box( );
				Create_l_finger_e1.name = "l_finger_e1";
				MatchTransform(Create_l_finger_e1, oSel(i), siTrn, null);
				ParentObj(Model, Create_l_finger_e1);
				MakeLocal(Create_l_finger_e1+".display", siNodePropagation);
				SetValue(Create_l_finger_e1+".display.wirecolorr", 0.125, null);
				SetValue(Create_l_finger_e1+".display.wirecolorg", 0.878, null);
				SetValue(Create_l_finger_e1+".display.wirecolorb", 0.125, null);
				var Create_Icon_Point = SelectGeometryComponents(Create_l_finger_e1+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Create_Icon_Point, 0.14, 0.3, 0.12, siRelative, siGlobal, siObj, siXYZ);
				var Invert_Create_l_finger_e1 = DuplicateSymmetry(Create_l_finger_e1, true, null, 1, 0, 0, 0, null);
				Invert_Create_l_finger_e1(0).name = "r_finger_e1";
				ParentObj(Model, Invert_Create_l_finger_e1);
				oHako.add(Create_l_finger_e1);oHako.add(Invert_Create_l_finger_e1(0));
				ApplyCns("Orientation", Bone_Model+".l_finger_e1", Create_l_finger_e1, true);
				ApplyCns("Orientation", Bone_Model+".r_finger_e1", Invert_Create_l_finger_e1, true);
			break;
			case "l_finger_e2":
				var Create_l_finger_e2 = Box( );
				Create_l_finger_e2.name = "l_finger_e2";
				MatchTransform(Create_l_finger_e2, oSel(i), siTrn, null);
				ParentObj(Model, Create_l_finger_e2);
				MakeLocal(Create_l_finger_e2+".display", siNodePropagation);
				SetValue(Create_l_finger_e2+".display.wirecolorr", 0.125, null);
				SetValue(Create_l_finger_e2+".display.wirecolorg", 0.878, null);
				SetValue(Create_l_finger_e2+".display.wirecolorb", 0.125, null);
				var Create_Icon_Point = SelectGeometryComponents(Create_l_finger_e2+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Create_Icon_Point, 0.14, 0.3, 0.12, siRelative, siGlobal, siObj, siXYZ);
				var Invert_Create_l_finger_e2 = DuplicateSymmetry(Create_l_finger_e2, false, null, 1, 0, 0, 0, null);
				Invert_Create_l_finger_e2(0).name = "r_finger_e2";
				ParentObj(Model, Invert_Create_l_finger_e2);
				oHako.add(Create_l_finger_e2);oHako.add(Invert_Create_l_finger_e2(0));
				ApplyCns("Orientation", Bone_Model+".l_finger_e2", Create_l_finger_e2, true);
				ApplyCns("Orientation", Bone_Model+".r_finger_e2", Invert_Create_l_finger_e2, true);				
			break;
			case "l_finger_e3":
				var Create_l_finger_e3 = Box( );
				Create_l_finger_e3.name = "l_finger_e3";
				MatchTransform(Create_l_finger_e3, oSel(i), siTrn, null);
				ParentObj(Model, Create_l_finger_e3);
				MakeLocal(Create_l_finger_e3+".display", siNodePropagation);
				SetValue(Create_l_finger_e3+".display.wirecolorr", 0.125, null);
				SetValue(Create_l_finger_e3+".display.wirecolorg", 0.878, null);
				SetValue(Create_l_finger_e3+".display.wirecolorb", 0.125, null);
				var Create_Icon_Point = SelectGeometryComponents(Create_l_finger_e3+".pnt[(0,0),(0,1),(1,0),(1,1),(1,2),(2,0),(2,1),(2,2),(3,0),(3,1),(3,2),(3,3),(4,0),(4,1),(4,2),(4,3)]");
				Scale(Create_Icon_Point, 0.14, 0.3, 0.12, siRelative, siGlobal, siObj, siXYZ);
				var Invert_Create_l_finger_e3 = DuplicateSymmetry(Create_l_finger_e3, false, null, 1, 0, 0, 0, null);
				Invert_Create_l_finger_e3(0).name = "r_finger_e3";
				ParentObj(Model, Invert_Create_l_finger_e3);
				oHako.add(Create_l_finger_e3);oHako.add(Invert_Create_l_finger_e3(0));
				ApplyCns("Orientation", Bone_Model+".l_finger_e3", Create_l_finger_e3, true);
				ApplyCns("Orientation", Bone_Model+".r_finger_e3", Invert_Create_l_finger_e3, true);				
			break;
			}
		}
		for(var u = 0 ; u < oHako.Count ; u++)
			{
			switch(oHako(u).name)
				{
				case "stomach":
						ParentObj(Create_COG,oHako(u));
				break;
				case "chest":
						ParentObj(Create_stomach,oHako(u));
				break;
				case "head":
						ParentObj(Create_chest,oHako(u));
				break;
				case "l_shoulder_offset":
						ParentObj(Create_chest,oHako(u));
				break;
				case "r_shoulder_offset":
						ParentObj(Create_chest,oHako(u));
				break;
				//case "r_shoulder":
						//ParentObj(Invert_offset_sho(0),oHako(u));
				//break;
				case "l_hand_tra":
						ParentObj(Create_chest,oHako(u));
				break;
				case "r_hand_tra":
						ParentObj(Create_chest,oHako(u));
				break;
				case "r_sholder_offset_parm":
						ParentObj(Create_chest,oHako(u));
				break;
				case "l_sholder_offset_parm":
						ParentObj(Create_chest,oHako(u));
				break;
				case "l_finger_a1":
						ParentObj(Wepon,oHako(u));
				break;
				case "r_finger_a1":
						ParentObj(Invert_Wepon,oHako(u));
				break;
				case "l_finger_a2":
						ParentObj(Create_l_finger_a1,oHako(u));
				break;
				case "r_finger_a2":
						ParentObj(Invert_Create_l_finger_a1,oHako(u));
				break;
				case "l_finger_a3":
						ParentObj(Create_l_finger_a2,oHako(u));
				break;
				case "r_finger_a3":
						ParentObj(Invert_Create_l_finger_a2,oHako(u));
				break;
				case "l_finger_b1":
						ParentObj(Wepon,oHako(u));
				break;
				case "r_finger_b1":
						ParentObj(Invert_Wepon,oHako(u));
				break;				
				case "l_finger_b2":
						ParentObj(Create_l_finger_b1,oHako(u));
				break;
				case "r_finger_b2":
						ParentObj(Invert_Create_l_finger_b1,oHako(u));
				break;				
				case "l_finger_b3":
						ParentObj(Create_l_finger_b2,oHako(u));
				break;
				case "r_finger_b3":
						ParentObj(Invert_Create_l_finger_b2,oHako(u));
				break;				
				case "l_finger_c1":
						ParentObj(Wepon,oHako(u));
				break;
				case "r_finger_c1":
						ParentObj(Invert_Wepon,oHako(u));
				break;				
				case "l_finger_c2":
						ParentObj(Create_l_finger_c1,oHako(u));
				break;
				case "r_finger_c2":
						ParentObj(Invert_Create_l_finger_c1,oHako(u));
				break;				
				case "l_finger_c3":
						ParentObj(Create_l_finger_c2,oHako(u));
				break;
				case "r_finger_c3":
						ParentObj(Invert_Create_l_finger_c2,oHako(u));
				break;				
				case "l_finger_d1":
						ParentObj(Wepon,oHako(u));
				break;
				case "r_finger_d1":
						ParentObj(Invert_Wepon,oHako(u));
				break;				
				case "l_finger_d2":
						ParentObj(Create_l_finger_d1,oHako(u));
				break;
				case "r_finger_d2":
						ParentObj(Invert_Create_l_finger_d1,oHako(u));
				break;				
				case "l_finger_d3":
						ParentObj(Create_l_finger_d2,oHako(u));
				break;
				case "r_finger_d3":
						ParentObj(Invert_Create_l_finger_d2,oHako(u));
				break;				
				case "l_finger_e1":
						ParentObj(Wepon,oHako(u));
				break;
				case "r_finger_e1":
						ParentObj(Invert_Wepon,oHako(u));
				break;				
				case "l_finger_e2":
						ParentObj(Create_l_finger_e1,oHako(u));
				break;
				case "r_finger_e2":
						ParentObj(Invert_Create_l_finger_e1,oHako(u));
				break;
				case "l_finger_e3":
						ParentObj(Create_l_finger_e2,oHako(u));
				break;
				case "r_finger_e3":
						ParentObj(Invert_Create_l_finger_e2,oHako(u));
				break;				
				case "l_arm_scaling":
						ParentObj(Create_chest,oHako(u));
				break;
				case "l_arm_scaling0":
						ParentObj(Scaling,oHako(u));
				break;
				case "l_arm_scaling1":
						ParentObj(Scaling_null_0,oHako(u));
				break;
				case "l_arm_scaling2":
						ParentObj(Scaling_null_1,oHako(u));
				break;
				case "l_arm_scaling3":
						ParentObj(Scaling_null_2,oHako(u));
				break;
				case "l_arm_scaling4":
						ParentObj(Scaling_null_3,oHako(u));
				break;
				case "r_arm_scaling":
						ParentObj(Create_chest,oHako(u));
				break;
				case "r_arm_scaling0":
						ParentObj(Invert_Scaling,oHako(u));
				break;
				case "r_arm_scaling1":
						ParentObj(Invert_Scaling_null_0,oHako(u));
				break;
				case "r_arm_scaling2":
						ParentObj(Invert_Scaling_null_1,oHako(u));
				break;
				case "r_arm_scaling3":
						ParentObj(Invert_Scaling_null_2,oHako(u));
				break;
				case "r_arm_scaling4":
						ParentObj(Invert_Scaling_null_3,oHako(u));
				break;
				case "l_foot_scaling0":
						ParentObj(Create_Icon_ankle,oHako(u));
				break;
				case "l_foot_scaling1":
						ParentObj(Foot_Scaling_null_0,oHako(u));
				break;	
				case "l_foot_scaling2":
						ParentObj(Foot_Scaling_null_1,oHako(u));
				break;
				case "l_foot_scaling3":
						ParentObj(Foot_Scaling_null_2,oHako(u));
				break;
				case "r_foot_scaling0":
						ParentObj(Invert_Create_Icon_ankle,oHako(u));
				break;
				case "r_foot_scaling1":
						ParentObj(Invert_Foot_Scaling_null_0,oHako(u));
				break;	
				case "r_foot_scaling2":
						ParentObj(Invert_Foot_Scaling_null_1,oHako(u));
				break;
				case "r_foot_scaling3":
						ParentObj(Invert_Foot_Scaling_null_2,oHako(u));
				break;
				}
			}
			ActivateObjectSelTool(null);
			DeselectAll();
			var IK = XSIFactory.CreateObject( "XSI.Collection" );
			var IK_Foot = XSIFactory.CreateObject( "XSI.Collection" );
			for(var j = 0 ; j < oHako_Bone.Count ; j++){if(oHako_Bone(j).name == "l_arm1"){IK.add(oHako_Bone(j))}}
			for(var e = 0 ; e < oHako_Bone.Count ; e++){if(oHako_Bone(e).name == "l_elbow"){IK.add(oHako_Bone(e))}}
			for(var d = 0 ; d < oHako_Bone.Count ; d++){if(oHako_Bone(d).name == "l_arm2"){IK.add(oHako_Bone(d))}}
			for(var a = 0 ; a < oHako_Bone.Count ; a++){if(oHako_Bone(a).name == "l_hand"){IK.add(oHako_Bone(a))}}
			for(var o = 0 ; o < oHako_Bone_Foot.Count ; o++){if(oHako_Bone_Foot(o).name == "l_leg1"){IK_Foot.add(oHako_Bone_Foot(o))}}
			for(var k = 0 ; k < oHako_Bone_Foot.Count ; k++){if(oHako_Bone_Foot(k).name == "l_knee"){IK_Foot.add(oHako_Bone_Foot(k))}}
			for(var z = 0 ; z < oHako_Bone_Foot.Count ; z++){if(oHako_Bone_Foot(z).name == "l_leg2"){IK_Foot.add(oHako_Bone_Foot(z))}}
			for(var q = 0 ; q < oHako_Bone_Foot.Count ; q++){if(oHako_Bone_Foot(q).name == "l_ankle"){IK_Foot.add(oHako_Bone_Foot(q))}}
			var ArmIK = NullToBorn(IK);
			var FootIK = NullToBorn(IK_Foot);
			var ArmRoot = ArmIK.FindChildren( "*", siChainRootPrimType);
			var ArmBone = ArmIK.FindChildren( "*", siChainBonePrimType);
			var ArmEff = ArmIK.FindChildren( "*", siChainEffPrimType);	
			var FootRoot = FootIK.FindChildren( "*", siChainRootPrimType);
			var FootBone = FootIK.FindChildren( "*", siChainBonePrimType);
			var FootEff = FootIK.FindChildren( "*", siChainEffPrimType);
			SetValue(ArmRoot(0)+".root.size", 0.1);ArmRoot(0).name = "l_arm_root";
			SetValue(FootRoot(0)+".root.size", 0.1);FootRoot(0).name = "l_foot_root";
			SetValue(ArmEff(0)+".eff.size", 0.1);ArmEff(0).name = "l_arm_eff";
			var ArmUpNull = ArmRoot(0).AddNull("l_arm_upv_joint");
			SetValue(ArmUpNull+".null.size", 0.01, null);
			MatchTransform(ArmUpNull,  ArmBone(0), siTrn, null);
			MatchTransform(ArmUpNull,  ArmBone(0), siRot, null);
			Translate(ArmUpNull, 0, 3.3, 0, siRelative, siLocal, siObj, siXYZ);
			var ArmEffNull = ArmEff(0).AddNull("l_arm_joint_eff");
			SetValue(ArmEffNull+".null.size", 0.01, null);
			MatchTransform(ArmEffNull,  ArmEff(0), siTrn, null);
			SetValue(FootEff(0)+".eff.size", 0.1);FootEff(0).name = "l_foot_eff";
			var EffNull = FootEff(0).AddNull("l_foot_eff_joint");
			SetValue(EffNull+".null.size", 0.01, null);
			MatchTransform(EffNull,  FootEff(0), siTrn, null);
			SetValue(ArmRoot(0)+".root.primary_icon", 2);SetValue(FootRoot(0)+".root.primary_icon", 2);
			var FootUpNull = FootRoot(0).AddNull("l_foot_upv_joint");
			SetValue(FootUpNull+".null.size", 0.01, null);
			MatchTransform(FootUpNull,  FootBone(0), siTrn, null);
			MatchTransform(FootUpNull,  FootBone(0), siRot, null);
			Translate(FootUpNull, 0, 3.45, 0, siRelative, siLocal, siObj, siXYZ);
			for(var n = 0 ; n < ArmBone.Count ; n++)
				{
					ArmBone(n).name = "l_arm_bone1";
					SetValue(ArmBone(n)+".bone.primary_icon", 6);
					SetValue(ArmBone(n)+".bone.size", 0.44);
					var Null = ArmBone(n).AddNull("l_arm_joint1");
					if(Null.name == "l_arm_joint1")
						{
							var Null_Offset = ArmBone(n).AddNull("l_arm_Auto");
							SetValue(Null_Offset+".null.size", 0.01, null);
							MatchTransform(Null_Offset,  OffSet, siTrn, null);
							MatchTransform(Null_Offset,  OffSet, siRot, null);
						}
					MatchTransform(Null,  ArmBone(n), siTrn, null);
					SetValue(Null+".null.size", 0.4, null);
					SetValue(Null+".null.primary_icon", 4, null);
					MakeLocal(ArmBone(n)+".display", siNodePropagation);
					SetValue(ArmBone(n)+".display.wirecolorr", 0.125, null);
					SetValue(ArmBone(n)+".display.wirecolorg", 0.878, null);
					SetValue(ArmBone(n)+".display.wirecolorb", 0.753, null);
				}
			for(var n = 0 ; n < FootBone.Count ; n++)
				{
					FootBone(n).name = "l_foot_bone1";
					SetValue(FootBone(n)+".bone.primary_icon", 6);
					SetValue(FootBone(n)+".bone.size", 0.44);
					var Null = FootBone(n).AddNull("l_foot_joint1");
					MatchTransform(Null,  FootBone(n), siTrn, null);
					SetValue(Null+".null.size", 0.4, null);
					SetValue(Null+".null.primary_icon", 4, null);
					MakeLocal(FootBone(n)+".display", siNodePropagation);
					SetValue(FootBone(n)+".display.wirecolorr", 0.125, null);
					SetValue(FootBone(n)+".display.wirecolorg", 0.878, null);
					SetValue(FootBone(n)+".display.wirecolorb", 0.753, null);
				}
			ParentObj(Create_chest,ArmRoot);
			ParentObj(HipNull,FootRoot);
			for(var b = 0 ; b < ArmBone.Count ; b++)
				{
					if(ArmBone(b).name == "l_arm_bone1")
						{
							ApplyCns("Scaling", ArmBone(b), Scaling_null_1, true);
							ApplyOp("SkeletonUpVector", ArmBone(b)+";"+ArmUpNull, 3, siPersistentOperation, null, 0);
							var Bone_Child = ArmBone(b).Children;
							for(var ch = 0 ; ch < Bone_Child.Count ; ch++)
								{
									if(Bone_Child(ch).name == "l_arm_joint1")
									{
										ApplyCns("Pose", l_arm_bone1_cons, Bone_Child(ch), true);	
									}
								}
						}
					else if(ArmBone(b).name == "l_arm_bone2")
						{
							ApplyCns("Scaling", ArmBone(b), Scaling_null_2, true);
							var Bone_Child = ArmBone(b).Children;
							for(var ch = 0 ; ch < Bone_Child.Count ; ch++)
								{
								if(Bone_Child(ch).name == "l_arm_joint2")
									{
										ApplyCns("Pose", l_arm_bone2_cons, Bone_Child(ch), true);	
									}
								}
						}
					else if(ArmBone(b).name == "l_arm_bone3")
						{
							ApplyCns("Scaling", ArmBone(b), Scaling_null_3, true);
							var Bone_Child = ArmBone(b ).Children;
							for(var ch = 0 ; ch < Bone_Child.Count ; ch++)
								{
								if(Bone_Child(ch).name == "l_arm_joint3")
									{
										ApplyCns("Pose", l_arm_bone3_cons, Bone_Child(ch), true);	
									}
								}
						}
				}
			for(var b = 0 ; b < FootBone.Count ; b++)
				{
					if(FootBone(b).name == "l_foot_bone1")
						{
							ApplyOp("SkeletonUpVector", FootBone(b)+";"+FootUpNull, 3, siPersistentOperation, null, 0);
							ApplyCns("Scaling", FootBone(b), Foot_Scaling_null_0, true);
							var Bone_Child = FootBone(b).Children;
							ApplyCns("Pose", l_foot_bone1_cons, Bone_Child(1), true);
						}
					else if(FootBone(b).name == "l_foot_bone2")
						{
							ApplyCns("Scaling", FootBone(b), Foot_Scaling_null_1, true);
							var Bone_Child = FootBone(b).Children;
							Logmessage(Bone_Child(1));
							ApplyCns("Pose", l_foot_bone2_cons, Bone_Child(1), true);
						}
					else if(FootBone(b).name == "l_foot_bone3")
						{
							ApplyCns("Scaling", FootBone(b), Foot_Scaling_null_2, true);
							var Bone_Child = FootBone(b).Children;
							ApplyCns("Pose", l_foot_bone3_cons, Bone_Child(0), true);
						}
				}
			//R_arm
			var Arm_Root_Sel = SelectObj(ArmRoot, "BRANCH");
			var Invert_Arm_Root_Sel = DuplicateSymmetry(Arm_Root_Sel, false, true, 1, 0, 0, 0, false);
			var Foot_Root_Sel = SelectObj(FootRoot, "BRANCH");
			var Invert_Foot_Root_Sel = DuplicateSymmetry(Foot_Root_Sel, false, true, 1, 0, 0, 0, false);
			var ArmRoot_r = Invert_Arm_Root_Sel(0).FindChildren( "*", siChainRootPrimType);
			var ArmBone_r = Invert_Arm_Root_Sel(0).FindChildren( "*", siChainBonePrimType);
			var ArmEff_r = Invert_Arm_Root_Sel(0).FindChildren( "*", siChainEffPrimType);
			var Armjoint_r = Invert_Arm_Root_Sel(0).FindChildren( "*", siNullPrimType);	
			var FootRoot_r = Invert_Foot_Root_Sel(0).FindChildren( "*", siChainRootPrimType);
			var FootBone_r = Invert_Foot_Root_Sel(0).FindChildren( "*", siChainBonePrimType);
			var FootEff_r = Invert_Foot_Root_Sel(0).FindChildren( "*", siChainEffPrimType);
			var Footjoint_r = Invert_Foot_Root_Sel(0).FindChildren( "*", siNullPrimType);
			ArmRoot_r(0).name = "r_arm_root";
			FootRoot_r(0).name = "r_foot_root";
			ArmEff_r(0).name = "r_arm_eff";
			FootEff_r(0).name = "r_foot_eff";
			var Flag = 0;
			for(var n = 0 ; n < ArmBone_r.Count ; n++)
				{
					ArmBone_r(n).name = "r_arm_bone1";
				}
			for(var n = 0 ; n < Armjoint_r.Count ; n++)
				{
					var Parent_joint_Arm = Armjoint_r(n).Parent;
					if(Parent_joint_Arm.type == "eff")
						{
							Armjoint_r(n).name = "r_arm_joint_eff";
							ApplyCns("Position", Invert_OffSet_handrot,Armjoint_r(n) , true);
							ApplyCns("Orientation",Invert_OffSet_handrot , Armjoint_r(n), true);
						}
					else if(Parent_joint_Arm.name == "r_arm_bone1")
						{
							Armjoint_r(2).name = "r_arm_joint1";
							if(Flag == 0 )
								{
								var Invert_Null_Offset = Parent_joint_Arm.AddNull("r_arm_Auto");
								SetValue(Invert_Null_Offset+".null.size", 0.01, null);
								MatchTransform(Invert_Null_Offset,  Invert_offset_sho(0), siTrn, null);
								MatchTransform(Invert_Null_Offset,  Invert_offset_sho(0), siRot, null);
								var Flag = 1;
								}
							ApplyCns("Scaling", Parent_joint_Arm, Invert_Scaling_null_0, true);
						}
					else if(Parent_joint_Arm.name == "r_arm_bone2")
						{Armjoint_r(n).name = "r_arm_joint2";ApplyCns("Scaling", Parent_joint_Arm, Invert_Scaling_null_1, true);}
					else if(Parent_joint_Arm.name == "r_arm_bone3")
						{Armjoint_r(n).name = "r_arm_joint3";ApplyCns("Scaling", Parent_joint_Arm, Invert_Scaling_null_2, true);}
					else if(Armjoint_r(n).name == "l_arm_upv_joint1")
						{Armjoint_r(n).name = "r_arm_upv_joint";}
				}
				DeleteObj(Armjoint_r(3))
			for(var n = 0 ; n < FootBone_r.Count ; n++)
				{
					FootBone_r(n).name = "r_foot_bone1";
				}
			for(var n = 0 ; n < Footjoint_r.Count ; n++)
				{
					var Parent_joint = Footjoint_r(n).Parent;
					if(Parent_joint.type == "eff")
						{Footjoint_r(n).name = "r_foot_eff_joint";}
					else if(Parent_joint.name == "r_foot_bone1")
						{Footjoint_r(n).name = "r_foot_joint1";ApplyCns("Scaling", Parent_joint, Invert_Foot_Scaling_null_0, true);}
					else if(Parent_joint.name == "r_foot_bone2")
						{Footjoint_r(n).name = "r_foot_joint2";ApplyCns("Scaling", Parent_joint, Invert_Foot_Scaling_null_1, true);}
					else if(Parent_joint.name == "r_foot_bone3")
						{Footjoint_r(n).name = "r_foot_joint3";ApplyCns("Scaling", Parent_joint, Invert_Foot_Scaling_null_2, true);}
					else if(Footjoint_r(n).name == "l_foot_upv_joint1")
						{Footjoint_r(n).name = "r_foot_upv_joint";}
				}
			ApplyCns("Scaling", r_ankle_bone, Invert_Foot_Scaling_null_3, true);
			ApplyCns("Scaling", l_ankle_bone, Foot_Scaling_null_3, true);
			var ArmUpVector = Diamond();
			ArmUpVector.name = "l_arm_upv";
			SelectGeometryComponents(ArmUpVector+".pnt[*]");
			Scale(ArmUpVector, 0.45, 0.45, 0.45, siRelative, siLocal, siObj, siXYZ);
			MakeLocal(ArmUpVector+".display", siNodePropagation);
			SetValue(ArmUpVector+".display.wirecolorr", 0.878, null);
			SetValue(ArmUpVector+".display.wirecolorg", 0.251, null);
			SetValue(ArmUpVector+".display.wirecolorb", 0, null);
			MatchTransform(ArmUpVector,  ArmUpNull, siTrn, null);
			ParentObj(Create_chest,ArmUpVector);
			var FootUpVector = Box();
			FootUpVector.name = "l_foot_upv";
			SelectGeometryComponents(FootUpVector+".pnt[*]");
			Scale(FootUpVector, 0.45, 0.45, 0.45, siRelative, siLocal, siObj, siXYZ);
			MakeLocal(FootUpVector+".display", siNodePropagation);
			SetValue(FootUpVector+".display.wirecolorr", 0.878, null);
			SetValue(FootUpVector+".display.wirecolorg", 0.251, null);
			SetValue(FootUpVector+".display.wirecolorb", 0, null);
			MatchTransform(FootUpVector,  FootUpNull, siTrn, null);
			ParentObj(Rot,FootUpVector);
			var Invert_ArmUpVector = DuplicateSymmetry(ArmUpVector, false, true, 1, 0, 0, 0, null);
			Invert_ArmUpVector(0).name = "r_arm_upv";
			MakeLocal(Invert_ArmUpVector(0)+".display", siNodePropagation);
			SetValue(Invert_ArmUpVector(0)+".display.wirecolorr", 0, null);
			SetValue(Invert_ArmUpVector(0)+".display.wirecolorg", 0.125, null);
			SetValue(Invert_ArmUpVector(0)+".display.wirecolorb", 0.627, null);
			var Invert_FootUpVector = DuplicateSymmetry(FootUpVector, false, true, 1, 0, 0, 0, null);
			Invert_FootUpVector(0).name = "r_foot_upv";
			SetValue(Invert_FootUpVector(0)+".kine.local.roty", 0, null);
			MakeLocal(Invert_FootUpVector(0)+".display", siNodePropagation);
			SetValue(Invert_FootUpVector(0)+".display.wirecolorr", 0, null);
			SetValue(Invert_FootUpVector(0)+".display.wirecolorg", 0.125, null);
			SetValue(Invert_FootUpVector(0)+".display.wirecolorb", 0.627, null);
			//FKIK
			var FKIK_Create = AddProp("Custom_parameter_list", Create_COG, "", "DisplayInfo_FK_IK");
			var FKIK = FKIK_Create.Value( "Value" );
			var LARM_IK = SIAddCustomParameter(FKIK, "L_arm_FKIK", siDouble, 1, null, null, null, 2053, null, 1, null, null);
			var RARM_IK = SIAddCustomParameter(FKIK, "R_arm_FKIK", siDouble, 1, null, null, null, 2053, null, 1, null, null);
			var LFoot_IK = SIAddCustomParameter(FKIK, "L_Foot_FKIK", siDouble, 1, null, null, null, 2053, null, 1, null, null);
			var RFoot_IK = SIAddCustomParameter(FKIK, "R_Foot_FKIK", siDouble, 1, null, null, null, 2053, null, 1, null, null);
			CopyPaste(FKIK+".L_arm_FKIK", null, ArmBone(0)+".chain.blendik", 1);
			CopyPaste(FKIK+".R_arm_FKIK", null, ArmBone_r(0)+".chain.blendik", 1);
			CopyPaste(FKIK+".L_Foot_FKIK", null, FootBone(0)+".chain.blendik", 1);
			CopyPaste(FKIK+".R_Foot_FKIK", null, FootBone_r(0)+".chain.blendik", 1);
			//Constrain
			ApplyCns("Pose", Bone_Model+".move", Model+".move", true);
			ApplyCns("Pose", Bone_Model+".move_off", Model+".move_off", true);
			ApplyCns("Pose", Bone_Model+".rot", Model+".rot", true);
			ApplyCns( "Position"  , offset_const, Create_l_hand, true);
			ApplyCns( "Position"  , Invert_offset_const, Invert_Create_l_hand, true);
			ApplyCns( "Orientation" , OffSet  , Null_Offset , true);
			ApplyCns( "Orientation" , Invert_offset_sho(0)  , Invert_Null_Offset , true);
			ApplyCns( "Scaling"     , Invert_offset_sho(0) ,   Invert_Scaling, true);
			ApplyCns( "Scaling"     , Invert_Create_l_hand, Invert_Scaling_null_4, true);
			ApplyCns( "Scaling"     , Create_l_hand, Scaling_null_4, true);
			ApplyCns( "Orientation" , r_shoulder_bone  , Invert_Create_Icon(0) , true);
			ApplyCns( "Scaling"     , r_shoulder_bone  , Invert_Create_Icon(0) , true);
			ApplyCns( "Position"    , r_shoulder_bone  , Invert_Create_Icon(0) , true);
			ApplyCns( "Orientation" , l_shoulder_bone  , Create_Icon        , true);
			ApplyCns( "Scaling"     , l_shoulder_bone  , Create_Icon        , true);
			ApplyCns( "Position"    , l_shoulder_bone  , Create_Icon        , true);
			ApplyCns( "Scaling"     , Bone_Model+".l_shoulder" , Scaling_null_0 , true);
			ApplyCns( "Scaling"     , Bone_Model+".r_shoulder" , Invert_Scaling_null_0 , true);
			ApplyCns( "Pose"        , Bone_Model+".l_arm1"     , Model+".l_arm_joint1", true);
			ApplyCns( "Pose"        , Bone_Model+".l_elbow"    , Model+".l_arm_joint2", true);
			ApplyCns( "Pose"        , Bone_Model+".l_arm2"     , Model+".l_arm_joint3", true);
			ApplyCns( "Pose"        , Bone_Model+".r_arm1"     , Model+".r_arm_joint1", true);
			ApplyCns( "Pose"        , Bone_Model+".r_elbow"    , Model+".r_arm_joint2", true);
			ApplyCns( "Pose"        , Bone_Model+".r_arm2"     , Model+".r_arm_joint3", true);
			ApplyCns( "Position"    , Bone_Model+".l_hand"     , Model+".l_arm_joint_eff", true);
			ApplyCns( "Position"    , Bone_Model+".r_hand"     , Model+".r_arm_joint_eff", true);
			ApplyCns( "Orientation" , Bone_Model+".l_hand"     , Model+".l_hand_rot", true);
			ApplyCns( "Orientation" , Bone_Model+".r_hand"     , Model+".r_hand_rot", true);
			ApplyCns( "Scaling"     , Bone_Model+".l_hand"     , Model+".l_arm_scaling4", true);
			ApplyCns( "Scaling"     , Bone_Model+".r_hand"     , Model+".r_arm_scaling4", true);
			ApplyCns( "Position"    , Model+".l_hand_rot_offset", Model+".l_arm_joint_eff", true);
			ApplyCns( "Orientation" , Model+".l_hand_rot_offset", Model+".l_arm_joint_eff", true);
			ApplyCns( "Orientation" , Bone_Model+".l_ankle"    , Model+".l_ik_joint", true);
			ApplyCns( "Position"    , Bone_Model+".l_ankle"    , Model+".l_foot_eff_joint", true);
			ApplyCns( "Orientation" , Bone_Model+".r_ankle"    , Model+".r_ik_joint", true);
			ApplyCns( "Position"    , Bone_Model+".r_ankle"    , Model+".r_foot_eff_joint", true);
			ApplyCns( "Pose"        , Bone_Model+".r_leg1"     , Model+".r_foot_joint1" , true);
			ApplyCns( "Pose"        , Bone_Model+".r_knee"     , Model+".r_foot_joint2" , true);
			ApplyCns( "Pose"        , Bone_Model+".r_leg2"     , Model+".r_foot_joint3", true);
			ApplyCns( "Position"    , Model+".l_foot_eff"      , Model+".l_ik_joint", true);
			ApplyCns( "Position"    , Model+".r_foot_eff"      , Model+".r_ik_joint", true);
			ApplyCns( "Position"    , Bone_Model+".r_ankle"    , Model+".r_foot_eff_joint", true);
			ApplyCns( "Position"    , Bone_Model+".l_ankle"    , Model+".l_foot_eff_joint", true);
			ApplyCns( "Position"    , Bone_Model+".Hip"    , Model+".COG", true);
			ApplyCns("Position", Model+".l_arm_upv_joint", Model+".l_arm_upv", true);
			ApplyCns("Position", Model+".r_arm_upv_joint", Model+".r_arm_upv", true);
			ApplyCns("Position", Model+".l_foot_upv_joint", Model+".l_foot_upv", true);
			ApplyCns("Position", Model+".r_foot_upv_joint", Model+".r_foot_upv", true);
			ApplyCns( "Position"    , Model+".l_arm_eff"       , Create_l_hand, true);
			ApplyCns( "Position"    , Model+".r_arm_eff"       , Invert_Create_l_hand, true);	
			SetExpr(Model+".l_arm_eff.kine.poscns.blendweight", Model+".COG.DisplayInfo_FK_IK.L_arm_FKIK", null);
			SetExpr(Model+".l_hand_rot_offset.kine.poscns.active", "cond( "+Model+".COG.DisplayInfo_FK_IK.L_arm_FKIK == 1, 0, 1 )", null);
			SetExpr(Model+".l_hand_rot_offset.kine.poscns.blendweight", Model+".COG.DisplayInfo_FK_IK.L_arm_FKIK * -1 + 1", null);
			SetExpr(Model+".r_arm_eff.kine.poscns.blendweight", Model+".COG.DisplayInfo_FK_IK.R_arm_FKIK", null);
			SetExpr(Model+".r_hand_rot_offset.kine.poscns.active", "cond( "+Model+".COG.DisplayInfo_FK_IK.R_arm_FKIK == 1, 0, 1 )", null);
			SetExpr(Model+".r_hand_rot_offset.kine.poscns.blendweight", Model+".COG.DisplayInfo_FK_IK.R_arm_FKIK * -1 + 1", null);
			SetExpr(Model+".r_foot_eff.kine.poscns.blendweight", Model+".COG.DisplayInfo_FK_IK.R_Foot_FKIK", null);
			SetExpr(Model+".l_foot_eff.kine.poscns.blendweight", Model+".COG.DisplayInfo_FK_IK.L_Foot_FKIK", null);
			var Root_Sel = SelectObj(Model, "BRANCH");
			var Rig_All_Sel = SelectChildNodes(Root_Sel);
			for(var ro=0; ro<Rig_All_Sel.Count; ro++)
				{
					if(Rig_All_Sel(ro).type == "crvlist")
						{
							SetNeutralPose(Rig_All_Sel(ro) ,siSRT);
						}
				}
	var Ed = oXSIUIT.Msgbox( "Finish", siMsgOkOnly | siMsgQuestion, "Finish" );
	SetValue("preferences.scripting.cmdlog", true, null);
	SetValue("preferences.Interaction.autoinspect", true, null);
 }
   else
      {
       var Ed = oXSIUIT.Msgbox( "please choose a Reference model", siMsgOkOnly | siMsgQuestion, "please choose a Reference model" );
	SetValue("preferences.scripting.cmdlog", true, null);
	SetValue("preferences.Interaction.autoinspect", true, null);
       }
   }
   else
      {
       var Ed = oXSIUIT.Msgbox( "please choose a Reference model", siMsgOkOnly | siMsgQuestion, "please choose a Reference model" );
	SetValue("preferences.scripting.cmdlog", true, null);
	SetValue("preferences.Interaction.autoinspect", true, null);
       }
	}
else
	{
	Logmessage("Not selection!");
	var Ed = oXSIUIT.Msgbox( "please choose a model(branch)", siMsgOkOnly | siMsgQuestion, "please choose a model(branch)" );
	SetValue("preferences.scripting.cmdlog", true, null);
	SetValue("preferences.Interaction.autoinspect", true, null);
	}
	
function NullToBorn(Sel)
{
	var oPos1 = XSIMath.CreateVector3();
	var oPos2 = XSIMath.CreateVector3();
	var oPos3 = XSIMath.CreateVector3(0,0,1);
	Logmessage(Sel(0));
	Sel(0).Kinematics.Global.Transform.GetTranslation(oPos1);
	Sel(1).Kinematics.Global.Transform.GetTranslation(oPos2);
	var oRootChain = ActiveSceneRoot.Add2DChain(oPos1, oPos2, oPos3, si2DChainRight);
	for(var i=2; i<Sel.Count; i++){
		Sel(i).Kinematics.Global.Transform.GetTranslation(oPos2);
		oRootChain.AddBone(oPos2,siChainBonePin);
	}
	return oRootChain;
}
function Sphere( )
{
	SetValue("preferences.scripting.cmdlog", false, null);
	var Sphere = CreatePrim("sphere", "MeshSurface","sphere_Control", null);
	SetValue(Sphere+".sphere.radius", 1);
	var Cur = ApplyGenOp("ExtractEdgeLoopOp", "MeshSurface", Sphere+".edge[1,5,8,10,11,14,17,20,22,24,25,27,29-31,33,35,37,45,54,55,57,59-61,63,65,67,75,84,85,87,89-91,93,95,97,105,116]", siUnspecified, siPersistentOperation, siKeepGenOpInputs,null)(0);
	var NewObj = Cur.OutputPorts(0).Target2.Parent;
	NewObj.Name = "Sphere_Icon";
	var oSelF = SelectObj([Sphere,NewObj]);
	FreezeObj(oSelF);
	DeleteObj(Sphere);
	SetValue("preferences.scripting.cmdlog", true, null);
	return NewObj;
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
function Arrow( )
{
	var Cur = SICreateCurve("crvlist",1,1);
	SIAddPointOnCurveAtEnd(Cur, -9.99503051035502E-02, 0, -0.985333495618306, false, 0, null);
	SIAddPointOnCurveAtEnd(Cur, 9.99503051035502E-02, 0, -0.985333495618306, false, 0, null);
	SIAddPointOnCurveAtEnd(Cur, 9.99503051035502E-02, 0, 0.5, false, 0, null);
	SIAddPointOnCurveAtEnd(Cur, 0.308894230769231, 0, 0.5, false, 0, null);
	SIAddPointOnCurveAtEnd(Cur, 0, 0, 0.992810296756103, false, 0, null);
	SIAddPointOnCurveAtEnd(Cur, -0.308894230769231, 0, 0.5, false, 0, null);
	SIAddPointOnCurveAtEnd(Cur, -9.99503051035502E-02, 0, 0.5, false, 0, null);
	ApplyTopoOp("CrvOpenClose", Cur, 3, siPersistentOperation, null);
	Cur.Name = "Arrow_Icon";
	//SelectObj(Cur);
	return Cur
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
	Scale(oCurveList, 0.4, 0.4, 0.4, siAbsolute);
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
	return Selection(0); 
}
function Diamond( )
{
	SetValue("preferences.scripting.cmdlog", false, null);
	var Dia = CreatePrim("Octahedron", "MeshSurface");
	SetValue(Dia + ".octahedron.radius", 1, null);
	Scale( Dia , 1, 0.6, 1, siAbsolute);
	Rotate( Dia , 0, -45, 0, siRelative);
	var Cur = ApplyGenOp("ExtractEdgeLoopOp", "MeshSurface", Dia+".edge[*]", siUnspecified, siPersistentOperation, siKeepGenOpInputs,null)(0);
	var NewObj = Cur.OutputPorts(0).Target2.Parent;
	NewObj.Name = "Diamond_Icon";
	var oSelF = SelectObj([Dia,NewObj]);
	FreezeObj(oSelF);
	DeleteObj(Dia);
	ActivateObjectSelTool(null);
	SelectObj(NewObj);
	SetValue("preferences.scripting.cmdlog", true, null);
	return Selection(0); 
}