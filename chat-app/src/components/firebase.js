import firbase from "firebase";

const firebase = firebase.initializeApp({
  apiKey: "AIzaSyCrwgh6-zgrOem3RfRujVQA81JU12F0TJs",
  authDomain: "bluechat-7fc97.firebaseapp.com",
  databaseURL: "https://bluechat-7fc97.firebaseio.com",
  projectId: "bluechat-7fc97",
  storageBucket: "bluechat-7fc97.appspot.com",
  messagingSenderId: "1021126576585",
  appId: "1:1021126576585:web:7ec0683e259b0786b38018",
  measurementId: "G-EJGWCSTNPC",
});

const db = firebaseApp.firestore();

export default { db };
