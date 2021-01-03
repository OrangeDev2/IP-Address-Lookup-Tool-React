import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
require('dotenv').config();

ReactDOM.render(
  <nav>
    <a href="/" style={{fontWeight: "bold", textDecoration: "none"}}>showip.io</a>
    <a href="/ip-search">IP Lookup</a>
    <a href="/about">About Us</a>
  </nav>,
  document.getElementById('header')
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

//<p>Made with <a href="https://developers.google.com/maps" target="_blank" rel="noreferrer" style={{color: "white"}}>Google Maps API</a> and <a href="https://ip-geolocation.whoisxmlapi.com/api" target="_blank" rel="noreferrer" style={{color: "white"}}>WhoisXMLAPI</a>  © 2020 showip.io</p>

ReactDOM.render(
  <p className="copyright" style={{color: "#D6DFE5"}}>© 2021 showip.io</p>
  ,
  document.getElementById('footer')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
