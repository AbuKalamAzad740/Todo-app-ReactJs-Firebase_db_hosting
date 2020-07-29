
// import firebase from firebase package, install by npm i firebase
import * as firebase from 'firebase';


// firebase config detail get it from firebase project setting in firebase console paste it here
const firebaseConfig = {
    apiKey: "AIzaSyAc5AcxhOsDJ5NVBshzuzyYI5q6qpMGd2g",
    authDomain: "todo-app-az-75fbc.firebaseapp.com",
    databaseURL: "https://todo-app-az-75fbc.firebaseio.com",
    projectId: "todo-app-az-75fbc",
    storageBucket: "todo-app-az-75fbc.appspot.com",
    messagingSenderId: "318420149709",
    appId: "1:318420149709:web:ad9d556bd3adbaa6db5084",
    measurementId: "G-D7TLHJ72YN"
};

//init firebase by passing config details
const firebaseapp = firebase.initializeApp(firebaseConfig);

//create fire base db by firestore
const db = firebaseapp.firestore();

export default db;