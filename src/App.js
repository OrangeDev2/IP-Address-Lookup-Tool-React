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
import IPLookUpPage from './pages/ip-lookup';
import WhoisPage from './pages/whois';
import AboutPage from './pages/about';
import ErrorPage from './pages/404';
import DnsLookupPage from './pages/dns-lookup';

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/whois" component={WhoisPage}/>
          <Route exact path="/404" component={ErrorPage}/>
          <Route exact path="/about" component={AboutPage}/>
          <Route exact path="/ip-search" component={IPLookUpPage}/>
          <Route exact path="/dns" component={DnsLookupPage}/>
          <Redirect to="/404" component={ErrorPage}/>
        </Switch>
      </Router>
    )
  }
}
export default App;
