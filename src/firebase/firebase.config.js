/* eslint-disable no-undef */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messangingSenderId,
  appId: import.meta.env.VITE_appId,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDnp08fT3X4_iIwzF0o3cy9SyD0yZ_PPUc",
//   authDomain: "stride-ec72f.firebaseapp.com",
//   projectId: "stride-ec72f",
//   storageBucket: "stride-ec72f.appspot.com",
//   messagingSenderId: "171936584989",
//   appId: "1:171936584989:web:fd395462417be3e9bf7df4",
// };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
