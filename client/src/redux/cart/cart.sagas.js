import { takeLatest, call, put, all } from 'redux-saga/effects';
import UserActionTypes from 'redux/user/user.types';
import { clearCart } from './cart.actions';

export function* clearCartOnSignOut() {
    try {
        yield put(clearCart());

    } catch (error) {
        console.log(error);
        // yield put(signOutFailure(error));
    }
}

export function* onSignOutSuccess() {
    yield takeLatest(
        UserActionTypes.SIGN_OUT_SUCCESS,
        clearCartOnSignOut
    )
}

export function* cartSagas() {
    yield all([
        call(onSignOutSuccess)
    ]);
}

