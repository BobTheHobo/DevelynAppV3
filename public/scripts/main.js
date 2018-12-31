//Test variables for testing a teacher?
var loggedin = false;
var role = 'teacher';
var teacherName = 'Mr. Murphy'; //var teacherName = 'Mr. Murphy';
var id = '2027266'; //Student ID
var dbRef = firebase.database().ref().child('students'); //Student database reference
var dbTRef = firebase.database().ref().child('teachers'); //Teacher database reference 
var attendanceRef = firebase.database().ref().child('attendance'); //Attendence database reference
provider = { //provider variable is created in login() function
	name: '',
	profilePicture: '',
	email: '', 
}

//if(!loggedin){
	var wrapper = document.getElementById('divWrapper');
	var but = document.createElement('button');sddax
	but.setAttribute('class', 'button');
	but.setAttribute('onclick', 'login()');
	but.innerHTML = 'Log in with Google';
	wrapper.appendChild(but);
//};

function login() {
	// Sign in Firebase using popup auth and Google as the identity provider.
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithPopup(provider);
};

/*
function login(){
	var provider = new firebase.auth.GoogleAuthProvider();
    //provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    //firebase.auth().languageCode = 'pt';
    firebase.auth().signInWithPopup(provider).then(function(result) {
    	var token = result.credential.accessToken;
    	var user = result.user;
    }).catch(function(error) {
    	var errorCode = error.code;
    	var errorMessage = error.message;
    	var email = error.email;
    	var credential = error.credential;
    });    
};
*/

console.log("this does work, right?");
if(loggedin&&role=='student'){
	dbRef.child(id).once('value', snapshot => {
		allvals = snapshot.val();
		var wrapper = document.getElementById("divWrapper");
		var allofthem = [];
		var header = document.createElement('h1');
		header.setAttribute('class', 'thing');
		header.innerHTML = 'Sign up for Seventh hour';
		wrapper.appendChild(header);
		for(i=1;i<7; i++){
			var temp = document.createElement('button');
			temp.setAttribute('content', 'test content');
			temp.setAttribute('class', 'button');
			temp.setAttribute('onclick', 'signup('+JSON.stringify(allvals[i])+')');
			temp.innerHTML = allvals[i];
			var tempd = document.createElement('div');
			wrapper.appendChild(temp);
			wrapper.appendChild(tempd);
		};
	});
};
if(loggedin  && role=='teacher'){
	var today = new Date();
	var closed = !(today.getHours()<13 ||(today.getHours()==13 && today.getMinutes()<47));
	if(!closed){
		var wrapper = document.getElementById("divWrapper");
		var header = document.createElement('h1');
		header.setAttribute('class', 'thing');
		header.innerHTML = 'Require students';
		wrapper.appendChild(header);
		dbTRef.once('value', snapshot=> {
			var allteachers = snapshot.val();
			var tidx = -1;
			for(i=0; i < allteachers.length; i++){
				if(allteachers[i][0]==teacherName){
					tidx = i;
					break;
				};
			};

			var wrapper = document.getElementById("divWrapper");
			for(i=0; i<allteachers[tidx][3].length;i++){
				var studentid = allteachers[tidx][3][i];
				console.log(studentid);
				if(typeof studentid != "undefined"){
					dbRef.child(studentid).once('value', snap=>{
						var student = snap.val();
						var temp = document.createElement('button');
						temp.setAttribute('content', studentid);
						temp.setAttribute('onclick', 'togglerequire('+studentid+' ,'+tidx+','+allteachers[tidx][3].length+')');
						if(student.length>7 && student[7].substring(0, 1)=='r' && student[7].substring(1)!=teacherName){
							temp.setAttribute('class', 'blackbutton');
						}else if(student.length>7 && student[7].substring(0, 1)=='r' && student[7].substring(1)==teacherName){
							temp.setAttribute('class', 'redbutton')
						}else{
							temp.setAttribute('class', 'button');
						};
						temp.setAttribute('id', studentid);
						temp.innerHTML = student[0];
						wrapper.append(temp);
					});               
				}


			};
		});
	}else{
		console.log("what is happening");
	};
};

signInButtonElement.addEventListener('click', signIn);

function togglerequire(studentid, tidx, currentnum){
	var aclass = document.getElementById(studentid).getAttribute('class');
	var num = currentnum.toString();
	studentid = studentid.toString();
	console.log(studentid, tidx, num);
	if(aclass=='blackbutton'){
		alert('This student is already required somewhere else.');
	}else if(aclass == 'button'){
		document.getElementById(studentid).setAttribute('class', 'redbutton');
		dbTRef.child(tidx.toString()).child("4").update({[num]:studentid});
		var newloc = "r"+teacherName;

		dbRef.child(studentid).update({7:newloc});
	}else{
		document.getElementById(studentid).setAttribute('class', 'button');
	};
};
function signup(a){
	dbRef.once('value', snapshot => {
		allvals = snapshot.val();
		dbTRef.once('value', snap=>{
			var teachers = snap.val();
			var today = new Date();
			var closed = (today.getHours()<13 ||(today.getHours()==13 && today.getMinutes()<47));
			var required = (allvals.length>7 && allvals[6].substring(0, 1)=="r");
			oldloc = allvals[id][7];
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
  			console.log(closed, required, full);
  			if(closed&!required&&full){ // add name on teacher side
  				if (allvals[id].length<8){
  					if(teachers[tidx].length<5){//first person to sign up
  						dbTRef.child(tidx.toString()).update({ 4: [id]});
    				}else{//not first person to sign up
  						var len = 2;//teachers[tidx][4].length;
  						dbTRef.child(tidx.toString()).child('4').update({len: id});
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
  					console.log(oldtidx);
  					for(i=0;i<teachers[oldtidx][4].length; i++){
  						if(teachers[oldtidx][4][i]==id){
  							myidx = i;
  							break;
  						}
  					}
  					dbTRef.child(oldtidx.toString()).child('4').child(myidx.toString()).remove(function(error){
  						if(error){alert('oops, this is not going to work');};});
  					if(teachers[tidx].length<5){
  						dbTRef.child(tidx.toString()).update({ 4: [id]});
  					}else{
  						var len = dbTRef.child(tidx.toString()).child('4').length;
  						dbTRef.child(tidx.toString()).child('4').update({len : id});
  					};
  				};
  				dbRef.child(id).update({ 7: a});
  				alert("You are signed up with "+a+'\n'+teachers[tidx][2]);

  			}else if(!closed &!full){
  				alert("You are required with "+ allvals[id][7].substring(1));
  			}else if(!full &&closed){
  				alert(a + " is full");
  			}else{
  				alert("Signup is closed, you are signed up with " + allvals[id][7]);
  			}
  		});

	});

};