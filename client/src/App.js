import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Home from './pages/Home/Home.component';
import Shop from './pages/Shop/Shop.component'
import Checkout from './pages/Checkout/Checkout.component'
import Header from './components/Header/Header.component';
import Register from './pages/Register/Register.component';
import { Switch, Route, Redirect } from 'react-router-dom';

import { selectCurrentUser } from './redux/user/user.selector';
import { checkUserSession } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';

import { GlobalStyle } from './global.styles';

const App = ({ currentUser, checkUserSession }) => {

  useEffect(() => {
    checkUserSession();
  },[checkUserSession])


  return (
    <>
      <GlobalStyle/>
      <Header/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/checkout" exact component={Checkout} />
        <Route path="/register" exact  render={() => currentUser ?
          (<Redirect to="/" />) :
          (<Register />)
        }/>
      </Switch>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
