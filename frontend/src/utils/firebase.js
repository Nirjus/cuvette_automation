// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8wTe48GOY4MGXCEJt9GK3zCFWeoEROF0",
  authDomain: "aisaas-socket.firebaseapp.com",
  projectId: "aisaas-socket",
  storageBucket: "aisaas-socket.appspot.com",
  messagingSenderId: "161444792146",
  appId: "1:161444792146:web:296bda18075b5f3e969c8b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, RecaptchaVerifier, signInWithPhoneNumber };
