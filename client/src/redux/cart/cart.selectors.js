import { createSelector } from 'reselect';

// Inputs selectors
const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    (cart) => cart.cartItems
);

export const selectCartVisible = createSelector(
    [selectCart],
    (cart) => cart.visible
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => {
        return cartItems ? cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0) : 0
    }
);

export const selectCartTotal = createSelector(
    [selectCartItems],
    cartItems => {
        return cartItems ? cartItems.reduce((acc, cartItem) => acc + (cartItem.quantity * cartItem.price), 0) : 0
    }
);

// Used when adding, removing or clearing cart items. Returns the array of items that are loading
export const selectLoading = createSelector(
    [selectCart],
    (cart) => cart.loading
);