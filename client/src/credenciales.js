// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3F8pq4TKODA4pxsGpY8qHRizXTQzDag4",
  authDomain: "becoming-fit.firebaseapp.com",
  projectId: "becoming-fit",
  storageBucket: "becoming-fit.appspot.com",
  messagingSenderId: "468471487783",
  appId: "1:468471487783:web:bf96e2652707d5183d5d02"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp