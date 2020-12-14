import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQEloRzqelnOVWiE0rKFmsV_ZFnyI-FhE",
  authDomain: "classroom-5e359.firebaseapp.com",
  projectId: "classroom-5e359",
  storageBucket: "classroom-5e359.appspot.com",
  messagingSenderId: "1040563463106",
  appId: "1:1040563463106:web:caf187f9d3c28c31a76c5b",
  measurementId: "G-WWEKYBVWPP",
};

// eslint-disable-next-line no-unused-vars
const firebaseApp = firebase.initializeApp(firebaseConfig);

var db = firebase.database().ref("/");
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
