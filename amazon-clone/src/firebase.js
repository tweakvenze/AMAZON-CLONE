import firebase from "firebase";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB77JheuW229bP_3X7Ip7RCDYYJJ2pDOH4",
    authDomain: "clone-3019c.firebaseapp.com",
    projectId: "clone-3019c",
    storageBucket: "clone-3019c.appspot.com",
    messagingSenderId: "854238058147",
    appId: "1:854238058147:web:a17b665bc0aa0cab3ed116",
    measurementId: "G-NELSQGHEPB"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth;

export {db, auth};