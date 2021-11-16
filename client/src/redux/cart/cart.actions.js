import { CartActionTypes } from "./cart.action.types";

export const setToogleVisibility = () => ({
    type: CartActionTypes.SET_TOOGLE_VISIBILITY,
    payload: null
});

export const addItem = (item) => ({
    type: CartActionTypes.ADD_ITEM,
    payload: item
});

export const clearItemFromCart = (item) => ({
    type: CartActionTypes.CLEAR_ITEM_FROM_CART,
    payload: item
});

export const removeItem = (item) => ({
    type: CartActionTypes.REMOVE_ITEM,
    payload: item
});

export const clearCart = () => ({
    type: CartActionTypes.CLEAR_CART
});