
// import { initializeApp } from "firebase/app";
// import {getAuth} from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyAd2GQ4hY33OVzeyTYmE9WZYnbXGY4oMEk",
//   authDomain: "restaurant-management-6fce7.firebaseapp.com",
//   projectId: "restaurant-management-6fce7",
//   storageBucket: "restaurant-management-6fce7.appspot.com",
//   messagingSenderId: "777436611420",
//   appId: "1:777436611420:web:bd7c4b35158ff42ca27799"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const auth = getAuth(app);

// export default auth;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7AThXcwUKPzrzhT3qEQxSQXV-Mj1FPk8",
  authDomain: "restaurant-management-we-cf9e7.firebaseapp.com",
  projectId: "restaurant-management-we-cf9e7",
  storageBucket: "restaurant-management-we-cf9e7.appspot.com",
  messagingSenderId: "772161890662",
  appId: "1:772161890662:web:e6eaae63453efff9cd00a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;