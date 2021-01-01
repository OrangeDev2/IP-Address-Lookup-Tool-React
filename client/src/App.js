import React, { Component } from 'react';
import './main.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

// Pages 
import {HomePage} from './pages/home';
import IPLookUpPage from './pages/ip-lookup';
import ErrorPage from './pages/404';
import AboutPage from './pages/about';

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/404" component={ErrorPage}/>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/about" component={AboutPage}/>
          <Route exact path="/ip-search" component={IPLookUpPage}/>
          <Redirect to="/404"/>
        </Switch>
      </Router>
    )
  }
}
export default App;
