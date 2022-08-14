import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyCCregq7DzTSgeeIDKe9LXNiMUCfifOInA",
  authDomain: "host-356301.firebaseapp.com",
  projectId: "host-356301",
  storageBucket: "host-356301.appspot.com",
  messagingSenderId: "31776363284",
  appId: "1:31776363284:web:3dfdd015b18678b007a801",
  measurementId: "G-VRCX4PFF0P",
});

// Firebase storage reference
const storage = getStorage(app);
export default storage;
