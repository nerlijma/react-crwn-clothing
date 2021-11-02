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
            <span className='quantity'>
                <div onClick={() => dispatch(removeItem(cartItem))} className='arrow'>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div onClick={() => dispatch(addItem(cartItem))} className='arrow'>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div onClick={() => dispatch(clearItemFromCart(cartItem))} className='remove-button'>&#10005;</div>
        </div>
    )
};

export default connect(
    null,
    null
)(CheckoutItem);
