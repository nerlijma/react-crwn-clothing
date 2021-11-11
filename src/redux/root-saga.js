import { all, call } from 'redux-saga/effects';

import { shopSagas } from 'redux/shop/shop.sagas';
import { usersSagas } from 'redux/user/user.sagas';
import { cartSagas } from 'redux/cart/cart.sagas';

export default function* rootSaga() {
    // Inicializa todas las sagas en paralelo
    yield all([
        call(shopSagas),
        call(usersSagas),
        call(cartSagas)
    ]);
}