var oXSIFactory = new ActiveXObject( "XSI.Factory" );
var oSel = Getvalue("SelectionList");
var UnitValue = "10000";
if(oSel.count > 0)
     {
  ActivateObjectSelTool();
  var V_Value = XSIInputBox( " ポイント間の距離を指定して下さい。\nその値以下の距離間のポイント間は結合させます。", "Value", "0.12" );
     for (var i=0;i<oSel.Count;i++)
          {
               var  oGeo = oSel(i).activeprimitive.geometry;
               var oEdge = oGeo.Edges;
               var edgeCounter = 0;
                    for (var j=0;j<oEdge.Count;j++)
                         {
                              edgeCounter = edgeCounter + 1;
                              var oVertex = oEdge(j).NeighborVertices( 1 );
                              var vtxCounter = 0;
                                   for (var k=0;k<oVertex.Count;k++)
                                        {
                                                var X_POS = oVertex(k).Position.x;
                                                var Y_POS = oVertex(k).Position.y;
                                                var Z_POS = oVertex(k).Position.z;
                                                var X = Round(X_POS,UnitValue);
                                                var Y = Round(Y_POS,UnitValue);
                                                var Z = Round(Z_POS,UnitValue);

                                             if(vtxCounter == 0)
                                                  {
                                                       var x1 = X;
                                                       var y1 = Y;
                                                       var z1 = Z;
                                                       vtxCounter = vtxCounter + 1;
                                                  }
                                             else
                                                  {
                                                       var x2 = X;
                                                       var y2 = Y;
                                                       var z2 = Z;
                                                  }
                              }
                              var dx = Math.abs(x2 - x1);
                              var dy = Math.abs(y2 - y1);
                              var dz = Math.abs(z2 - z1);
                              var dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
                              if (dist < parseFloat(V_Value))
                                  {
                                  for (var k=0;k<oVertex.Count;k++)
                                      {
                                      ActivateVertexSelTool(null);
                                      AddToSelection(oVertex(k), null, true);
                                       }
                                    WeldPoints();
                                    DeselectAll();
                                   }
                         }
          } 
     }
else
     {
     Logmessage("オブジェクトを一つ以上選択してから実行してください。。");
     }
var Ed = XSIUIToolkit.Msgbox( "おしまい", siMsgOkOnly | siMsgQuestion, "おしまい" );

function Round(value,unit)
	{
	var CutUnit = unit;
	var Round = value * unit;
	Round = Math.round(Round);
	value = Round / unit;
	return value;
	}