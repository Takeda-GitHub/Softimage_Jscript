var oP = XSIFactory.CreateObject( "CustomProperty" );
oP.name = "XML �����o��";//�^�C�g���\��
oP.AddParameter2( "FileName", siString,"Temp");
oP.AddParameter2( "FilePath", siString,"D:\\");
oP.AddParameter2( "Root", siBool,true);
///////////////////////////////////////////////////////////////////////////////////
var oL, oItem;//��̐錾
oL = oP.PPGLayout;//PPG��ǉ�
oL.AddRow();//�^�C�g���ȉ��ɃO���[�v��ǉ�
oL.SetAttribute( siUICX, 300 );
     oL.AddGroup( "", true, 300);
          oItem = oL.AddItem( "FileName", "�t�@�C����" );
          oItem = oL.AddItem ("FilePath","FilePath",siControlFolder );
       oItem.SetAttribute(siUINolabel,true);
       oItem.SetAttribute (siUIWidthPercentage,80);
       oItem = oL.AddItem( "Root", "�V�[�����[�g�̃O���[�v�������o��" );
          oItem = oL.AddButton( "Set", "�����o��" );
          oItem.SetAttribute( siUICX, 300 );
          oItem.SetAttribute( siUICY, 50 );
    oL.EndGroup();
oL.EndRow();
///////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////
//���s��
oL.Language = "JScript";
oL.Logic = Set_OnClicked.toString();
/////////////////////////////////////
function Set_OnClicked()
{
     var Path =  PPG.FilePath.value;
     var FileName = PPG.FileName.value;
     var oRoot_G = PPG.Root.value;
     var oXSIUIT = new ActiveXObject( "XSI.UIToolkit" );
     var xmlDoc = new ActiveXObject("MSXML2.DOMDocument.3.0");
     var rootElem = xmlDoc.createElement('Root');
     xmlDoc.appendChild(rootElem);
     ///////////////////////////////////////////////////////
     //�^�O�쐬
     var PosElem = xmlDoc.createElement('POS');
     var RotElem = xmlDoc.createElement('ROT');
     ///////////////////////////////////////////////////////
     //�q�m�[�h�쐬
     rootElem.appendChild(PosElem);
     rootElem.appendChild(RotElem);
     /////////////////////////////////////////////////////
     if(oRoot_G == true)
          {
          var oRoot = ActiveProject.ActiveScene.Root;
          var objs = oRoot.groups;
          }
     else
          {
          var oSeleModel = XSIInputBox("�����o���������f�����O���L�����ĉ������B\n\r��Model.Group�Ȃ�AModel������OK�ł��B","Model�I��","" ) ;
          if(oSeleModel != "" )
               {
                    try
                         {
                         var oTop = SelectObj(oSeleModel);
                         }
                    catch(e)
                         {
                    var File_error = oXSIUIT.Msgbox( "����ȃ��f�����݂��܂���B","48","File_error");
                         return false;
                         }           
               var objs = Selection(0).groups;
            if(objs.count == 0)
                    {
                    var File_error = oXSIUIT.Msgbox( "���f���ɃO���\�v�������݂����ł��B","48","File_error");
                    }
               }
          else
               {
               var File_error = oXSIUIT.Msgbox( "�����L�����ĉ������B","48","File_error");
               }      
          }
     Counter = 0 ;
               for(var i=0;i<objs.count;i++)
               {
                    if(objs(i).name == "POS")
                         {
                              Counter = Counter + 1 ;
                         }
                    else if(objs(i).name == "ROT")
                         {
                              Counter = Counter + 1 ;
                         }
                    }
          if(Counter == 2)
               {
               Counter = 0 ;
                }
                          if(oRoot_G == false)
                              {
                               var osel_pos = SelectMembers( oSeleModel + ".POS", null, null);
                             }
                         else
                              {
                               var osel_pos = SelectMembers("POS", null, null);
                                }
               for(var b=0;b<osel_pos.count;b++){
                              var Pos_childElem = xmlDoc.createElement('POS_Node'+''+b);
                              PosElem.appendChild(Pos_childElem);
                              var oSel_Name_Pos = osel_pos(b).fullname;
                              var Out = oSel_Name_Pos.substring(oSel_Name_Pos.lastIndexOf("."));
                              var childAttr = xmlDoc.createTextNode(Out);
                              Pos_childElem.appendChild(childAttr);}
                       if(oRoot_G == false)
                              {
                               var osel_rot = SelectMembers( oSeleModel + ".ROT", null, null);
                             }
                         else
                              {
                               var osel_rot = SelectMembers("ROT", null, null);
                                }
               for(var b=0;b<osel_rot.count;b++){
                              var Rot_childElem = xmlDoc.createElement('ROT_Node'+''+b);
                              RotElem.appendChild(Rot_childElem);
                              var oSel_Name_Rot = osel_rot(b).fullname;
                              var Out = oSel_Name_Rot.substring(oSel_Name_Rot.lastIndexOf("."));
                              var childAttr = xmlDoc.createTextNode(Out);
                              Rot_childElem.appendChild(childAttr);}
     ////////////////////////////////////////////////////////
     var FilePath = Path+FileName+".xml";
     var Indent = new ActiveXObject("MSXML2.MXXMLWriter");
     Indent.omitXMLDeclaration = true;
     Indent.indent = true;
    
     var Read = new ActiveXObject("MSXML2.SAXXMLReader");
     Read.contentHandler = Indent;
     Read.parse(xmlDoc);
 
     Indent.flush;
     xmlDoc.loadXML(Indent.output);
     xmlDoc.save(FilePath);
}
InspectObj( oP, null, null, siLock );