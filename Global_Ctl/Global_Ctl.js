var oHako = XSIFactory.CreateObject( "XSI.Collection" );//���쐬
var oStart = GetValue("PlayControl.In");//�t�H���[�h�t���[�����擾
var oEnd = GetValue("PlayControl.Out");
var Fl = oEnd - oStart+1;//�G���h�t���[�����擾
var oSel = Getvalue("SelectionList");// �I�����擾
     var rtn = GetKeyboardState();//������Ă���A�L�[�̃X�e�[�^�X���擾
     Key_st = rtn(1);//�߂�l���ŕԂ�
     LogMessage( "������Ă���L�[�̃X�e�[�^�X = " + Key_st);
if (oSel.Count > 0 )
     {
     var str = "";//��ϐ�
     if ( 1 & Key_st )
          {
          str = "Shift "
          }
   
          if ( str == "" )
               {
                    LogMessage(  "�V�t�g������ĂȂ���ŁA���ʂɏ������܂��B" );
                         for (var a=0; a<oSel.Count; a++)
                         {
                              var Getimplicit = GetPrim("Cone");//�R���g���[���[�쐬
                              var SelName = oSel(a).name;//�I���������̖��O���擾
                              Getimplicit.name = SelName+"_Global"
                              ////////////////////////////////////////////////////////////
                              //SRT�`�F�b�N
                              KeyPos = oSel(a).kinematics.Local.posx.Source;//�|�W�V�����̃A�j���[�V�����f�[�^���擾
                              KeyRot = oSel(a).kinematics.Local.rotx.Source;//���b�g�̃A�j���[�V�����f�[�^���擾
                              KeyScl = oSel(a).kinematics.Local.sclx.Source;//�X�P�[���̃A�j���[�V�����f�[�^���擾
                                   if(KeyPos == "FCurve" && KeyRot == "FCurve" && KeyScl == "FCurve")//�|�W�V�����ƃ��b�g�ƃX�P�[��
                                        {
                                        ApplyCns("Pose", Getimplicit, oSel(a));//�S�ĂȂ̂ŁA�|�[�Y�R���X�g���C�������s
                                        SetMarking("kine.local.pos");
                                        AddToMarking("kine.local.ori");
                                        AddToMarking("kine.local.scl");
                                        PlotAndApplyActions("", "plot", oStart, oEnd, null, 20, 3, null, null, null, null, true,
true);
                                        ClearMarking();
                                        Inbert();
                                        oHako.add(Getimplicit);
                                        }
                                   else if (KeyPos == "FCurve" && KeyRot == "FCurve")//�|�W�V�����ƃ��b�g
                                        {
                                        ApplyCns("Position", Getimplicit, oSel(a));
                                        ApplyCns("Orientation", Getimplicit, oSel(a));
                                        SetMarking("kine.local.pos");
                                        AddToMarking("kine.local.ori");
                                        PlotAndApplyActions("", "plot", oStart, oEnd, null, 20, 3, null, null, null, null, true,
true);
                                        ClearMarking();
                                        Inbert();
                                        oHako.add(Getimplicit);
                                        }
                                   else if (KeyRot == "FCurve" && KeyScl == "FCurve")//���b�g�ƃX�P�[��
                                        {
                                        ApplyCns("Scaling", Getimplicit, oSel(a));
                                        ApplyCns("Orientation", Getimplicit, oSel(a));
                                        SetMarking("kine.local.scl");
                                        AddToMarking("kine.local.ori");
                                        PlotAndApplyActions("", "plot", oStart, oEnd, null, 20, 3, null, null, null, null, true,
true);
                                        ClearMarking();
                                        Inbert();
                                        oHako.add(Getimplicit);
                                        }
                                   else if (KeyPos == "FCurve" && KeyScl == "FCurve")//�|�W�V�����ƃX�P�[��
                                        {
                                        ApplyCns("Scaling", Getimplicit, oSel(a));
                                        ApplyCns("Position", Getimplicit, oSel(a));
                                        SetMarking("kine.local.pos");
                                        AddToMarking("kine.local.ori");
                                        PlotAndApplyActions("", "plot", oStart, oEnd, null, 20, 3, null, null, null, null, true,
true);
                                        ClearMarking();
                                        Inbert();
                                        oHako.add(Getimplicit);
                                        }
                                   else if (KeyPos == "FCurve")//�|�W�V����
                                        {
                                        ApplyCns("Position", Getimplicit, oSel(a));
                                        SetMarking("kine.local.pos");
                                        PlotAndApplyActions("", "plot", oStart, oEnd, null, 20, 3, null, null, null, null, true,
true);
                                        ClearMarking();
                                        Inbert();
                                        oHako.add(Getimplicit);
                                        }
                                   else if (KeyRot == "FCurve")//���b�g
                                        {
                                        ApplyCns("Orientation", Getimplicit, oSel(a));
                                        SetMarking("kine.local.ori");
                                        PlotAndApplyActions("", "plot", oStart, oEnd, null, 20, 3, null, null, null, null, true,
true);
                                        ClearMarking();
                                        Inbert();
                                        oHako.add(Getimplicit);
                                        }
                                   else if (KeyScl == "FCurve")//���b�g
                                        {
                                        ApplyCns("Scaling", Getimplicit, oSel(a));
                                        SetMarking("kine.local.scl");
                                        PlotAndApplyActions("", "plot", oStart, oEnd, null, 20, 3, null, null, null, null, true,
true);
                                        ClearMarking();
                                        Inbert();
                                        oHako.add(Getimplicit);
                                        }
                                   else
                                        {
                                        var buttonPressed = XSIUIToolkit.Msgbox( "�I���������ɃA�j���[�V���������蓖�Ă��Ă��܂���I", siMsgOkOnly | siMsgQuestion, "�x��" );
                                        }
                                   ////////////////////////////////////////////////////////////
                              }
                    }
               else
                    {
                         LogMessage( str + "��������Ă邩��A�ړ��A��]�ŃO���[�o���R���g���[���[�������܂�" );
                         var Getimplicit = GetPrim("Cube");//�R���g���[���[�쐬
                         var SelName = oSel(0).name;//�I���������̖��O���擾
                         Getimplicit.name = SelName+"_Global_PO"
                              KeyPos_0 = oSel(0).kinematics.Local.posx.Source;
                              KeyRot_0 = oSel(0).kinematics.Local.rotx.Source;
                              KeyPos_1 = oSel(1).kinematics.Local.posx.Source;
                              KeyRot_1 = oSel(1).kinematics.Local.rotx.Source;
                                   if (KeyPos_0 == "FCurve" &&  KeyRot_1 == "FCurve")//�|�W�V�����ƃ��b�g
                                        {
                                        ApplyCns("Position", Getimplicit, oSel(0));
                                        ApplyCns("Orientation", Getimplicit, oSel(1));
                                        SetMarking("kine.local.pos");
                                        AddToMarking("kine.local.ori");
                                        PlotAndApplyActions("", "plot", oStart, oEnd, null, 20, 3, null, null, null, null, true,
true);
                                        ClearMarking();
                                        Inbert();
                                        oHako.add(Getimplicit);
                                        }
                                   else if (KeyRot_0 == "FCurve" && KeyPos_1 == "FCurve")//�|�W�V�����ƃ��b�g
                                        {
                                        ApplyCns("Position", Getimplicit, oSel(1));
                                        ApplyCns("Orientation", Getimplicit, oSel(0));
                                        SetMarking("kine.local.pos");
                                        AddToMarking("kine.local.ori");
                                        PlotAndApplyActions("", "plot", oStart, oEnd, null, 20, 3, null, null, null, null, true,
true);
                                        ClearMarking();
                                        Inbert();
                                        oHako.add(Getimplicit);
                                        }
                    }
     }
     else
     {
     var buttonPressed = XSIUIToolkit.Msgbox( "�����I�΂�Ă��܂����", siMsgOkOnly | siMsgQuestion, "����" );
     }
    
