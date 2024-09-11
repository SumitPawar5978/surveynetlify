// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcl8qC6RUfK5z7N5h0sJoiw9pHnumC1_I",
  authDomain: "sevankur-bharat.firebaseapp.com",
  projectId: "sevankur-bharat",
  storageBucket: "sevankur-bharat.appspot.com",
  messagingSenderId: "825874394219",
  appId: "1:825874394219:web:4bf4bffce538910d36d52e",
  measurementId: "G-T61P6L0VFP",
  databaseURL:"https://sevankur-bharat-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

export {
    app,
    analytics,
    db
}