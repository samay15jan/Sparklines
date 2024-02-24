import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAGz2HcSTzDpNDHfcURgc2uaNFQviLzn4g",
    authDomain: "sparklines-fd1c0.firebaseapp.com",
    projectId: "sparklines-fd1c0",
    storageBucket: "sparklines-fd1c0.appspot.com",
    messagingSenderId: "1062061670841",
    appId: "1:1062061670841:web:f94f24f5be0d1f19943668",
    databaseURL: "https://sparklines-fd1c0-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database }