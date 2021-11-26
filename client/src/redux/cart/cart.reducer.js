import { CartActionTypes } from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils';

const INITIAL_STATE = {
    visible: false,
    cartItems: [],
    loading: [] // Array of id of items that are loading
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.SET_TOOGLE_VISIBILITY:
            return {
                ...state,
                visible: !state.visible
            }

        // Not used anymore as now has firestore integration
        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
            }

        // Not used anymore as now has firestore integration
        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(cartItem => cartItem.id !== action.payload.id)
            }

        // Not used anymore as now has firestore integration
        case CartActionTypes.REMOVE_ITEM:
            return {
                ...state,
                cartItems: removeItemFromCart(state.cartItems, action.payload)
            }

        case CartActionTypes.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }

        case CartActionTypes.LOAD_CART_SUCCESS:
        case CartActionTypes.ADD_ITEM_SUCCESS:
        case CartActionTypes.REMOVE_ITEM_SUCCESS:
        case CartActionTypes.CLEAR_ITEM_SUCCESS:
            const userCartItems = action.payload;
            return {
                ...state,
                cartItems: userCartItems
            }

        case CartActionTypes.CART_LOADING:
            let { id, loading } = action.payload;
            let newLoadingArray = state.loading;
            newLoadingArray[id] = loading;

            return {
                ...state,
                loading: [...newLoadingArray]
            }

        default:
            return state;
    }
}

export default cartReducer;