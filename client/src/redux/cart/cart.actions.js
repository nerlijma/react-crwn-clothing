import CartActionTypes from "./cart.types";

export const setToogleVisibility = () => ({
    type: CartActionTypes.SET_TOOGLE_VISIBILITY
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

// Cart Persited in firebase
export const addItemStart = (item) => ({
    type: CartActionTypes.ADD_ITEM_START,
    payload: item
});

export const addItemSuccess = (item) => ({
    type: CartActionTypes.ADD_ITEM_SUCCESS,
    payload: item
});

export const addItemFailure = (errorMessage) => ({
    type: CartActionTypes.ADD_ITEM_FAILURE,
    payload: errorMessage
});

export const removeItemStart = (item) => ({
    type: CartActionTypes.REMOVE_ITEM_START,
    payload: item
});

export const removeItemSuccess = (item) => ({
    type: CartActionTypes.REMOVE_ITEM_SUCCESS,
    payload: item
});

export const removeItemFailure = (errorMessage) => ({
    type: CartActionTypes.REMOVE_ITEM_FAILURE,
    payload: errorMessage
});

export const clearItemStart = (item) => ({
    type: CartActionTypes.CLEAR_ITEM_START,
    payload: item
});

export const clearItemSuccess = (item) => ({
    type: CartActionTypes.CLEAR_ITEM_SUCCESS,
    payload: item
});

export const clearItemFailure = (errorMessage) => ({
    type: CartActionTypes.CLEAR_ITEM_FAILURE,
    payload: errorMessage
});

export const loadCartStart = () => ({
    type: CartActionTypes.LOAD_CART_START
})

export const loadCartSuccess = (cart) => ({
    type: CartActionTypes.LOAD_CART_SUCCESS,
    payload: cart
});

export const loadCartFailure = (errorMessage) => ({
    type: CartActionTypes.LOAD_CART_FAILURE,
    payload: errorMessage
});

// Used then performed some action agaists the cart item (load, remove, clear)
export const cartLoading = (id, loading) => ({
    type: CartActionTypes.CART_LOADING,
    payload: { id, loading }
});



