import React from 'react'
import { connect } from 'react-redux'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { setToogleVisibility } from '../../redux/cart/cart.actions'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'
import { createStructuredSelector } from 'reselect';

import './cart-icon.styles.scss'

const CartIcon = ({ setToogleVisibility, itemCount }) => (
    <div className='cart-icon' onClick={setToogleVisibility} >
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>{itemCount}</span>
    </div>
)

const mapStateToProps = createStructuredSelector({
    itemCount: selectCartItemsCount
})

const mapDispatchToProps = dispatch => ({
    setToogleVisibility: () => dispatch(setToogleVisibility())
})



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CartIcon);