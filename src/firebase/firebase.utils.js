import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
    onSnapshot,
    getFirestore,
    doc,
    collection,
    setDoc,
    getDoc,
    getDocs,
    updateDoc,
    writeBatch
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCfg6ClOSKefjbMUoi0Optf6qGGhLMM4sc",
    authDomain: "crwn-db-aa2ef.firebaseapp.com",
    projectId: "crwn-db-aa2ef",
    storageBucket: "crwn-db-aa2ef.appspot.com",
    messagingSenderId: "573026260800",
    appId: "1:573026260800:web:b4d5af5c73e7edb7c6cca5"
};

const app = initializeApp(firebaseConfig);

export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);

export { onSnapshot };

export { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile };

// const provider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider).then((result) => {
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
    let docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
        // If user does not exists, create the user document
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
            docSnap = await getDoc(userRef);
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return docSnap;
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
            updateProfile(user, { displayName: displayName }).then(() => {
            });
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`errorCode ${errorCode} message: ${errorMessage}`);
            return null;
        });
}

export const signInUserWithEmailAndPassword = async (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log('user logged', userCredential.user);
            return user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(`errorCode ${errorCode} message: ${errorMessage}`);
            return null;
        });
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    try {
        const batch = writeBatch(db);
        objectsToAdd.forEach(item => {
            const newDocRef = doc(collection(db, collectionKey), item.title);
            batch.set(newDocRef, item);
        });

        await batch.commit();

    } catch (error) {
        console.log(error);
    }

    return null;
}

export const convertCollectionSnapshotToMap = collectionsSnapshot => {
    const arr = collectionsSnapshot.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            id: doc.id,
            routeName: encodeURI(title.toLowerCase()),
            title,
            items
        }
    });

    return arr.reduce((acc, collection) => {
        acc[collection.id.toLowerCase()] = collection;
        return acc;
    }, {});
}

export const getCollections = () => collection(db, "collections");

export const getCollectionsSnapshot = () => getDocs(collection(db, "collections"));


export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribeFromAuth = auth.onAuthStateChanged(userAuth => {
            unsubscribeFromAuth();
            resolve(userAuth);
        }, reject)
    });
}

// export const getShopCollections = () => {
//     const col = collection(db, "collections");

//     const unsubscribe = onSnapshot(col, (collSnapshot) => {

//         const arr = collSnapshot.docs.map(doc => {
//             const { title, items } = doc.data();

//             return {
//                 id: doc.id,
//                 routeName: encodeURI(title.toLowerCase()),
//                 title,
//                 items
//             }
//         });


//     });
// }



