﻿	var oXSI = new ActiveXObject( "XSI.Application" );
	var oXSIAPP = oXSI.Application;
	SetValue("preferences.scripting.cmdlog", false, null);
	SetValue("preferences.Interaction.autoinspect", false, null);
	var oXSIUIT = new ActiveXObject( "XSI.UIToolkit" );
	var oXSIFactory = new ActiveXObject( "XSI.Factory" );
	var fso = new ActiveXObject("Scripting.FileSystemObject");
	var PicPath = oXSIAPP.ActiveProject2.Path+"\\Scenes\\";
	var ProPath = oXSIAPP.ActiveProject2.Path;
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
				Clean()
				SaveScene();
			}
		}
	SetValue("preferences.scripting.cmdlog", true, null);
	SetValue("preferences.Interaction.autoinspect", true, null);
		
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

function Clean()
{
var scn = ActiveProject.ActiveScene;
var matlibs = scn.MaterialLibraries;
SetCurrentMaterialLibrary(matlibs(0));
var First = matlibs(0).name = "Lib_Def";
for(var i=0; i<matlibs.count;i++)
	{
	var A = matlibs(i).Items;
		if(A.Count > 0)
			{
				var B = SelectObj(A);
				var oSel = Getvalue("SelectionList");
				if(matlibs(i).name != First )
					{
					for(var q=0; q<oSel.count;q++)
						{
						MoveToLibrary(oSel(q), matlibs(0));
						}
					}
			}
	var C = matlibs(i).Items;//return_Sel
	if(C.Count<1)
		{
			DeleteObj(matlibs(i));
		}
	}
DeleteAllUnusedMaterials();
DeleteUnusedImageSources();
DeleteUnusedImageClips();
}