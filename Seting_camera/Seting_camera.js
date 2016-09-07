var oSel = Selection(0);
var oRoot = ActiveSceneRoot;
var oHako = XSIFactory.CreateObject( "XSI.Collection" );
var oGeo = oSel.ActivePrimitive.Geometry;
var oVertex = oGeo.points;
for (var k=0;k<oVertex.Count;k++)
	{
		var Clu = CreateCluster(oVertex(k));
		oHako.add(Clu);
	}
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
	var Nulls = oRoot.AddNull("Cameras");
	var Cam_Model = oRoot.AddModel([oSel,NewObj,Nulls],"CameraRig1");
	ParentObj(oSel, NewObj);
for (var k=0;k<oVertex.Count;k++)
	{
		var oCheckCam = Nulls.AddCameraRig( "Camera", "CamRig1" );
		oCheckCam.camera.std.value = 17;
		oCheckCam.name = "CamRootRig1"
		oCheckCam.camera.name = "Cam1";
		oCheckCam.camera.interest.name = "CamIntrest1";
		ApplyCns("Pose", oCheckCam.camera.interest, NewObj);
		ApplyCns("ObjectToCluster", oCheckCam.camera, oHako(k));
		ApplyCns("Scaling", oCheckCam.camera, oSel);
		

		
	}