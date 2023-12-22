// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3Ok1TzVf_chiPPRRBBCtI6T80nC34Ngo",
  authDomain: "task-management-2e074.firebaseapp.com",
  projectId: "task-management-2e074",
  storageBucket: "task-management-2e074.appspot.com",
  messagingSenderId: "671416195712",
  appId: "1:671416195712:web:01ee2d59bf297e7b91a465"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;