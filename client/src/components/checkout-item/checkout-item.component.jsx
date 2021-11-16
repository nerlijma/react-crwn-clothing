import React from 'react';
import { clearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.actions'
import { connect } from 'react-redux'
import './checkout-item.styles.scss'

const CheckoutItem = ({ cartItem, addItem, removeItem, clearItemFromCart }) => {
    const { name, imageUrl, quantity, price } = cartItem;

    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img alt='item' src={imageUrl} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div onClick={() => removeItem(cartItem)} className='arrow'>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div onClick={() => addItem(cartItem)} className='arrow'>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div onClick={() => clearItemFromCart(cartItem)} className='remove-button'>&#10005;</div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    removeItem: item => dispatch(removeItem(item)),
    addItem: item => dispatch(addItem(item)),
    clearItemFromCart: item => dispatch(clearItemFromCart(item))
});


export default connect(
    null,
    mapDispatchToProps
)(CheckoutItem);
