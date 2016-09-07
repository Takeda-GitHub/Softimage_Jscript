	var oXSI = new ActiveXObject( "XSI.Application" );
	var oXSIAPP = oXSI.Application;
	var oXSIUIT = new ActiveXObject( "XSI.UIToolkit" );
	var oXSIFactory = new ActiveXObject( "XSI.Factory" );
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var PicPath = oXSIAPP.ActiveProject2.Path+"\\Scenes\\";
	var oFile_hako = oXSIFactory.CreateObject( "XSI.Collection" );
	var oFolder = fso.GetFolder(PicPath);
	var oFolder_File = new Array();
	var oEFiles = new Enumerator(oFolder.Files);
	while(!oEFiles.atEnd())
		{
			oFolder_File.push( oEFiles.item().Name );
			oEFiles.moveNext();
		}
	for ( y=0 ; y <oFolder_File.length ;  y++)
		{
			var Exten = getExtention(oFolder_File[y]);
			if(Exten == "scn"){
				OpenScene(PicPath + oFolder_File[y]);
				LastFrame();
				FirstFrame();
				var Null = GetPrim("Null", null, null, null);
				DeleteObj(Null);
				SaveScene();
			}
		}
		
function getExtention(fileName) {
  var ret;
  if (!fileName) {
    return ret;
  }
  var fileTypes = fileName.split(".");
  var len = fileTypes.length;
  if (len === 0) {
    return ret;
  }
  ret = fileTypes[len - 1];
  return ret;
}