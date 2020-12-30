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
import DnsLookupPage from './pages/dns-lookup';
import geolocationApiPage from './pages/api';

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route exact path="/404.html"/>
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/whois" component={WhoisPage}/>
          
          <Route exact path="/api" component={geolocationApiPage}/>

          <Route exact path="/about" component={AboutPage}/>
          <Route exact path="/ip-search" component={IPLookUpPage}/>
          <Route exact path="/dns" component={DnsLookupPage}/>
          <Redirect to="/404.html"/>
        </Switch>
      </Router>
    )
  }
}
export default App;
