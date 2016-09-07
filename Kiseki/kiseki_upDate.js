var In =  Getvalue("PlayControl.In");
var Out = Getvalue("PlayControl.Out")+1 ;
PlotConstrainedTransformsToActions("KenKiseki.KenSaki", "plot", In, Out, 1, 20, 3, false, 0.01, true, true, true, true, false);
PlotConstrainedTransformsToActions("KenKiseki.KenMoto", "plot", In, Out, 1, 20, 3, false, 0.01, true, true, true, true, false);
