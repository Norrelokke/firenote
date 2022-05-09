import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {

    apiKey: "AIzaSyCNYDAxs-8T9B6_qIIf7Ox8A6gmmayq7kQ",
    authDomain: "firenote-25182.firebaseapp.com",
    projectId: "firenote-25182",
    storageBucket: "firenote-25182.appspot.com",
    messagingSenderId: "473871512660",
    appId: "1:473871512660:web:35225075fdc14847ad69c1"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig)

// get firestore auth instance
const auth = getAuth()

// gets firebase storage instance/service
const storage = getStorage(app)

// gets firebase db 
const db = getFirestore(app)

export {
	app as default,
  auth,
	db,
  storage,
}