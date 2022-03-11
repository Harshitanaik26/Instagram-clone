import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBc90GcoUlWmZSaGX0p-wc0R9iBtuiiUK8",
    authDomain: "instagram-clone-react-4bfeb.firebaseapp.com",
    projectId: "instagram-clone-react-4bfeb",
    storageBucket: "instagram-clone-react-4bfeb.appspot.com",
    messagingSenderId: "157491389453",
    appId: "1:157491389453:web:f4270050e877104ff8e144",
    measurementId: "G-1Z1GP4TV9K"
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth and storage
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebaseApp.storage();

export { auth, db ,storage ,provider};