SelectObj(oHako, null, true);

function Inbert()
{
   var oConstraints = Getimplicit.Kinematics.Constraints;//�I�𒆂̕��̃R���X�g���C���Ƃ��擾
   Logmessage(oConstraints.Count);//�R���X�g���C���I�y���[�^�̃J�E���g
   if (oConstraints.Count != 0 )//�I�y���[�^���u0�v����Ȃ��ꍇ���L�����s
     {
     var oConst_Value_Saki = new Array();//��̔z����쐬�B��Ŏg���܂��B
          var oConst_Value_Moto = new Array();//��̔z����쐬�B��Ŏg���܂��B
       var oConst_Type = new Array();//��̔z����쐬�B��Ŏg���܂��B

          for (var i=0; i<oConstraints.Count; i++)//�I�y���[�^�[����                   
          {
          var oConst_info = oConstraints(i).Name;//�R���X�g�̎�ނ��擾
          Logmessage(oConst_info);//�����o��
          var oConstrained = oConstraints(i).Constrained;//�R���X�g�����擾
       oConst_Value_Moto.push(oConstrained);
          var oConstraining = oConstraints(i).Constraining;//�R���X�g����擾
       oConst_Value_Saki.push(oConstraining);
          Logmessage(oConstrained+oConstraining);//�������L�q
               switch (oConst_info)
                  {//�R���X�g�̖��O�ʂɂ��X�C�b�`����
                    case "Position Cns"://�u�|�W�V�����R���X�g�v�̏ꍇ���L�����s
                         var oConst_info_after = "Position";
                         Logmessage(oConst_info_after);
                         DeleteObj(oConstraints(i));//�I�y���[�^���폜
                         oConst_Type.push(oConst_info_after);
                    break;
                    case "Direction Cns"://�u�f�B���N�V�����R���X�g�v�̏ꍇ���L�����s
                         var oConst_info_after = "Direction";
                         Logmessage(oConst_info_after);
                         DeleteObj(oConstraints(i));//�I�y���[�^���폜
                         oConst_Type.push(oConst_info_after);
                    break;
                    case "Orientation Cns"://�u�I���G���e�[�V�����R���X�g�v�̏ꍇ���L�����s
                         var oConst_info_after = "Orientation";
                         Logmessage(oConst_info_after);
                         DeleteObj(oConstraints(i));//�I�y���[�^���폜
                         oConst_Type.push(oConst_info_after);
                    break;
                    case "Pose Cns"://�u�|�[�Y�R���X�g�v�̏ꍇ���L�����s
                         var oConst_info_after = "Pose";
                         Logmessage(oConst_info_after);
                         DeleteObj(oConstraints(i));//�I�y���[�^���폜
                         oConst_Type.push(oConst_info_after);
                    break;
                    }
        }
     for ( var i = 0; i < oConst_Type.length; ++i ) //�z��ɂ��鐔�̕�FOR�ŉ�
     {
     ApplyCns(oConst_Type[i],oConst_Value_Saki[i],oConst_Value_Moto[i],true);
     }   
  }
}