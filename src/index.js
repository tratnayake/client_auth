//Required Modules
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

//actions
import { AUTH_USER } from './actions/types'
;
//Components
import App from './components/app';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Welcome from './components/welcome';

//Reducers
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
//Check if we have a token, consider user signed in.
if(token){
  store.dispatch({type: AUTH_USER})
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      <IndexRoute component={Welcome}/>
        <Route path="signin" component={Signin}></Route>
        <Route path="signout" component={Signout}></Route>
        <Route path="signup" component={Signup}></Route>
        <Route path="feature" component={RequireAuth(Feature)}></Route>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
