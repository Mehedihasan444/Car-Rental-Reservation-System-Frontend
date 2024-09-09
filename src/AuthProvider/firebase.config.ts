// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId
  };
  
// const firebaseConfig = {
//   apiKey: "AIzaSyCYPLAH2v81ATXWVKMJyg6Bccs3kdN4Epo",
//   authDomain: "rentocar-9ac4a.firebaseapp.com",
//   projectId: "rentocar-9ac4a",
//   storageBucket: "rentocar-9ac4a.appspot.com",
//   messagingSenderId: "763808978013",
//   appId: "1:763808978013:web:ff4361af574d34ed0a29b4"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;