import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import AuthRoute from './AuthRoute';
import Home from '../Home/Home';
import SignIn from '../SignIn/SignIn';

const App = () => (
  <BrowserRouter>
    <div>
      <Route path="/" exact component={SignIn} />
      <AuthRoute path="/Home" component={Home} />
    </div>
  </BrowserRouter>
);

export default App;
