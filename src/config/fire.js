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
export const getFireDB = () => {
  return database.ref('/').once('value')
}