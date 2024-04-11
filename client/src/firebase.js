import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjw0yoOwB9w_nN7VykCx6JT1QISptHp1k",
  authDomain: "weather-dashboard-417915.firebaseapp.com",
  projectId: "weather-dashboard-417915",
  storageBucket: "weather-dashboard-417915.appspot.com",
  messagingSenderId: "1065711539927",
  appId: "1:1065711539927:web:008be3c222e1c447f68292",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};
