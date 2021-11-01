import React from 'react';
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions'
import { connect } from 'react-redux'
import './checkout-item.styles.scss'

const CheckoutItem = ({ cartItem, dispatch }) => {
    const { name, imageUrl, quantity, price } = cartItem;

    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img alt='item' src={imageUrl} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>{quantity}</span>
            <span className='price'>{price}</span>
            <div onClick={() => dispatch(removeItem(cartItem))} className='remove-button'>&#10094;</div>
            <div onClick={() => dispatch(addItem(cartItem))} className='remove-button'>&#10095;</div>
            <div onClick={() => dispatch(clearItemFromCart(cartItem))} className='remove-button'>&#10005;</div>
        </div>
    )
};

export default connect(
    null,
    null
)(CheckoutItem);
