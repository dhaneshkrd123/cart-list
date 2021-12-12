import React from 'react';
import ReactDOM from "react-dom";

import { BrowserRouter, Route,Switch,Redirect} from 'react-router-dom';
import Login from './login';
import Wishlist from './wishlist';
import Registerform from './register';
import Shop from './shop';
const Routes = () => (
  <BrowserRouter>
    <div className="container">
    <Switch>
     <Route exact path="/" component={Login} /> 
      <Route exact path="/register" component={Registerform} /> 
      <Route exact path="/shop" component={Shop} /> 
     </Switch>
    </div>
  </BrowserRouter>
);

export default Routes;