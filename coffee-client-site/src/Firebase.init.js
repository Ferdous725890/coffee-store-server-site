// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNbis3Jv5d8S4kIpCPZX8Onj7rikTUi3c",
  authDomain: "simple-firbase-recap.firebaseapp.com",
  projectId: "simple-firbase-recap",
  storageBucket: "simple-firbase-recap.firebasestorage.app",
  messagingSenderId: "238228744549",
  appId: "1:238228744549:web:5a1a8aa12e24f26802998c",
  measurementId: "G-M84JHZTD97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// ! Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
