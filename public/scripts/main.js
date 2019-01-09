var loggedin = false;
<<<<<<< HEAD
var role = 'teacher';
var tname = 'Mr. Murphy';
=======
var role = 'student';
var tname = 'Mr. Murphy'; //var teacherName = 'Mr. Murphy';
>>>>>>> 57feddbc2421f9fac869c6f87526141b1eaeea13
var id = '2027266'; //Student ID
var dbRef = firebase.database().ref().child('students'); //Student database reference
var dbtref = firebase.database().ref().child('teachers'); //Teacher database reference 
var attendanceRef = firebase.database().ref().child('attendance'); //Attendence database reference

//DOM elements
var loginB = document.getElementById('loginButton');
var logoutB = document.getElementById('logoutButton');
var wrapper = document.getElementById("divWrapper");

//shows login button and hides logout button
function showLogin(){
	loginB.removeAttribute('hidden');
	logoutB.setAttribute('hidden', 'true');
}
//Button DOM elements
var loginB = document.getElementById('loginButton');
var logoutB = document.getElementById('logoutButton');

<<<<<<< HEAD
=======
//shows login button and hides logout button
function showLogin(){
	loginB.removeAttribute('hidden');
	logoutB.setAttribute('hidden', 'true');
}

>>>>>>> 57feddbc2421f9fac869c6f87526141b1eaeea13
//shows logout button and hides login button
function hideLogin(){
	loginB.setAttribute('hidden', 'true');
	logoutB.removeAttribute('hidden');
}

// Sign in Firebase using popup auth and Google as the identity provider.
function login() {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider);
}

