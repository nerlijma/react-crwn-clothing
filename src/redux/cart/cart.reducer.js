import { CartActionTypes } from './cart.action.types';
import { addItemToCart } from './cart.utils';

const INITIAL_STATE = {
    visible: false,
    cartItems: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.SET_TOOGLE_VISIBILITY:
            return {
                ...state,
                visible: !state.visible
            }

        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }


        default:
            return state;
    }
}

export default cartReducer;