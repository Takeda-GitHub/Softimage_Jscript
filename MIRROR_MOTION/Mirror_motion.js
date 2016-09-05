var oRoot = ActiveProject.ActiveScene.Root;
var oModel = Selection(0);
var oName = oModel.name;
var objs = oModel.groups;//選択から、グループを取得
if(oModel.type == "#model")
{

Flag = 0 ;
               for ( var i=0; i<objs.count; i++ )
               {
                    if(objs(i).name == "MIRROR_XZ")
                         {
                              Flag = Flag + 1 ;
                         }
                    if(objs(i).name == "MIRROR_XY")
                         {
                              Flag = Flag + 1 ;
                         }
                    if(objs(i).name == "MIRROR")
                         {
                              Flag = Flag + 1 ;
                         }
                    else if(objs(i).name == "POS")
                         {
                              Flag = Flag + 1 ;
                         }
                    else if(objs(i).name == "ROT1")
                         {
                              Flag = Flag + 1 ;
                         }
                    }
          if(Flag == 5)
               {
                    Flag = 0 ;
					Logmessage("OK");
                    var oLen_XZ = new Array();
                    var oLen_XY = new Array();
					var oLen_YZ = new Array();
                    var oSel_MIRROR_XZ = SelectMembers(oName+".MIRROR_XZ", null, null);
                    for ( g=0 ; g <oSel_MIRROR_XZ.count ;  g += 2)
                         {
                              var RotX_M = oSel_MIRROR_XZ(g).kinematics.Local.Parameters("rotx").Source;
                                        if (RotX_M == "FCurve")
                                   {
                                        SwapCopy(oSel_MIRROR_XZ,g);
                                        oLen_XZ.push(oSel_MIRROR_XZ(g));
										oLen_XZ.push(oSel_MIRROR_XZ(g+1));
                                   }

                         }
                    var oSel_MIRROR_XY = SelectMembers(oName+".MIRROR_XY", null, null);
                    for ( r=0 ; r <oSel_MIRROR_XY.count ;  r += 2)
                         {
                              var RotY_M = oSel_MIRROR_XY(r).kinematics.Local.Parameters("roty").Source;
                                        if (RotY_M == "FCurve")
                                   {
                                        SwapCopy(oSel_MIRROR_XY,r);
                                        oLen_XY.push(oSel_MIRROR_XY(r));
										oLen_XY.push(oSel_MIRROR_XY(r+1));
                                   }

                         }
                    var oSel_MIRROR = SelectMembers(oName+".MIRROR", null, null);
                    for ( a=0 ; a <oSel_MIRROR.count ;  a += 2)
                         {
                              var PosX_M = oSel_MIRROR(a).kinematics.Local.Parameters("posx").Source;
                                        if (PosX_M == "FCurve")
                                   {
                                        SwapCopy(oSel_MIRROR,a);
                                   }
                         }
               var oSel_Pos = SelectMembers(oName+".POS", null, null);
                    for ( b=0 ; b <oSel_Pos.count ;  b++)
                         {
                         var POSX_M = oSel_Pos(b).kinematics.Local.Parameters("posx").Source;
                                   if (POSX_M == "FCurve")
                                   {
									for ( bb=0 ; bb <POSX_M.keys.count ;  bb++)
										{
											POSX_M.keys(bb).value = POSX_M.keys(bb).value * -1
										}
                                   }
                         }
               var oSel_Rot = SelectMembers(oName+".ROT1", null, null);
               for ( c=0 ; c <oSel_Rot.count ;  c++)
                    {
					var adjust_XZ = 0 ;
					var adjust_XY = 0 ;
					var adjust_YZ = 0 ;
                    var ROTY_M = oSel_Rot(c).kinematics.Local.Parameters("roty").Source;
                              if ( ROTY_M == "FCurve")
                              {
                                   for ( le=0 ; le < oLen_XZ.length ;  le++)
                                             {
                                               if(oLen_XZ[le].name == oSel_Rot(c).name)
                                                  {
                                                       adjust_XZ = adjust_XZ + 1 ;
                                                  }
                                             }
								  for ( lp=0 ; lp < oLen_YZ.length ;  lp++)
                                             {
                                               if(oLen_YZ[lp].name == oSel_Rot(c).name)
                                                  {
                                                       adjust_YZ = adjust_YZ + 1 ;
                                                  }
                                             }
                                   if(adjust_XZ == 1)
                                        {
                                             var ROTX_M_Inb = oSel_Rot(c).kinematics.Local.Parameters("rotx").Source;
                                             var ROTZ_M_Inb = oSel_Rot(c).kinematics.Local.Parameters("rotz").Source;
                                             for ( xx=0 ; xx <ROTX_M_Inb.keys.count ;  xx++)
                                                  {
                                                       ROTX_M_Inb.keys(xx).value = ROTX_M_Inb.keys(xx).value * -1
                                                  }
                                             for ( zzz=0 ; zzz <ROTZ_M_Inb.keys.count ;  zzz++)
                                                  {
                                                       ROTZ_M_Inb.keys(zzz).value = ROTZ_M_Inb.keys(zzz).value * -1
                                                  }
                                         }
									else if(adjust_YZ == 1)	
										 {
											 var ROTY_M_Inb = oSel_Rot(c).kinematics.Local.Parameters("roty").Source;
                                             var ROTZ_M_Inb = oSel_Rot(c).kinematics.Local.Parameters("rotz").Source;
                                             for ( xx=0 ; xx <ROTY_M_Inb.keys.count ;  xx++)
                                                  {
                                                       ROTY_M_Inb.keys(xx).value = ROTY_M_Inb.keys(xx).value * -1
                                                  }
                                             for ( zzz=0 ; zzz <ROTZ_M_Inb.keys.count ;  zzz++)
                                                  {
                                                       ROTZ_M_Inb.keys(zzz).value = ROTZ_M_Inb.keys(zzz).value * -1
                                                  }
										 }
                                    else
                                         {
                                             for ( cc=0 ; cc <ROTY_M.keys.count ;  cc++)
                                                  {
                                                       ROTY_M.keys(cc).value = ROTY_M.keys(cc).value * -1
                                                  }
                                         }

                              }
                    var ROTZ_M = oSel_Rot(c).kinematics.Local.Parameters("rotz").Source;
                              if ( ROTZ_M == "FCurve")
                                   {
                                        for ( ll=0 ; ll < oLen_XY.length ;  ll++)
                                             {
                                               if(oLen_XY[ll].name == oSel_Rot(c).name)
                                                  {
                                                       adjust_XY = adjust_XY + 1 ;
                                                  }
                                             }
                                   if(adjust_XY == 1)
                                        {
											var ROTX_M_Inb = oSel_Rot(c).kinematics.Local.Parameters("rotx").Source;
											var ROTY_M_Inb = oSel_Rot(c).kinematics.Local.Parameters("roty").Source;
											for ( xxx=0 ; xxx <ROTX_M_Inb.keys.count ;  xxx++)
                                                  {
                                                       ROTX_M_Inb.keys(xxx).value = ROTX_M_Inb.keys(xxx).value * -1
                                                  }
											for ( zzzz=0 ; zzzz <ROTY_M_Inb.keys.count ;  zzzz++)
                                                  {
                                                       ROTY_M_Inb.keys(zzzz).value = ROTY_M_Inb.keys(zzzz).value * -1
                                                   }
                                        }
                                   else
                                        {
											for ( cc=0 ; cc <ROTZ_M.keys.count ;  cc++)
                                                  {
                                                       ROTZ_M.keys(cc).value = ROTZ_M.keys(cc).value * -1
                                                  }
                                        }
                                   }
                    }
               }
}
//////////////////////////////////////////////////////////////////////
function  SwapCopy(target,No)
{
          CopyAllAnimation2(target(No));
          GetPrim("Torus", "Hokan");
          PasteAllAnimation("Hokan");
          CopyAllAnimation2(target(No+1));
          PasteAllAnimation(target(No));
          CopyAnimation("Hokan");
          PasteAllAnimation(target(No+1));
          DeleteObj("Hokan");
}
////////////////////////////////////////////////////////////////////////