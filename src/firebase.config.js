import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHgVQo54AelG2lR8HnqlRE1PREb5xdlL0",
  authDomain: "restaurant-app-c5f2a.firebaseapp.com",
  databaseURL: "https://restaurant-app-c5f2a-default-rtdb.firebaseio.com",
  projectId: "restaurant-app-c5f2a",
  storageBucket: "restaurant-app-c5f2a.appspot.com",
  messagingSenderId: "687704740830",
  appId: "1:687704740830:web:ff6416c6021ffcaa97c34f",
  measurementId: "G-07MFD23RYX",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const fireStore = getFirestore(app);
const storage = getStorage(app);

export { app, fireStore, storage };
