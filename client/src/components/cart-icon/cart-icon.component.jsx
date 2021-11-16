import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { setToogleVisibility } from '../../redux/cart/cart.actions'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'

import './cart-icon.styles.scss'

const CartIcon = () => {

    const dispatch = useDispatch();
    const itemCount = useSelector(selectCartItemsCount);
    const setToogleVisibilityHander = () => dispatch(setToogleVisibility());

    return (
        <div className='cart-icon' onClick={setToogleVisibilityHander} >
            <ShoppingIcon className='shopping-icon' />
            <span className='item-count'>{itemCount}</span>
        </div>
    )
}

export default CartIcon;