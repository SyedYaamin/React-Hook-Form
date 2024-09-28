import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCnPlbxzfov4Toiveg_Ohjd7KDIoRbk7c0",
    authDomain: "react-hooks-form1.firebaseapp.com",
    projectId: "react-hooks-form1",
    storageBucket: "react-hooks-form1.appspot.com",
    messagingSenderId: "679550552434",
    appId: "1:679550552434:web:4783da5caf296ab63d35eb",
    measurementId: "G-VQPYD9R59B"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


