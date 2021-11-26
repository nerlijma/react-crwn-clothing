import { takeLatest, call, put, all } from 'redux-saga/effects';
import UserActionTypes from 'redux/user/user.types';
import CartActionTypes from 'redux/cart/cart.types';
import {
    clearCart,
    addItemSuccess,
    addItemFailure,
    loadCartSuccess,
    loadCartFailure,
    removeItemSuccess,
    removeItemFailure,
    clearItemSuccess,
    clearItemFailure,
    cartLoading
} from './cart.actions';

import {
    createUserCartItem,
    getCartItems,
    removeUserCartItem,
    clearUserCartItem
} from '../../firebase/firebase.utils';

import { select } from 'redux-saga/effects';
import { selectCurrentUser } from '../user/user.selectors';

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

export function* addItemStartAsync(action) {
    const item = action.payload;
    try {
        yield put(cartLoading(item.id, true));

        let user = yield select(selectCurrentUser);

        // Check if Cart item exists in users/{user}/cart
        yield call(createUserCartItem, user, item);

        const cartItems = yield call(getCartItems, user);

        yield put(addItemSuccess(cartItems));

        yield put(cartLoading(item.id, false));

    } catch (error) {
        console.log(error);
        yield put(addItemFailure(error));
        yield put(cartLoading(item.id, false));
    }
}

export function* removeItemStartAsync(action) {
    try {
        const item = action.payload;
        let user = yield select(selectCurrentUser);

        // Check if Cart item exists in users/{user}/cart
        yield call(removeUserCartItem, user, item);

        const cartItems = yield call(getCartItems, user);

        yield put(removeItemSuccess(cartItems));

    } catch (error) {
        console.log(error);
        yield put(removeItemFailure(error));
    }
}

export function* clearItemStartAsync(action) {
    try {
        const item = action.payload;
        let user = yield select(selectCurrentUser);

        // Check if Cart item exists in users/{user}/cart
        yield call(clearUserCartItem, user, item);

        const cartItems = yield call(getCartItems, user);

        yield put(clearItemSuccess(cartItems));

    } catch (error) {
        console.log(error);
        yield put(clearItemFailure(error));
    }
}

export function* onAddItemStart() {
    yield takeLatest(
        CartActionTypes.ADD_ITEM_START,
        addItemStartAsync
    )
}

export function* onRemoveItemStart() {
    yield takeLatest(
        CartActionTypes.REMOVE_ITEM_START,
        removeItemStartAsync
    )
}

export function* onClearItemStart() {
    yield takeLatest(
        CartActionTypes.CLEAR_ITEM_START,
        clearItemStartAsync
    )
}


export function* loadCartStartAsync() {
    try {
        let user = yield select(selectCurrentUser);

        const cartItems = yield call(getCartItems, user);

        yield put(loadCartSuccess(cartItems));

    } catch (error) {
        console.log(error);
        yield put(loadCartFailure(error));
    }
}

// On SignIn, Load the cart
export function* onLoadCartStart() {
    yield takeLatest(
        UserActionTypes.SIGN_IN_SUCCESS,
        loadCartStartAsync
    )
}

export function* cartSagas() {
    yield all([
        call(onSignOutSuccess),
        call(onAddItemStart),
        call(onRemoveItemStart),
        call(onClearItemStart),
        call(onLoadCartStart),
    ]);
}

