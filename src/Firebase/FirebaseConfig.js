import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQ2a65wfCXIl9Jxwvp-imDrAKXUZVKO10",
  authDomain: "tienda-dbf02.firebaseapp.com",
  projectId: "tienda-dbf02",
  storageBucket: "tienda-dbf02.appspot.com",
  messagingSenderId: "561902434116",
  appId: "1:561902434116:web:1c6430b3a157f449fe0911"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
