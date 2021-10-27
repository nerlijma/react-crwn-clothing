import './App.css';
import HomePage from './homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'

import React from 'react';
import { auth, createUserProfileDocument, onSnapshot } from './firebase/firebase.utils'


class App extends React.Component {

  unsubscribeFromAuth = null;

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null
    }
  }

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        onSnapshot(userRef, doc => {
          this.setState({
            currentUser: {
              id: doc.id,
              ...doc.data()
            }
          });
        })
      } else {
        this.setState({
          currentUser: null
        })
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <p>{this.state.currentUser?.email}</p>
        {this.state.currentUser && (<div onClick={x => auth.signOut()}>Signout</div>)}
        <BrowserRouter>
          <Header currentUser={this.state.currentUser} />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/shop' component={ShopPage} />
            <Route exact path='/sign-in' component={SignInAndSignUp} />

          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
