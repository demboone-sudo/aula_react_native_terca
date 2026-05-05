// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEBPS3H7AdU7m4P30HTDxrE7TWwnyziMA",
  authDomain: "progr-dispo-moveis.firebaseapp.com",
  projectId: "progr-dispo-moveis",
  storageBucket: "progr-dispo-moveis.firebasestorage.app",
  messagingSenderId: "1059808069443",
  appId: "1:1059808069443:web:e0e0145eb67ad79bc211f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth };