var fs = new ActiveXObject('Scripting.FileSystemObject');
var scenePath = ActiveProject.ActiveScene.Parameters('Filename').Value;
var BaseName = fs.GetBaseName(scenePath);
var FolderPath = fs.GetParentFolderName(scenePath);
var TextFilePath = FolderPath + '/' + BaseName + '_MaterialColor.txt';
var TextCode = fs.CreateTextFile(TextFilePath, true, false);

var oSel = Getvalue("SelectionList");
for( var i =0; i < oSel.count;i++)
{
if(oSel(i).type == "polymsh")
{
try
	{
	var Material = oSel(i).Material;
	var Mate_Name = oSel(i).Material.name;
	var Shaders = Material.GetAllShaders();
	var REAL = new Array();
	var OUT = new Array();
	var COLOR = new Array();
		for(var r = 0 ; r < Shaders.Count ; r++)
		{
			if(Shaders(r).name.match(/OGL13Draw.*/) || Shaders(r).name.match(/OGL1Pass.*/) || Shaders(r).name.match(/OGLAlphaTrans.*/))
				{
				REAL.push(Shaders(r))
				}
		}
	var Red_Ori = REAL[0].Shaders(0).Diffuse.red.value;// リアルタイム側赤
	var Green_Ori = REAL[0].Shaders(0).Diffuse.Green.value;//リアルタイム側緑
	var Blue_Ori = REAL[0].Shaders(0).Diffuse.Blue.value;//リアルタイム側青
	var R1 = Red_Ori * 100;
	var G1 = Green_Ori * 100;
	var B1 = Blue_Ori * 100;
	R1 = Math.round(R1);
	G1 = Math.round(G1);
	B1 = Math.round(B1);
	var Red   = R1 / 100;
	var Green = G1 / 100;
	var Blue  = B1 / 100;
	COLOR[0].Diffuse.red.value = Red;
	COLOR[0].Diffuse.Green.value = Green;
	COLOR[0].Diffuse.Blue.value = Blue;
	TextCode.WriteLine('オブジェクト名:' + oSel(i).fullname );
	TextCode.WriteLine('マテリアル名:' + Mate_Name );
	TextCode.WriteLine('R:' + Red );
	TextCode.WriteLine('G:' + Green );
	TextCode.WriteLine('B:' + Blue );
	extCode.WriteLine();
	}
catch( e ){
Logmessage("no");
}
}
else
{
Logmessage("non");
}
}	
TextCode.Close();
var Ed = XSIUIToolkit.Msgbox( "おしまい", siMsgOkOnly | siMsgQuestion, "おしまい" );