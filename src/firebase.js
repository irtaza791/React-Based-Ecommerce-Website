// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "@firebase/firestore"
import {getStorage} from "firebase/storage"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHNFasty-nGSt75BfuH7n_qe12GdHHIdI",
  authDomain: "ecommercesite-ed07a.firebaseapp.com",
  projectId: "ecommercesite-ed07a",
  storageBucket: "ecommercesite-ed07a.appspot.com",
  messagingSenderId: "902638209144",
  appId: "1:902638209144:web:4f9b22494478d3abe4858d",
  measurementId: "G-FEDPHL3DH2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);