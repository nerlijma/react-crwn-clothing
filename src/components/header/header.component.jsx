import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/crown.svg'
import { auth } from '../../firebase/firebase.utils'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import CartIcon from '../cart-icon/cart-icon.component'

import './header.styles.scss'

const Header = ({ currentUser, visible }) => {

    return (

        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div className='options'>
                <Link className='option' to='/shop'>
                    SHOP
                </Link>
                <Link className='option' to='/contact'>
                    CONTACT
                </Link>
                {
                    currentUser ?
                        <div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
                        :
                        <Link className='option' to='/sign-in'>
                            SIGN IN
                        </Link>
                }
                <CartIcon />
            </div>

            {(visible) && <CartDropdown />}

        </div>
    )
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    visible: state.cart.visible
})

export default connect(
    mapStateToProps,
    null
)(Header);