// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBMaKQ_yncCuOK4Eo-HII0hFodo1VbfrA0",
  authDomain: "insta-clone-yt-a4994.firebaseapp.com",
  projectId: "insta-clone-yt-a4994",
  storageBucket: "insta-clone-yt-a4994.appspot.com",
  messagingSenderId: "319407394451",
  appId: "1:319407394451:web:cecf07f55a4d409568c766",
  measurementId: "G-EDWXJQ7MJ3"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app, auth, firestore, storage};