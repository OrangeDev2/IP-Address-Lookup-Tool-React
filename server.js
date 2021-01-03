const { strict } = require('assert');
const express = require('express');
const cors = require('cors');
const app = express();
var path = require('path');
const { default: axios } = require('axios');

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

app.enable('trust proxy');
app.set('trust proxy', true);

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    });
});

app.get('/geolocation/:ip?', (req, res) => {
    if (!req.params.ip){ // no ip address provided.

     let ipAddress = req.ip;

      axios.get(`http://api.ipstack.com/${ipAddress}?access_key=4ee118d18835ef34e8041fe38e81803a&format=1`)
      .then(json => {
          //console.log(json.data);
          res.send(json.data);
      })
      .catch(err => {
          console.log(err);
      });
    }
    
    else if (req.params.ip.match(/^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)(?:\:(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/) || req.params.ip.match(/^(?:^|(?<=\s))(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))(?=\s|$)/)) { // ip address provided

        let ipAddress = req.params.ip;

        axios.get(`http://api.ipstack.com/${ipAddress}?access_key=4ee118d18835ef34e8041fe38e81803a&format=1`)
        .then(json => {
            //console.log(json.data);
            res.send(json.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

});

var port = process.env.PORT || 8000;

app.listen(port, function(){
    console.log('express app listening on port', port);
});
 
