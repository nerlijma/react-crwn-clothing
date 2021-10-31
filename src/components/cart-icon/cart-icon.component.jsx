import React from 'react'
import { connect } from 'react-redux'
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg'
import { setToogleVisibility } from '../../redux/cart/cart.actions'

import './cart-icon.styles.scss'

const CartIcon = ({ setToogleVisibility }) => (
    <div className='cart-icon' onClick={setToogleVisibility} >
        <ShoppingIcon className='shopping-icon' />
        <span className='item-count'>100</span>
    </div>
)

const mapDispatchToProps = dispatch => ({
    setToogleVisibility: () => dispatch(setToogleVisibility())
})

export default connect(
    null,
    mapDispatchToProps
)(CartIcon);