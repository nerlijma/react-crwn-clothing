import { CartActionTypes } from "./cart.action.types";

export const setToogleVisibility = () => ({
    type: CartActionTypes.SET_TOOGLE_VISIBILITY,
    payload: null
});

export const addItem = (item) => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
});