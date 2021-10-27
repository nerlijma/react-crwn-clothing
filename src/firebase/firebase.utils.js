import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { onSnapshot, getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCfg6ClOSKefjbMUoi0Optf6qGGhLMM4sc",
    authDomain: "crwn-db-aa2ef.firebaseapp.com",
    projectId: "crwn-db-aa2ef",
    storageBucket: "crwn-db-aa2ef.appspot.com",
    messagingSenderId: "573026260800",
    appId: "1:573026260800:web:b4d5af5c73e7edb7c6cca5"
};

const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
export const auth = getAuth(app);
// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

// const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider).then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    // const user = result.user;

}).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    console.log(`errorCode: ${errorCode}`);

    // const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.email;
    // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
});

const db = getFirestore();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    // v9
    const userRef = doc(db, `users/${userAuth.uid}`);
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    const data = {
        displayName,
        email,
        createdAt,
        ...additionalData
    };

    try {
        await setDoc(userRef, data);
    } catch (error) {
        console.log('error creating user', error.message);
    }

    return userRef;
}

export const updateUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    // v9
    const userRef = doc(db, `users/${userAuth.uid}`);

    const data = {
        ...additionalData
    };

    try {
        await updateDoc(userRef, data);
    } catch (error) {
        console.log('error creating user', error.message);
    }

    return userRef;
}

export const createUserProfileWithEmailAndPassword = async (email, password, displayName) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            updateUserProfileDocument(user, { displayName: displayName })
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`errorCode ${errorCode} message: ${errorMessage}`);
            return null;
        });
}

export { onSnapshot };