<<<<<<< HEAD
// Sign out of Firebase.
function logout() {
=======
function logout() {
  // Sign out of Firebase.
>>>>>>> 57feddbc2421f9fac869c6f87526141b1eaeea13
  firebase.auth().signOut();
}

//user should be checked out at start
logout();

<<<<<<< HEAD
//initialize firebase, calls update whenever user logs in/out
=======
//initialize firebase
//this function is called all the way at the bottom
>>>>>>> 57feddbc2421f9fac869c6f87526141b1eaeea13
function initFirebaseAuth(){
	firebase.auth().onAuthStateChanged(update);
}

//Updates whenever a user logs in/out
function update(user){
<<<<<<< HEAD
	if(user){ //user is logged in!
		loggedin = true;
		console.log("Logged in: "+loggedin);
		hideLogin();

		if(role=='student'){
			dbRef.child(id).once('value', snapshot => {
				allvals = snapshot.val();
				var allofthem = [];
				var header = document.createElement('h1');
				header.setAttribute('class', 'thing');
				header.innerHTML = 'Sign up for Seventh hour';
				wrapper.appendChild(header);
				var z = 1;
				for(i=1;i<9; i++){
					dbtref.once('value', snap=>{
						allteachers = snap.val();
						var plan = '';
						console.log(allvals[z]);
						for(x=0; x<allteachers.length;x++){
							if(allteachers[x][0] == allvals[z]){
								plan = allteachers[x][2];

							}
						};
						var temp = document.createElement('button');
						temp.setAttribute('content', 'test content');
						temp.setAttribute('class', 'button');
						temp.setAttribute('onclick', 'signup('+JSON.stringify(allvals[i])+')');
						temp.textContent = allvals[z] + ':\n ' + plan;
						var tempd = document.createElement('div');
						wrapper.appendChild(temp);
						wrapper.appendChild(tempd);
						z++;
					});
				};
			});
		};
		if(loggedin  && role=='teacher'){
			var today = new Date();
			var closed = !(today.getHours()<13 ||(today.getHours()==13 && today.getMinutes()<47));
			if(false){
				var header = document.createElement('h1');
				header.setAttribute('class', 'thing');
				header.innerHTML = 'Require students';
				wrapper.appendChild(header);
				dbtref.once('value', snapshot=> {
					var allteachers = snapshot.val();
					var tidx = -1;
					for(i=0; i < allteachers.length; i++){
						if(allteachers[i][0]==tname){
							tidx = i;
							break;
						};
					};
					var max = document.createElement('p');
					max.setAttribute('class', 'thing');
					max.textContent = 'Current max: ' + allteachers[tidx][1];
					wrapper.appendChild(max);
					var changemax = document.createElement('button');
					changemax.setAttribute('class', 'blackbutton');
					changemax.setAttribute('content', 'changemax');
					changemax.setAttribute('onclick', 'changemax('+allteachers[tidx][1]+','+tidx+')');
					changemax.textContent = 'Change max';
					wrapper.appendChild(changemax);
					var plan = document.createElement('p');
					plan.setAttribute('class', 'thing');
					plan.textContent = 'Current plan: ' + allteachers[tidx][2];
					wrapper.appendChild(plan);
					var changeplan = document.createElement('button');
					changeplan.setAttribute('class', 'blackbutton');
					changeplan.setAttribute('onclick', 'changeplan('+allteachers[tidx][2]+','+tidx+')');
					changeplan.textContent = 'Change plan';
					wrapper.appendChild(changeplan);
					var sometext = document.createElement('p');
					sometext.setAttribute('class', 'thing');
					sometext.textContent = 'Require students:';
					wrapper.appendChild(sometext);
					var z = 0;
					for(i=0; i<allteachers[tidx][3].length;i++){
						var studentid = allteachers[tidx][3][i];
						if(typeof studentid != "undefined"){
							dbRef.child(studentid).once('value', snap=>{
								var student = snap.val();
								var temp = document.createElement('button');
								temp.setAttribute('content', studentid);
								if(allteachers[tidx].length<5){
									var num = 0;
								}else{
									var num = allteachers[tidx][4].length;
								};
								if(student.length<10){
									var oldloc = '';
								}else{
									var oldloc = student[7];

								};
								var oldlocc = oldloc;
								if (oldloc.substring(0, 1) == 'r'){
									oldlocc = oldloc.substring(1);
								};
								var oldtidx = -1;
								if(oldlocc.length>1){
									for(i=0; i < allteachers.length; i++){
										if(allteachers[i][0]==oldlocc){
											var oldtidx = i;
											break;
										};
									};};
									temp.setAttribute('onclick', 'togglerequire('+allteachers[tidx][3][z]+' ,'+tidx+','+oldtidx+')');
									if(student.length>9 && student[9].substring(0, 1)=='r' && student[9].substring(1)!=tname){
										temp.setAttribute('class', 'blackbutton');
									}else if(student.length>9 && student[9].substring(0, 1)=='r' && student[9].substring(1)==tname){
										temp.setAttribute('class', 'redbutton')
									}else{
										temp.setAttribute('class', 'button');
									};
									temp.setAttribute('id', allteachers[tidx][3][z]);
									temp.textContent = student[0];
									wrapper.append(temp);
									var b = document.createElement('div');
									wrapper.append(b);
									z++;
								});            
						}


					};
				});
			}else{
				dbtref.once('value', snap=>{
					allteachers = snap.val();
					var tidx = -1;
					for(i=0; i < allteachers.length; i++){
						if(allteachers[i][0]==tname){
							tidx = i;
							break;
						};
					};
					dbtref.child(tidx).once('value', snap=>{
						teacher = snap.val();
						if(teacher.length<5){
							var header = document.createElement('h1');
							header.setAttribute('class', 'thing');
							header.textContent = 'There is no one signed up here.';
							wrapper.appendChild(header);
						}else{
							var header = document.createElement('h1');
							header.setAttribute('class', 'thing');
							header.textContent = 'Take attendance';
							wrapper.appendChild(header);
							var z = 0;
							for(i=0; i<allteachers[tidx][4].length;i++){
								var studentid = allteachers[tidx][4][i];

								if(typeof studentid != "undefined"){
									dbRef.child(studentid).once('value', snap=>{
										var student = snap.val();
										var temp = document.createElement('button');
										temp.setAttribute('content', studentid);
										temp.setAttribute('onclick', 'toggleattendance('+studentid+' ,'+tidx+','+i+')');
										temp.setAttribute('class', 'redbutton');
										temp.setAttribute('id', allteachers[tidx][3][z]);
										temp.textContent = student[0];
										wrapper.append(temp);
										z++;
									});            
								}
							};
							var submit = document.createElement('button');
							submit.setAttribute('content', 'Submit');
							submit.setAttribute('onclick', 'submit('+tidx+')');
							submit.setAttribute('class', 'blackbutton');
							submit.textContent = 'Submit';
							wrapper.append(submit);
						}
					});

				})

			};

		};

	} else { //user logged out!
		loggedin = false;
		console.log("Logged in: "+loggedin);
		showLogin();
		while (wrapper.firstChild) {
    		wrapper.removeChild(wrapper.firstChild);
		}
	}
}
	      var now = new Date();
      if(now.getHours()>14 || now.getHours()<7){
      	dbRef.once('value', snapshot=>{
      		var students = snapshot.val();
      		students.forEach(studentDelete(element), element);
      	});
      	dbtref.once('value', snap =>{
      		var teachers = snap.val();
      		teachers.forEach(teacherDelete(element), element);
      	});
      }else if(loggedin&&role=='student'){
        dbRef.child(id).once('value', snapshot => {
          allvals = snapshot.val();
          var wrapper = document.getElementById("divWrapper");
          var allofthem = [];
          var header = document.createElement('h1');
          header.setAttribute('class', 'thing');
          header.innerHTML = 'Sign up for Seventh hour';
          wrapper.appendChild(header);
          var z = 1;
          for(i=1;i<9; i++){
            dbtref.child(allvals[z]).once('value', snap=>{
              teacher = snap.val();
              var plan = teacher['plan'];
              var temp = document.createElement('button');
              temp.setAttribute('content', 'test content');
              temp.setAttribute('class', 'button');
              temp.setAttribute('onclick', 'signup('+JSON.stringify(allvals[z])+')');
              //console.log(allvals, i);
              place = allvals[z];
              if(allvals[z].charAt(0).toUpperCase()!=allvals[z].charAt(0)){
              	place = place.substring(1);
              };
              temp.innerHTML = place + ':\n ' + plan;
              var tempd = document.createElement('div');
              wrapper.appendChild(temp);
              wrapper.appendChild(tempd);
              z++;
            });
          };
          var cloc = '';
	        if(allvals.length>9){
	        	if(allvals[9].charAt(1).toUpperCase()!=allvals[9].charAt(1)){
	        		cloc = 'You are required in ' + allvals[9].substring(2);
	        	}else{
	        		cloc = 'You are signed up in ' + allvals[9].substring(1);
	        	};
	        }else{
	        	cloc = 'You are not signed up';
	        };
	        var txt = document.createElement('p');
	        txt.setAttribute('class', 'thing');
	        txt.innerHTML = cloc;
	        wrapper.appendChild(txt);
        });

      };
      if(loggedin && role=='teacher'){
        var today = new Date();
        var closed = !(today.getHours()<13 ||(today.getHours()==13 && today.getMinutes()<47));
        if(!closed){
          var wrapper = document.getElementById("divWrapper");
          var header = document.createElement('h1');
          header.setAttribute('class', 'thing');
          header.innerHTML = 'Require students';
          wrapper.appendChild(header);
 
          dbtref.once('value', snapshot=> {
            var allteachers = snapshot.val();
            var tidx = -1;
            for(i=0; i < allteachers.length; i++){
              if(allteachers[i][0]==tname){
                tidx = i;
                break;
              };
            };
            var wrapper = document.getElementById("divWrapper");
            var max = document.createElement('p');
            max.setAttribute('class', 'thing');
            max.innerHTML = 'Current max: ' + allteachers[tidx][1];
            wrapper.appendChild(max);
            var changemax = document.createElement('button');
            changemax.setAttribute('class', 'blackbutton');
            changemax.setAttribute('content', 'changemax');
            changemax.setAttribute('onclick', 'changemax('+allteachers[tidx][1]+','+tidx+')');
            changemax.innerHTML = 'Change max';
            wrapper.appendChild(changemax);
            var plan = document.createElement('p');
            plan.setAttribute('class', 'thing');
            plan.innerHTML = 'Current plan: ' + allteachers[tidx][2];
            wrapper.appendChild(plan);
            var changeplan = document.createElement('button');
            changeplan.setAttribute('class', 'blackbutton');
            changeplan.setAttribute('onclick', 'changeplan('+allteachers[tidx][2]+','+tidx+')');
            changeplan.innerHTML = 'Change plan';
            wrapper.appendChild(changeplan);
            var sometext = document.createElement('p');
            sometext.setAttribute('class', 'thing');
            sometext.innerHTML = 'Require students:';
            wrapper.appendChild(sometext);
            var z = 0;
            for(i=0; i<allteachers[tidx][3].length;i++){
              var studentid = allteachers[tidx][3][i];
              if(typeof studentid != "undefined"){
                dbRef.child(studentid).once('value', snap=>{
                  var student = snap.val();
                  var temp = document.createElement('button');
                  temp.setAttribute('content', studentid);
                  if(student.length<10){
                    var oldloc = '';
                  }else{
                    var oldloc = student[7];

                  };
                  var oldlocc = oldloc;
                  if(allteachers[oldlocc]=='undefined'){
                  	oldlocc = oldlocc.substring(1);
                  };
                  temp.setAttribute('onclick', 'togglerequire('+allteachers[tidx][3][z]+' ,'+tidx+','+oldtidx+')');
                  if(allteachers[student[9]]=='undefined' && student.length>9 && student[9].substring(0, 1)=='r' && student[9].substring(1)!=tname){
                    temp.setAttribute('class', 'blackbutton');
                  }else if(allteachers[student[9]]=='undefined' && student.length>9 && student[9].substring(0, 1)=='r' && student[9].substring(1)==tname){
                    temp.setAttribute('class', 'redbutton')
                  }else{
                    temp.setAttribute('class', 'button');
                  };
                  temp.setAttribute('id', allteachers[oldlocc]['students'][z]);
                  temp.innerHTML = student[0];
                  wrapper.append(temp);
                  var b = document.createElement('div');
                  wrapper.append(b);
                  z++;
                });            
              }
=======
	//DOM elements
	var wrapper = document.getElementById("divWrapper");

	if(user){ //user is logged in!
		divWrapper.removeAttribute('hidden');
		loggedin = true;
		console.log("Logged in: "+loggedin);
		hideLogin();

		if(role=='student'){
			dbRef.child(id).once('value', snapshot => {
				allvals = snapshot.val();
				var allofthem = [];
				var header = document.createElement('h1');
				header.setAttribute('class', 'thing');
				header.innerHTML = 'Sign up for Seventh hour';
				wrapper.appendChild(header);
				var z = 1;
				for(i=1;i<9; i++){
					dbtref.once('value', snap=>{
						allteachers = snap.val();
						var plan = '';
						console.log(allvals[z]);
						for(x=0; x<allteachers.length;x++){
							if(allteachers[x][0] == allvals[z]){
								plan = allteachers[x][2];

							}
						};
						var temp = document.createElement('button');
						temp.setAttribute('content', 'test content');
						temp.setAttribute('class', 'button');
						temp.setAttribute('onclick', 'signup('+JSON.stringify(allvals[i])+')');
						temp.innerHTML = allvals[z] + ':\n ' + plan;
						var tempd = document.createElement('div');
						wrapper.appendChild(temp);
						wrapper.appendChild(tempd);
						z++;
					});
				};
			});
		};
		if(loggedin  && role=='teacher'){
			var today = new Date();
			var closed = !(today.getHours()<13 ||(today.getHours()==13 && today.getMinutes()<47));
			if(false){
				var header = document.createElement('h1');
				header.setAttribute('class', 'thing');
				header.innerHTML = 'Require students';
				wrapper.appendChild(header);
>>>>>>> 57feddbc2421f9fac869c6f87526141b1eaeea13

				dbtref.once('value', snapshot=> {
					var allteachers = snapshot.val();
					var tidx = -1;
					for(i=0; i < allteachers.length; i++){
						if(allteachers[i][0]==tname){
							tidx = i;
							break;
						};
					};
					var max = document.createElement('p');
					max.setAttribute('class', 'thing');
					max.innerHTML = 'Current max: ' + allteachers[tidx][1];
					wrapper.appendChild(max);
					var changemax = document.createElement('button');
					changemax.setAttribute('class', 'blackbutton');
					changemax.setAttribute('content', 'changemax');
					changemax.setAttribute('onclick', 'changemax('+allteachers[tidx][1]+','+tidx+')');
					changemax.innerHTML = 'Change max';
					wrapper.appendChild(changemax);
					var plan = document.createElement('p');
					plan.setAttribute('class', 'thing');
					plan.innerHTML = 'Current plan: ' + allteachers[tidx][2];
					wrapper.appendChild(plan);
					var changeplan = document.createElement('button');
					changeplan.setAttribute('class', 'blackbutton');
					changeplan.setAttribute('onclick', 'changeplan('+allteachers[tidx][2]+','+tidx+')');
					changeplan.innerHTML = 'Change plan';
					wrapper.appendChild(changeplan);
					var sometext = document.createElement('p');
					sometext.setAttribute('class', 'thing');
					sometext.innerHTML = 'Require students:';
					wrapper.appendChild(sometext);
					var z = 0;
					for(i=0; i<allteachers[tidx][3].length;i++){
						var studentid = allteachers[tidx][3][i];
						if(typeof studentid != "undefined"){
							dbRef.child(studentid).once('value', snap=>{
								var student = snap.val();
								var temp = document.createElement('button');
								temp.setAttribute('content', studentid);
								if(allteachers[tidx].length<5){
									var num = 0;
								}else{
									var num = allteachers[tidx][4].length;
								};
								if(student.length<10){
									var oldloc = '';
								}else{
									var oldloc = student[7];

<<<<<<< HEAD
            };
          });
        }else{
          dbtref.once('value', snap=>{
            allteachers = snap.val();
            dbtref.child(tname).once('value', snap=>{
                teacher = snap.val();
                if(teacher.length<5){
                  var wrapper = document.getElementById("divWrapper");
                  var header = document.createElement('h1');
                  header.setAttribute('class', 'thing');
                  header.innerHTML = 'There is no one signed up here.';
                  wrapper.appendChild(header);
                }else{
                    var wrapper = document.getElementById("divWrapper");
                    var header = document.createElement('h1');
                    header.setAttribute('class', 'thing');
                    header.innerHTML = 'Take attendance';
                    wrapper.appendChild(header);
                    var z = 0;
                    allteachers
                    for(i=0; i<allteachers[tname]['seventh'].length;i++){
                        var studentid = allteachers[tlastname]['seventh'][i];

                        if(typeof studentid != "undefined"){
                          dbRef.child(studentid).once('value', snap=>{
                            var student = snap.val();
                            var temp = document.createElement('button');
                            temp.setAttribute('content', studentid);
                            temp.setAttribute('onclick', 'toggleattendance('+studentid+' ,'+tname+')');
                            temp.setAttribute('class', 'redbutton');
                            temp.setAttribute('id', allteachers[tname]['seventh'][studentid]);
                            temp.innerHTML = student[0];
                            wrapper.append(temp);
                            z++;
                          });            
                        }
                    };
                    var submit = document.createElement('button');
                    submit.setAttribute('onclick', 'submit('+tname+')');
                    submit.setAttribute('class', 'blackbutton');
                    submit.innerHTML = 'Submit';
                    wrapper.append(submit);
                }
            });
          
          })
          
        };

          
      };
      function getData(){
        var ss = SpreadsheetApp.getActiveSpreadsheet();
        var sheet = ss.create('Sheet1');
        var range = sheet.getRange(1, 1, 4, 2);
        dbtref.once('value', snap=>{
          var allteachers = value.snap();
          range.setValues(JSON.parse(data));
        })
      };
      function changeplan(plan, tidx){
        var newplan = prompt('New plan: ', plan);
        dbtref.child(tidx).update({2:newplan});
      };
      function changemax(max, tidx){
        var newmax = prompt('New max:', max);
        dbtref.child(tidx).update({1:newmax});
      };
      function submit(tname){
      	dbtref.child(tname).update({attendance:'yep'});
      	/*
        //This is a powerful function.
        //Firstly, it checks if it is the first to be submitted. If it is, it will create a spreadsheet with a list of students who did not sign up
        //Then, it deposits the teacher's attendance. Under the teacher, there will be a section for present students as well as missing students
        //Then, it will delete the teacher's name from the student side
        for(x in studentids){
          dbRef.child(x).child(7).remove(function(error){
            if(error){
              alert('Well this is awkward, '+error);
            };
          })
        };
        //Then, it add one line to the teacherside
        dbtref.child(tidx).child(4).update({5:"yep"});
        //Lastly, it will check if it is the last to press submit
        dbtref.once('value', snap=>{
          var teachers = snap.val();
          var last = true;
          for(x = 0; x<teachers.length; x++){
            if(teachers[x].length==5){
              last = false;
            }
          }
        })
        if(last){
        	alert("Congratulations! You are the last to take attendance!");
        };
        //copy the data to a spreadsheet
        //clear teacher side
        */
        //ok folks, we are going to remake the submit function.
	        //The starting conditions are as follows: 
	        	//the attendance part of the database has a list of teachers who have not submitted their attendance
	        	//the teacher in question has students signed up in their class
	        //Then, the teacher goes through and changes the 0/1 term to determine if the student is absent/present
	        //Once they are done, the teacher presses the submit button. 
	        //The submit button does all of these things:
	        	//moves the attendance data to the attendance part of the firebase database
	        		//makes a category for the teacher
	        		//puts all of the present students into that category
	        		//creates/finds the missing student list
	        			//if first to 
	        		//puts missing students in missing student list
	        	//removes the teacher's name from the list of teachers that have not submitted attendance
	        	//re-exports all of the firebase stuff to the spreadsheet, so that the spreadsheet stays current
	        	//
      };
      //things that would ideally be done at times
      	//reset students location
      //things that still need to be done:
      	//add has signed up support in sign up function(change in attendance)
      	//show where signed up in signup screen
      	//change signup so its id:0/1
      	//change teacher stuff so that its tlastname:[all of the stuff]
      function studentDelete(thing){
      	dbRef.child(thing.key).child(9).remove(function(error){
      		alert('Welp, this is awkward, '+ error);
      	});
      };
      function teacherDelete(thing){
      	dbtref.child(thing.key).child('seventh').remove(function(error){
      		alert('Welp, this is awkward, ' + error);
      	});
      	dbtref.child(thing.key).child('attendance').remove(function(error){
      		alert('Welp, this is awkward, ' + error);
      	});
      };
      function toggleattendance(studentid, tname){
        var aclass = document.getElementById(studentid).getAttribute('class');
        if(aclass == 'redbutton'){
          document.getElementById(studentid).setAttribute('class', 'button');
          dbtref.child(tname).child('seventh').update({studentid:1});
        }else{
          document.getElementById(studentid).setAttribute('class', 'redbutton');
          dbtref.child(tname).child('seventh').update({studentid:0});
        };
      };
      function togglerequire(studentid, tname, oldloc){
        var aclass = document.getElementById(studentid).getAttribute('class');
        if(aclass=='blackbutton'){
          alert('This student is already required somewhere else.');
        }else if(aclass == 'button'){
          document.getElementById(studentid).setAttribute('class', 'redbutton');
          dbtref.child(tname).child("seventh").update({[studentid]:0});
          var newloc = "r"+tname;
          dbtref.once('value', snap=>{
            var allteachers = snap.val();
            dbtref.child(tname).child('seventh').update({[studentid]:0});
          })
          dbtref.child(oldloc.toString()).child('seventh').child(studentid).remove(function(error){
            if(error){alert('oops, this is not going to work');};});
          dbRef.child(studentid).update({9:newloc});
        }else{
          dbRef.child(studentid).update({9:tname});
          document.getElementById(studentid).setAttribute('class', 'button');
        };
                     

      };
      function signup(a){
      	 dbRef.once('value', snapshot => {
      		allvals = snapshot.val();
      		dbtref.once('value', snap=>{
      			var teachers = snap.val();
      			var today = new Date();
      			var closed = (today.getHours()<13 ||(today.getHours()==13 && today.getMinutes()<47));
      			var required = (allvals.length>9 && allvals[6].substring(0, 1)=="r");
      			var full = true;
      			oldloc = allvals[id][9];
      			if(closed&!required&&full){ // add name on teacher side
      				if (allvals[id].length<10){
      					console.log(teachers, a);
      					if(teachers[a].length<5){//first person to sign up
        				  dbtref.child(a).update({ 'seventh': {[id]:0}});
        				}else{//not first person to sign up
      						var len = 2;//teachers[tidx][4].length;
        					dbtref.child(a).child('seventh').update({[id]:0});
        				}
      				}else{//if they were previously signed up
      					var oldtidx = -1;
      					for(i=0;i<teachers.length;i++){
      						if(teachers[i][0]==oldloc){
      							if(teachers[i].length<5){//no one is signed up
      								full = true;
      							}else{//some people are signed up
      								full = teachers[i][1]<teachers[i][4].length;
      							}
      							oldtidx = i;
      							break;
      						};
      					};
      					var myidx = 0;
      					for(i=0;i<teachers[oldtidx][4].length; i++){
      						if(teachers[oldtidx][4][i][0]==id){
      							myidx = i;
                    break;
      						}
      					}
      					dbtref.child(oldtidx.toString()).child('4').child(myidx.toString()).remove(function(error){
      							if(error){alert('oops, this is not going to work');};});
      					if(teachers[tidx].length<5){
        					dbtref.child(tidx.toString()).update({ 4: [id, 0]});
        				}else{
                  var len = dbtref.child(tidx.toString()).child('4').length;
        					dbtref.child(tidx.toString()).child('4').update({len : [id, 0]});
        				};
      				};
      				dbRef.child(id).update({ 9: a});
        			alert("You are signed up with "+a+'\n'+teachers[tidx][2]);

      			}else if(!closed &!full){
      				alert("You are required with "+ allvals[id][9].substring(1));
      			}else if(!full &&closed){
      				alert(a + " is full");
      			}else{
      				alert("Signup is closed, you are signed up with " + allvals[id][9]);
      			}
      		});
      		
      	});
       
      };
      
=======
								};
								var oldlocc = oldloc;
								if (oldloc.substring(0, 1) == 'r'){
									oldlocc = oldloc.substring(1);
								};
								var oldtidx = -1;
								if(oldlocc.length>1){
									for(i=0; i < allteachers.length; i++){
										if(allteachers[i][0]==oldlocc){
											var oldtidx = i;
											break;
										};
									};};
									temp.setAttribute('onclick', 'togglerequire('+allteachers[tidx][3][z]+' ,'+tidx+','+oldtidx+')');
									if(student.length>9 && student[9].substring(0, 1)=='r' && student[9].substring(1)!=tname){
										temp.setAttribute('class', 'blackbutton');
									}else if(student.length>9 && student[9].substring(0, 1)=='r' && student[9].substring(1)==tname){
										temp.setAttribute('class', 'redbutton')
									}else{
										temp.setAttribute('class', 'button');
									};
									temp.setAttribute('id', allteachers[tidx][3][z]);
									temp.innerHTML = student[0];
									wrapper.append(temp);
									var b = document.createElement('div');
									wrapper.append(b);
									z++;
								});            
						}


					};
				});
			}else{
				dbtref.once('value', snap=>{
					allteachers = snap.val();
					var tidx = -1;
					for(i=0; i < allteachers.length; i++){
						if(allteachers[i][0]==tname){
							tidx = i;
							break;
						};
					};
					dbtref.child(tidx).once('value', snap=>{
						teacher = snap.val();
						if(teacher.length<5){
							var header = document.createElement('h1');
							header.setAttribute('class', 'thing');
							header.innerHTML = 'There is no one signed up here.';
							wrapper.appendChild(header);
						}else{
							var header = document.createElement('h1');
							header.setAttribute('class', 'thing');
							header.innerHTML = 'Take attendance';
							wrapper.appendChild(header);
							var z = 0;
							for(i=0; i<allteachers[tidx][4].length;i++){
								var studentid = allteachers[tidx][4][i];

								if(typeof studentid != "undefined"){
									dbRef.child(studentid).once('value', snap=>{
										var student = snap.val();
										var temp = document.createElement('button');
										temp.setAttribute('content', studentid);
										temp.setAttribute('onclick', 'toggleattendance('+studentid+' ,'+tidx+','+i+')');
										temp.setAttribute('class', 'redbutton');
										temp.setAttribute('id', allteachers[tidx][3][z]);
										temp.innerHTML = student[0];
										wrapper.append(temp);
										z++;
									});            
								}
							};
							var submit = document.createElement('button');
							sumbit.setAttribute('content', 'Submit');
							submit.setAttribute('onclick', 'submit('+tidx+')');
							submit.setAttribute('class', 'blackbutton');
							submit.innerHTML = 'Submit';
							wrapper.append(submit);
						}
					});

				})

			};

		};

	} else { //user logged out!
		loggedin = false;
		console.log("Logged in: "+loggedin);
		showLogin();
		divWrapper.setAttribute('hidden','true');
	}
}

