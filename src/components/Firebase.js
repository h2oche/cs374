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
export const firebase_init = () => {
  if(!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  database = firebase.database();
}

export const getFireDB = () => {
  return database.ref('/').once('value');
}

render() {
  const {
    User
  } = this.props;
  return (
    <div>
      <h1>Users</h1>
        {User.length ? (
          <p>{User[0]}</p>

        ) : (
          <p className="loading">LOADING</p>
        )}
        <Link to={'/second'}>Second</Link>
    </div>

  )
}
