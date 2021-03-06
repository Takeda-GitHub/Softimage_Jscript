///////////////////////////////////////////////////////////////
var oPath = ActiveProject2.Path + "\\";
var mixPath = oPath + "Situation14\\";
var savePath = oPath + "fbx\\";

///////////////////////////////////////////////////////////////

var oFiles = FindFilesInFolder(mixPath, null, true, false );
for(i=0; i < oFiles.length; i++){
	
	SelectObj("fpl_hh00.Player_bone", null, null);
	ImportMixer(mixPath + oFiles[i], "fpl_hh00", null, null);
	var endTime = GetEndTime();
	
	SelectObj("Bip", "BRANCH", null);
	SelectChildNodes(null, null, null);
	PlotConstrainedTransformsToActions(null, "plot", 0, endTime, 1, 20, 3, false, 0.01, true, true, true, true, true);
	RemoveCns(null, "", null);
	SelectObj("fpl_hh00", "BRANCH", null);
	FBXExportAnimation(true);
	FBXExportSelection(true);
	FBXExportUnit("10Millimeters");
	FBXExport(savePath + (oFiles[i].split(".")[0]) + ".fbx");
///////////////////////////////////////////////////////////////
//ここでシーン名を記載してください。(絶対パス)
	OpenScene("D:\\test\\Scenes\\Model.scn", false);
}
var buttonPressed = XSIUIToolkit.Msgbox( "終了", siMsgOkOnly | siMsgQuestion, "お知らせ" );

function GetEndTime(){
	var oEndTime = 0;
	for(j=0;j < ActiveSceneRoot.Mixer.Tracks.count;j++){
		oClip = ActiveSceneRoot.Mixer.Tracks(j).Clips(0);
		if(oClip){
			mixEndTime = parseInt(GetValue(oClip.TimeControl.endTime));
		}
		oEndTime = (oEndTime < mixEndTime) ? mixEndTime : oEndTime;
	}

	return(oEndTime -1);
}