//signInButtonElement.addEventListener('click', signIn);

function getData(){
	var ss = SpreadsheetApp.getActiveSpreadsheet();
	var sheet = ss.create('Sheet1');
	var range = sheet.getRange(1, 1, 4, 2);
	dbtref.once('value', snap=>{
		var allteachers = value.snap();
		range.setValues(JSON.parse(data));
	})
};
function changeplan(plan, tidx){
	var newplan = prompt('New plan: ', plan);
	dbtref.child(tidx).update({2:newplan});
};
function changemax(max, tidx){
	var newmax = prompt('New max:', max);
	dbtref.child(tidx).update({1:newmax});
};
function submit(tidx, studentids){
		//This is a powerful function.
		//Firstly, it checks if it is the first to be submitted. If it is, it will create a spreadsheet with a list of students who did not sign up
		//Then, it deposits the teacher's attendance. Under the teacher, there will be a section for present students as well as missing students
		//Then, it will delete the teacher's name from the student side
		for(x in studentids){
			dbRef.child(x).child(7).remove(function(error){
				if(error){
					alert('Well this is awkward, '+error);
				};
			})
		};
		//Then, it add one line to the teacherside
		dbtref.child(tidx).child(4).update({5:"yep"});
		//Lastly, it will check if it is the last to press submit
		dbtref.once('value', snap=>{
			var teachers = snap.val();
			var last = true;
			for(x = 0; x<teachers.length; x++){
				if(teachers[x].length==5){
					last = false;
				}
			}
		})
	};
	function toggleattendance(studentid, tidx, stidx){
		var aclass = document.getElementById(studentid).getAttribute('class');
		if(aclass == 'redbutton'){
			document.getElementById(studentid).setAttribute('class', 'button');
			dbtref.child(tidx).child(4).update({stidx : [studentid, 1]});
		}else{
			document.getElementById(studentid).setAttribute('class', 'redbutton');
			dbtref.child(tidx).child(4).update({stidx : [studentid, 0]});
		};
	};
	function togglerequire(studentid, tidx, oldloc){
		var aclass = document.getElementById(studentid).getAttribute('class');
		if(aclass=='blackbutton'){
			alert('This student is already required somewhere else.');
		}else if(aclass == 'button'){
			document.getElementById(studentid).setAttribute('class', 'redbutton');
			dbtref.child(tidx.toString()).child("4").update({[num]:[studentid, 0]});
			var newloc = "r"+tname;
			dbtref.once('value', snap=>{
				var allteachers = snap.val();
				if(allteachers[tidx].length< 5){
					var num = 0;
				}else{
					var num = allteachers[tidx][4].length;
				}
				myidx = -1;
				if(oldloc>=0){
					var myidx = -1;
					for(i=0;i<allteachers[oldloc][4].length; i++){
						if(allteachers[oldloc][4][i][0]==studentid){
							myidx = i;
							break;
						}
					}
				}
				num = num.toString();
				studentid = studentid.toString();
			})
			dbtref.child(oldloc.toString()).child('4').child(myidx.toString()).remove(function(error){
				if(error){alert('oops, this is not going to work');};});
			dbRef.child(studentid).update({9:newloc});
		}else{
			dbRef.child(studentid).update({9:tname});
			document.getElementById(studentid).setAttribute('class', 'button');
		};


	};
	function signup(a){
		dbRef.once('value', snapshot => {
			allvals = snapshot.val();
			dbtref.once('value', snap=>{
				var teachers = snap.val();
				var today = new Date();
				var closed = (today.getHours()<13 ||(today.getHours()==13 && today.getMinutes()<47));
				var required = (allvals.length>9 && allvals[6].substring(0, 1)=="r");
				oldloc = allvals[id][9];
				var full = true;
				var tidx = -1;
				for(i=0;i<teachers.length;i++){//test if teacher's class is full
					if(teachers[i][0]==a){//find requested teachers
						if(teachers[i].length<5){
							full = true;
						}else{
							full = teachers[i][1]<teachers[i][4].length;
						}
						tidx = i;
						break;
					};
				};
				if(closed&!required&&full){ // add name on teacher side
					if (allvals[id].length<10){
						if(teachers[tidx].length<5){//first person to sign up
							dbtref.child(tidx.toString()).update({ 4: [id, 0]});
						}else{//not first person to sign up
							var len = 2;//teachers[tidx][4].length;
							dbtref.child(tidx.toString()).child('4').update({len: [id, 0]});
						}
					}else{//if they were previously signed up
						var oldtidx = -1;
						for(i=0;i<teachers.length;i++){
							if(teachers[i][0]==oldloc){
								if(teachers[i].length<5){//no one is signed up
									full = true;
								}else{//some people are signed up
									full = teachers[i][1]<teachers[i][4].length;
								}
								oldtidx = i;
								break;
							};
						};
						var myidx = 0;
						for(i=0;i<teachers[oldtidx][4].length; i++){
							if(teachers[oldtidx][4][i][0]==id){
								myidx = i;
								break;
							}
						}
						dbtref.child(oldtidx.toString()).child('4').child(myidx.toString()).remove(function(error){
							if(error){alert('oops, this is not going to work');};});
						if(teachers[tidx].length<5){
							dbtref.child(tidx.toString()).update({ 4: [id, 0]});
						}else{
							var len = dbtref.child(tidx.toString()).child('4').length;
							dbtref.child(tidx.toString()).child('4').update({len : [id, 0]});
						};
					};
					dbRef.child(id).update({ 9: a});
					alert("You are signed up with "+a+'\n'+teachers[tidx][2]);

				}else if(!closed &!full){
					alert("You are required with "+ allvals[id][9].substring(1));
				}else if(!full &&closed){
					alert(a + " is full");
				}else{
					alert("Signup is closed, you are signed up with " + allvals[id][9]);
				}
			});
			
		});

	};

//initialize firebase
initFirebaseAuth();
>>>>>>> 57feddbc2421f9fac869c6f87526141b1eaeea13
