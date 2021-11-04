import { createSelector } from 'reselect';

// Inputs selectors
const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
);

export const selectCollection = collectionId => createSelector(
    [selectCollections],
    (collections) => collections[collectionId]
);

