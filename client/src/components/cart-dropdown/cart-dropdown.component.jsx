import React from 'react'
import CustomButton from '../custom-button/custom-button.component'
import CartItem from '../cart-item/cart-item.component'
import { selectCartItems } from '../../redux/cart/cart.selectors'
import { setToogleVisibility } from '../../redux/cart/cart.actions'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './cart-dropdown.styles.scss'

const CartDropdown = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const cartItems = useSelector(selectCartItems);

    return (
        <div className='cart-dropdown'>
            <div className='cart-items'>
                {
                    cartItems.length ?
                        (cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem} />))
                        : (<span className='empty-message'>Your cart is empty</span>)
                }
            </div>
            <CustomButton onClick={() => {
                history.push('/checkout');
                dispatch(setToogleVisibility());
            }}>GO TO CHECKOUT
            </CustomButton>
        </div>
    )
}

export default CartDropdown;