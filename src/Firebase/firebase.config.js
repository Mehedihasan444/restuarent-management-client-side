
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAd2GQ4hY33OVzeyTYmE9WZYnbXGY4oMEk",
  authDomain: "restaurant-management-6fce7.firebaseapp.com",
  projectId: "restaurant-management-6fce7",
  storageBucket: "restaurant-management-6fce7.appspot.com",
  messagingSenderId: "777436611420",
  appId: "1:777436611420:web:bd7c4b35158ff42ca27799"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;