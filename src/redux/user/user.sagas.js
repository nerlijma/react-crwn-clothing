import { takeLatest, call, put, all } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { signInWithPopup, signInWithEmailAndPassword, auth, googleProvider, createUserProfileDocument, getCurrentUser } from 'firebase/firebase.utils'
import { signInSuccess, signInFailure, signOutFailure, signOutSuccess } from './user.actions'


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

export function* googleAndEmailSignIn(user) {
    try {
        const userSnapshot = yield call(createUserProfileDocument, user);
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

export function* onSignOutStart() {
    yield takeLatest(
        UserActionTypes.SIGN_OUT_START,
        signOutStart
    )
}

export function* usersSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOutStart)
    ]);
}

