import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyALOLMQhQrTisbBeU9Nl9IIEMALGUZyiXc",
  authDomain: "blood-bank-reactjs.firebaseapp.com",
  projectId: "blood-bank-reactjs",
  storageBucket: "blood-bank-reactjs.appspot.com",
  messagingSenderId: "870589981983",
  appId: "1:870589981983:web:b66658a5e07ae46dd2bc2a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const writeUserData = (userId, userData) => {
  return set(ref(database, "users/" + userId), userData);
};

export { auth, registerUser, loginUser, writeUserData, database };
