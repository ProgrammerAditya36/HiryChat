// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAs7TfLZ-mwvmSZMh80ii0svGF9K6glqhg",
    authDomain: "chatapp-d5475.firebaseapp.com",
    projectId: "chatapp-d5475",
    storageBucket: "chatapp-d5475.appspot.com",
    messagingSenderId: "475899985246",
    appId: "1:475899985246:web:5ca5e99143ce666ea3e3cf",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
