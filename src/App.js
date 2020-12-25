import React, { Component } from 'react';
//import './App.css';
import './main.css';
import './jQuery/background.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

// Pages 
import {HomePage} from './pages/home';
import AboutPage from './pages/about';
import ErrorPage from './pages/404';
import IPLookUpPage from './pages/ip-lookup';

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/404" component={ErrorPage}/>
          <Route exact path="/about" component={AboutPage}/>
          <Route exact path="/ip-search" component={IPLookUpPage}/>
          <Redirect to="/404" component={ErrorPage}/>
        </Switch>
      </Router>
    )
  }
}
export default App;
