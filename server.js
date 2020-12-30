const { strict } = require('assert');
const express = require('express');
var $ = require('jquery');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
var path = require('path');
const { response } = require('express');
const { default: axios } = require('axios');
const PORT = 8000;

app.use(cors());

app.use(express.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });


app.get('/geolocation/:ip?', (req, res) => {
    //    if (req.params.ip.match(/^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)(?:\:(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/) || req.params.ip.match(/^(?:^|(?<=\s))(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))(?=\s|$)/)){

    if (!req.params.ip){
        //console.log(req.params.ip);
        fetch(`https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=at_0ZcgWPlO2upJlIIrRPC5QErbMxDbY&ipAddress=`, {headers: {"Content-Type": "application/json"}})
        .then(jsonData => jsonData.json())
        .then(json => {
            //console.log(json);
            res.send(json);
        })
        .catch(err => {
            console.log(err);
        })
    }

    else {
        //console.log('ip address does not exist');
        fetch(`https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=at_0ZcgWPlO2upJlIIrRPC5QErbMxDbY&ipAddress=${req.params.ip}`, {headers: {"Content-Type": "application/json"}})
        .then(jsonData => jsonData.json())
        .then(json => {
            //console.log(json);
            res.send(json);
        })
        .catch(err => {
            console.log(err);
        })
    }
});

app.listen(PORT, function(){
    console.log('express app listening on port', PORT);
});
 
