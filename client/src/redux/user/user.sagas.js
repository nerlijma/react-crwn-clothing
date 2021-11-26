import { takeLatest, call, put, all } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import {
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    auth,
    googleProvider,
    createUserProfileDocument,
    getCurrentUser,
    updateProfile
} from 'firebase/firebase.utils'

import { signInSuccess, signInFailure, signOutFailure, signOutSuccess, signUpSuccess, signUpFailure } from './user.actions'


export function* googleSignIn() {
    try {
        const { user } = yield signInWithPopup(auth, googleProvider);
        yield googleAndEmailSignIn(user);

    } catch (error) {
        console.log(error);
        yield put(signInFailure(error));
    }
}

// Recibe {payload: {obj de payload}, action: ''}
export function* emailSignIn({ payload: { email, password } }) {
    try {
        const { user } = yield signInWithEmailAndPassword(auth, email, password);
        yield googleAndEmailSignIn(user);

    } catch (error) {
        console.log(error);
        yield put(signInFailure(error));
    }
}

// creates user in database (if does not exists) and signs in the user
export function* googleAndEmailSignIn(user, additionalData) {
    try {
        const userSnapshot = yield call(createUserProfileDocument, user, additionalData);
        const userForSignIn = { id: userSnapshot.id, ...userSnapshot.data() };
        yield put(signInSuccess(userForSignIn));

    } catch (error) {
        console.log(error);
        yield put(signInFailure(error));
    }
}

export function* checkUserSession() {
    try {
        const user = yield call(getCurrentUser)
        if (!user) return;

        yield googleAndEmailSignIn(user);
    } catch (error) {
        console.log(error);
        yield put(signInFailure(error));
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(
        UserActionTypes.GOOGLE_SIGN_IN_START,
        googleSignIn
    )
}

export function* onEmailSignInStart() {
    yield takeLatest(
        UserActionTypes.EMAIL_SIGN_IN_START,
        emailSignIn
    )
}

export function* onCheckUserSession() {
    yield takeLatest(
        UserActionTypes.CHECK_USER_SESSION,
        checkUserSession
    )
}

export function* signOutStart() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());

    } catch (error) {
        console.log(error);
        yield put(signOutFailure(error));
    }
}


export function* signUpStart({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield createUserWithEmailAndPassword(auth, email, password);
        yield updateProfile(user, { displayName: displayName });
        yield put(signUpSuccess({ user, additionalData: { displayName } }));

    } catch (error) {
        console.log(error);
        yield put(signUpFailure(error));
    }
}

// After sign in, just create user in db and sign in
export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    try {
        yield googleAndEmailSignIn(user, additionalData);

    } catch (error) {
        console.log(error);
        yield put(signInFailure(error));
    }
}


export function* onSignOutStart() {
    yield takeLatest(
        UserActionTypes.SIGN_OUT_START,
        signOutStart
    )
}

export function* onSignUpStart() {
    yield takeLatest(
        UserActionTypes.SIGN_UP_START,
        signUpStart
    )
}

export function* onSignUpSuccess() {
    yield takeLatest(
        UserActionTypes.SIGN_UP_SUCCESS,
        signInAfterSignUp
    )
}

export function* usersSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}

