// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCG61ZQK2pHtL0aknzHrogYXsShMAhQwOw",
    authDomain: "infobash-675a5.firebaseapp.com",
    databaseURL: "https://infobash-675a5-default-rtdb.firebaseio.com",
    projectId: "infobash-675a5",
    storageBucket: "infobash-675a5.appspot.com",
    messagingSenderId: "313169924817",
    appId: "1:313169924817:web:6923233ecd4e563696ebf0",
    measurementId: "G-64H2QY5D5P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);



const logOut = () => {
    signOut(auth).catch((error) => console.error(error));
};




export { auth, db, logOut, storage };

