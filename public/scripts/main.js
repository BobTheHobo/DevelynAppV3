//TODO: figure out who is a teacher and who is a student and then update accordingly
//TODO: parse out spaghetti code
//TODO: imporve css
//TODO: 
var loggedin = false;
var role = 'teacher';
var tname = 'Mr. Murphy';
var id = '2027266'; //Student ID
var dbRef = firebase.database().ref().child('students'); //Student database reference
var dbtref = firebase.database().ref().child('teachers'); //Teacher database reference 
var attendanceRef = firebase.database().ref().child('attendance'); //Attendence database reference

//DOM elements
var loginB = document.getElementById('loginButton');
var logoutB = document.getElementById('logoutButton');
var wrapper = document.getElementById("divWrapper");
var btnAdd = document.getElementById('butPrompt');

//shows login button and hides logout button
function showLogin(){
	loginB.removeAttribute('hidden');
	logoutB.setAttribute('hidden', 'true');
}

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

// Sign out of Firebase.
function logout() {
  firebase.auth().signOut();
}

//Get student Number
function getStudentID(){
	var email = firebase.auth().currentUser.email;
	if(email.substring(6).equals("jeffcoschools.us")){
		return email.substring(0,5);
	}
}

//get teacher id
function get teacherID(){
	var email = firebase.auth().currentUser.email;
	if(email.endsWith())
}

//get name of the signed in user.
function getUserName() {
  return firebase.auth().currentUser.displayName;
}

//user should be checked out at start
logout();

//initialize firebase, calls update whenever user logs in/out
function initFirebaseAuth(){
	firebase.auth().onAuthStateChanged(update);
}

//Updates whenever a user logs in/out
function update(user){
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

//stuff for web app support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./worker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  	// Prevent Chrome 67 and earlier from automatically showing the prompt
  	e.preventDefault();
  	// Stash the event so it can be triggered later.
  	deferredPrompt = e;
   // Update UI notify the user they can add to home screen
  	btnAdd.style.display = 'block';
});

btnAdd.addEventListener('click', (e) => {
  // hide our user interface that shows our A2HS button
  btnAdd.style.display = 'none';
  // Show the prompt
  deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
});

window.addEventListener('appinstalled', (evt) => {
  app.logEvent('a2hs', 'installed');
});