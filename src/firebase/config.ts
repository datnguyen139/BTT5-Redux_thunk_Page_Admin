import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore"

export const firebaseConfig = {
  apiKey: "AIzaSyDDt5lkIriYb_qalgyXK9DI38vLmtmOdR0",
  authDomain: "app-chat-react-a4c8b.firebaseapp.com",
  projectId: "app-chat-react-a4c8b",
  storageBucket: "app-chat-react-a4c8b.appspot.com",
  messagingSenderId: "816887991289",
  appId: "1:816887991289:web:3d8902779ed55489088b28",
  measurementId: "G-P9JB1Y4G2X"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
