import ShopActionTypes from "./shop.types";
import { convertCollectionSnapshotToMap, getCollectionsSnapshot } from 'firebase/firebase.utils'

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = (collectionMap) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionMap
});

export const fetchCollectionsFailure = (errorMessage) => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        dispatch(fetchCollectionsStart());
        const collectionsRef = getCollectionsSnapshot();

        collectionsRef
            .then(collSnapshot => {
                const collectionsMap = convertCollectionSnapshotToMap(collSnapshot);
                dispatch(fetchCollectionsSuccess(collectionsMap));
            })
            .catch(error => dispatch(fetchCollectionsFailure(error.message)))
    }
};



