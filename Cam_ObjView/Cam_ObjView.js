if (selection.count!=0){
	mCamera = selection(0).FindChildren("","camera")(0)
}
if (mCamera == null){

	var vw = GetFocusedViewport()
	var vwindex = [["A",0],["B",1],["C",2],["D",3]]
	switch(vw){
		case "A": var mCamera = GetViewCamera(0);break;
		case "B": var mCamera = GetViewCamera(1);break;
		case "C": var mCamera = GetViewCamera(2);break;
		case "D": var mCamera = GetViewCamera(3);break;
	}
}


var l = Desktop.ActiveLayout;
var v = l.CreateView( "Object View", "OV" );
v.SetAttributeValue("displayall", "true");
v.SetAttributeValue("camera", mCamera.name);