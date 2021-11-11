import { all, call } from 'redux-saga/effects';
import { fetchCollectionsStart } from 'redux/shop/shop.sagas';
import { usersSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga() {
    // Inicializa todas las sagas en paralelo
    yield all([
        call(fetchCollectionsStart),
        call(usersSagas),
        call(cartSagas)
    ]);
}