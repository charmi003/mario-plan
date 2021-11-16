// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtOax7vSDNpwZoFwxku6-o2uGbk67Por0",
  authDomain: "marioplan-a2cf2.firebaseapp.com",
  projectId: "marioplan-a2cf2",
  storageBucket: "marioplan-a2cf2.appspot.com",
  messagingSenderId: "981491896256",
  appId: "1:981491896256:web:c6f5ac628419037c028225",
  measurementId: "G-3M8FHQJ69J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);



