'########'########'########'########'########'########'########'########'
'Invert a constraint. if A -> B then B -> A
'You need to select the constraint itself, or the constrained object.
'
'Some constraint types are can't be inverted. Currently I can invert
'The following:
'	Position, Orientation, Direction, Pose, Distance, Scaling
'
'Animated constraint parameters are not supported
'UpVectors constraints are not supported.
'
'
'AUTHOR: Olivier Ozoux
'VERSION: 0.0 (XSI v1.5)
'REVISION: 2000-Sep-07
'########'########'########'########'########'########'########'########'


Option Explicit

InvertConstraintProc
'--------'--------'--------'--------'--------'--------'--------'--------'
sub InvertConstraintProc()
'--------'--------'--------'--------'--------'--------'--------'--------'
	Dim myObj, allCns, myCns 
	for each myObj in GetValue("SelectionList")
		Select Case myObj.Families
			Case "Constraints"
				InvertConstraint myObj
				AddToSelection myObj
			Case "3D Objects"
				set allCns = EnumElements(myObj &_
					".kine.Constraints", TRUE)
				for each myCns in allCns
						InvertConstraint myCns
				next
		End Select
	next
end sub

'--------'--------'--------'--------'--------'--------'--------'--------'
sub InvertConstraint(inCns)
'--------'--------'--------'--------'--------'--------'--------'--------'
	Dim myConstrainers, myConstrainees, myCnsType
	myCnsType = inCns.type
	LogMessage myCnsType
	Select Case myCnsType
		Case "local"
		Case "poscns"
			set myConstrainers = inCns.Constraining
			set myConstrainees = inCns.Constrained
			DeleteObj inCns
			set inCns = ApplyCns( "Position",_
			myConstrainers(0), myConstrainees, TRUE )
		Case "oricns"
			set myConstrainers = inCns.Constraining
			set myConstrainees = inCns.Constrained
			DeleteObj inCns
			set inCns = ApplyCns( "Orientation",_
			myConstrainers(0), myConstrainees, TRUE )
		Case "dircns"
			set myConstrainers = inCns.Constraining
			set myConstrainees = inCns.Constrained
			DeleteObj inCns
			set inCns = ApplyCns( "Direction",_
			myConstrainers(0), myConstrainees, TRUE )
		Case "posecns"
			set myConstrainers = inCns.Constraining
			set myConstrainees = inCns.Constrained
			Dim myCnsPos,myCnsOri,myCnsScl,myAffByOri,myAffByScl
			myCnsPos = GetValue(inCns & ".cnspos")
			myAffByOri = GetValue(inCns & ".affbyori")
			myAffByScl = GetValue(inCns & ".affbyscl")
			myCnsOri = GetValue(inCns & ".cnsori")
			myCnsScl = GetValue(inCns & ".cnsscl")
			DeleteObj inCns
			set inCns = ApplyCns( "Pose",_
			myConstrainers(0), myConstrainees, TRUE )
			SetValue inCns & ".cnspos", myCnsPos
			SetValue inCns & ".affbyori", myCnsOri
			SetValue inCns & ".affbyscl", myCnsScl		
			SetValue inCns & ".cnsori", myCnsOri
			SetValue inCns & ".cnsscl", myCnsScl
		Case "distcns"
			set myConstrainers = inCns.Constraining
			set myConstrainees = inCns.Constrained
			DeleteObj inCns
			set inCns = ApplyCns( "Distance",_
			myConstrainers(0), myConstrainees, TRUE )
		Case "sclcns"
			set myConstrainers = inCns.Constraining
			set myConstrainees = inCns.Constrained
			DeleteObj inCns
			set inCns = ApplyCns( "Scaling",_
			myConstrainers(0), myConstrainees, TRUE )

		Case Else
			LogMessage "Constraint of type: " &_
			myCnsType & " can't be inverted!"
			RemoveFromSelection inCns
	End Select
end sub
