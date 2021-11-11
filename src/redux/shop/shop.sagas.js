import { takeLatest, call, put, all } from 'redux-saga/effects';
import { convertCollectionSnapshotToMap, getCollectionsSnapshot } from 'firebase/firebase.utils';
import ShopActionTypes from "./shop.types";
import { fetchCollectionsFailure, fetchCollectionsSuccess } from './shop.actions'

export function* fetchCollectionsAsync() {
    try {
        yield console.log('i am fired');

        const collectionsSnapshot = yield getCollectionsSnapshot();
        const collectionsMap = yield call(convertCollectionSnapshotToMap, collectionsSnapshot);
        yield put(fetchCollectionsSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}

export function* shopSagas() {
    yield all([
        call(fetchCollectionsStart)
    ]);
}
