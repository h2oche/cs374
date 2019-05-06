import * as firebase from 'firebase'
let database;
let storage;
let config = {
    apiKey: "AIzaSyA5_bIw4uLv00p40TzdHn6MsG3zmIScw24",
    authDomain: "cs374-bobo.firebaseapp.com",
    databaseURL: "https://cs374-bobo.firebaseio.com",
    projectId: "cs374-bobo",
    storageBucket: "cs374-bobo.appspot.com",
    messagingSenderId: "639352671004"
}
export const fire = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
    }
  database = firebase.database()
  
  storage = firebase.storage()

}
export const getFireDB = (dir) => {
  if (dir===null)
    dir = '/';
  return database.ref(dir).once('value')
}

export const pushDB = (dir, obj) => {
  return database.ref(dir).push(obj);
}

export const pushMultipleDB = (dir, objs) => {
  var updates = {};
  let ref = database.ref(dir);
  objs.forEach(_obj => {
    updates[ref.push().key] = _obj;
  });
  // console.log(updates);
  return ref.update(updates);
}

export const setDB = (dir, obj) => {
  return database.ref(dir).set(obj);
}

export const deleteDB = (dir) => {
  database.ref(dir).remove();
}

export const getFireDB_arr = (dir, _this, target, type, want) => {
  if (dir===null)
    dir = '/';
  var targetref = database.ref(dir);
  var temparr = [];
  console.log('in', type, want)
  targetref.once('value', function(snapshot) {
    snapshot.forEach(function(child){
      if(type)
      {   
        if(child.val()[type] === want)
        {
          temparr.push(child.val());
          _this.setState({[target]:temparr});
        }
      }
      else 
      {
        temparr.push(child.val());
        _this.setState({[target]:temparr});
      }     
    })
  })
  
  return temparr
}

export const updateChild = (dir, childName, value) => {
  database.ref(dir).update({[childName]: value});
}

  
export const upload_file = (dir, file, filename) => {
  let target = storage.ref(dir + filename);
  //target.put(file);
  var uploadTask = target.put(file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed', function(snapshot){
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, function(error) {
    // Handle unsuccessful uploads
  }, function() {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
      console.log('File available at', downloadURL);
    });
  });
}
