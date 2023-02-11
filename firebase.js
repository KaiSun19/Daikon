// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Your web app's Firebase configuration
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCZh2NThfbQnUjmRqtjZKo7YY7qeSEBWXw",
  authDomain: "predictentitiesml.firebaseapp.com",
  projectId: "predictentitiesml",
  storageBucket: "predictentitiesml.appspot.com",
  messagingSenderId: "877390705096",
  appId: "1:877390705096:web:448569ea96d9372a2490fd"
})


const db = firebaseApp.firestore();

export {db}