import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyACPSx1P60BKVr8qh6ruHp-U0GyvEfcs-g",
  authDomain: "miniblog-d998f.firebaseapp.com",
  projectId: "miniblog-d998f",
  storageBucket: "miniblog-d998f.firebasestorage.app",
  messagingSenderId: "787551731371",
  appId: "1:787551731371:web:d297dc7aa204f6bcfc01ee"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export { db }