import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBmtMJcofoxak_HNiAUe4NVyStaBAkRGms",
  authDomain: "online-shop-c0f3f.firebaseapp.com",
  projectId: "online-shop-c0f3f",
  storageBucket: "online-shop-c0f3f.firebasestorage.app",
  messagingSenderId: "469127055581",
  appId: "1:469127055581:web:f0b617c2cfe308ee2eb334",
  measurementId: "G-NZ7QDEMCKF"
};

// Initialize Firebase
const firebaseAppConfig = initializeApp(firebaseConfig);
export default firebaseAppConfig