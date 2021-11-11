import './App.css';
import HomePage from './homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import { Switch, Route, Redirect } from 'react-router-dom';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import React from 'react';
import { connect } from 'react-redux'
// import { auth, createUserProfileDocument, onSnapshot } from './firebase/firebase.utils'
import { checkUserSession, setCurrentUser } from './redux/user/user.actions'
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './pages/checkout/checkout.component';


class App extends React.Component {

  componentDidMount() {
    const { checkUserSession } = this.props;

    checkUserSession();
    // const { setCurrentUser } = this.props;
    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {
    //     console.log('onAuthStateChanged', userAuth.email, userAuth.currentUser);

    //     const userRef = await createUserProfileDocument(userAuth);
    //     onSnapshot(userRef, doc => {
    //       setCurrentUser({
    //         id: doc.id,
    //         ...doc.data()
    //       });
    //     });

    //     // if (userAuth.metadata.createdAt === userAuth.metadata.lastLoginAt) {

    //   } else {
    //     setCurrentUser(null);
    //   }
    // });

    // Only to add collection items to Firestore
    // const collectionsArray = selectCollectionsAsArray;
    // const array = collectionsArray.map(({ title, items }) => ({ title, items }));
    // addCollectionAndDocuments('collections', array)

  }

  componentWillUnmount() {
    // this.unsubscribeFromAuth();
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
          <Route exact path='/checkout' component={CheckoutPage} />
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
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  checkUserSession: () => dispatch(checkUserSession())
})


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
