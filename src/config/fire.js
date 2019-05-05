import * as firebase from 'firebase'
let database;
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
}
export const getFireDB = (dir) => {
  if (dir===null)
    dir = '/';
  return database.ref(dir).once('value')
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
        console.log(child.val().id, [type], [want])
        console.log(child.val()[type])
        if(child.val()[type] === want)
        {
          temparr.push(
        
            {"id":child.val().id, "name":child.val().name,
          "class":child.val().class}
          );
          _this.setState({[target]:temparr});
          console.log(temparr)

        }


      }

      
    })
  })
  
  return temparr
}