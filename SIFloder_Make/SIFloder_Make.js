var objFSO = new ActiveXObject("Scripting.FileSystemObject");
var Shell = new ActiveXObject("Shell.Application")
var objFolder = Shell.BrowseForFolder( 0, "Floder_Pick",  0, "Z:\\" );
if(!objFolder) {
    WScript.Echo("Selection Floder");
    WScript.Quit();
}
//var SelPath = objFolder.Items().Item().Path;
//WScript.Echo(SelPath);
var GetFolder = objFSO.GetFolder(objFolder);
SubFolder(GetFolder);
var objFSO = "";


function SubFolder(Floder)
{
	var SubF = Floder.SubFolders;
	var emF = new Enumerator( SubF );
	var Flag = 0;
	for( emF.moveFirst(); !emF.atEnd(); emF.moveNext() )
	{
		var oSubItems = emF.item();
		//WScript.Echo(oSubItems.Name);
		if(oSubItems.Name == "system")
			{
				Flag = Flag + 1;
			}
		if(oSubItems.Name == "Scenes")
			{
				Flag = Flag + 1;
			}
		if( Flag == 2 )
			{	
				var CreateF = objFSO.GetParentFolderName(oSubItems);
				CreateXsiFloder(CreateF);
			}
		else
			{
				SubFolder(oSubItems);
			}
	}
}

function CreateXsiFloder(Projects_Floder)
{
	if(! objFSO.FolderExists(Projects_Floder + "\\Action" )){objFSO.CreateFolder(Projects_Floder + "\\Action");}
	if(! objFSO.FolderExists(Projects_Floder + "\\Audio" )){objFSO.CreateFolder(Projects_Floder + "\\Audio");}
	if(! objFSO.FolderExists(Projects_Floder + "\\Backup" )){objFSO.CreateFolder(Projects_Floder + "\\Backup");}
	if(! objFSO.FolderExists(Projects_Floder + "\\Composites" )){objFSO.CreateFolder(Projects_Floder + "\\Composites");}
	if(! objFSO.FolderExists(Projects_Floder + "\\dotXSI" )){objFSO.CreateFolder(Projects_Floder + "\\dotXSI");}
	if(! objFSO.FolderExists(Projects_Floder + "\\Expressions" )){objFSO.CreateFolder(Projects_Floder + "\\Expressions");}
	if(! objFSO.FolderExists(Projects_Floder + "\\FCurves" )){objFSO.CreateFolder(Projects_Floder + "\\FCurves");}
	if(! objFSO.FolderExists(Projects_Floder + "\\MatLib" )){objFSO.CreateFolder(Projects_Floder + "\\MatLib");}
	if(! objFSO.FolderExists(Projects_Floder + "\\Models" )){objFSO.CreateFolder(Projects_Floder + "\\Models");}
	if(! objFSO.FolderExists(Projects_Floder + "\\Pictures" )){objFSO.CreateFolder(Projects_Floder + "\\Pictures");}
	if(! objFSO.FolderExists(Projects_Floder + "\\Queries" )){objFSO.CreateFolder(Projects_Floder + "\\Queries");}
	if(! objFSO.FolderExists(Projects_Floder + "\\Render_Archives" )){objFSO.CreateFolder(Projects_Floder + "\\Render_Archives");}
	if(! objFSO.FolderExists(Projects_Floder + "\\Render_Pictures" )){objFSO.CreateFolder(Projects_Floder + "\\Render_Pictures");}
	if(! objFSO.FolderExists(Projects_Floder + "\\Scripts" )){objFSO.CreateFolder(Projects_Floder + "\\Scripts");}
	if(! objFSO.FolderExists(Projects_Floder + "\\Simulation" )){objFSO.CreateFolder(Projects_Floder + "\\Simulation");}
	if(! objFSO.FolderExists(Projects_Floder + "\\Synoptic" )){objFSO.CreateFolder(Projects_Floder + "\\Synoptic");}
	if(! objFSO.FolderExists(Projects_Floder + "\\Thumbnails" )){objFSO.CreateFolder(Projects_Floder + "\\Thumbnails");}
}
