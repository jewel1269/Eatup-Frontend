// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQIN2lFR42Nv9d6MnGBk6bpUUgm3dj9BE",
  authDomain: "eatup-784b8.firebaseapp.com",
  projectId: "eatup-784b8",
  storageBucket: "eatup-784b8.appspot.com",
  messagingSenderId: "117604136429",
  appId: "1:117604136429:web:210d0111067c1e2f5023e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
