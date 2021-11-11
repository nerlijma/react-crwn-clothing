import React from 'react'
import { connect } from 'react-redux'
import { ReactComponent as Logo } from '../../assets/crown.svg'
// import { auth } from '../../firebase/firebase.utils'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import CartIcon from '../cart-icon/cart-icon.component'
import { createStructuredSelector } from 'reselect';
import { selectCartVisible } from '../../redux/cart/cart.selectors'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import { HeaderContainer, LogoContainer, OptionsContainer, OptionDiv, OptionLink } from './header.styles'
// import { signOut } from '@firebase/auth'
import { signOutStart } from 'redux/user/user.actions';

// import './header.styles.scss'

const Header = ({ currentUser, visible, signOutStart }) => {

    return (

        <HeaderContainer>
            <LogoContainer to='/'>
                <Logo className='logo' />
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to='/shop'>
                    SHOP
                </OptionLink>
                <OptionLink to='/contact'>
                    CONTACT
                </OptionLink>
                {
                    currentUser ?
                        <OptionDiv onClick={() => signOutStart()}>SIGN OUT</OptionDiv>
                        :
                        <OptionLink to='/sign-in'>
                            SIGN IN
                        </OptionLink>
                }
                <CartIcon />
            </OptionsContainer>

            {(visible) && <CartDropdown />}

        </HeaderContainer>
    )
}

const mapDispatchToProps = dispach => ({
    signOutStart: () => dispach(signOutStart())
})

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    visible: selectCartVisible
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);