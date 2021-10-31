import './App.css';
import HomePage from './homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import { Switch, Route, Redirect } from 'react-router-dom';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import React from 'react';
import { connect } from 'react-redux'
import { auth, createUserProfileDocument, onSnapshot } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.actions'
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        console.log('onAuthStateChanged', userAuth.email, userAuth.currentUser);

        const userRef = await createUserProfileDocument(userAuth);
        onSnapshot(userRef, doc => {
          setCurrentUser({
            id: doc.id,
            ...doc.data()
          });
        });

        // if (userAuth.metadata.createdAt === userAuth.metadata.lastLoginAt) {

      } else {
        setCurrentUser(null);
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.props;
    return (
      <div>
        <p>{currentUser?.email} {currentUser?.displayName}</p>

        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/sign-in' render={() => currentUser ? (<Redirect to='/' />) : (<SignInAndSignUp />)} />

        </Switch>

      </div>
    )
  }
}



const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
