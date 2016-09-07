var oCu = GetValue("PlayControl.Current");
var oSel = GetValue("SelectionList");
for ( var i=0; i<oSel.count; i++ )
{
     Logmessage(oSel(i));
    var oParams = oSel(i).NodeAnimatedParameters();
    for ( var j=0; j<oParams.count; j++ )
    {    
        var oSource = oParams(j).Source;
        if ( oSource.IsClassOf( siFCurveID ) )
          {
          oSource.BeginEdit();
          var key = oSource.GetKeyIndex( oCu );
     if(key == -1)
          {
          Logmessage("キーがないですｾﾞ");
          }
     else
          {
          oSource.RemoveKey(oCu)
          }
          oSource.EndEdit();
          }
     }
}