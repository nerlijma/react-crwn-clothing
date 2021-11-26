import React from 'react';
import { addItemStart, removeItemStart, clearItemStart } from '../../redux/cart/cart.actions'
import { connect } from 'react-redux'
import './checkout-item.styles.scss'

const CheckoutItem = ({ cartItem, addItemStart, removeItemStart, clearItemStart }) => {
    const { name, imageUrl, quantity, price } = cartItem;

    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img alt='item' src={imageUrl} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div onClick={() => removeItemStart(cartItem)} className='arrow'>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div onClick={() => addItemStart(cartItem)} className='arrow'>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div onClick={() => clearItemStart(cartItem)} className='remove-button'>&#10005;</div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    removeItemStart: item => dispatch(removeItemStart(item)),
    addItemStart: item => dispatch(addItemStart(item)),
    clearItemStart: item => dispatch(clearItemStart(item))
});


export default connect(
    null,
    mapDispatchToProps
)(CheckoutItem);
