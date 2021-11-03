import { createSelector } from 'reselect';

// Inputs selectors
const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
);

