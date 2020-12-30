import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import axios from 'axios';

export class HomePage extends Component {
    constructor(props) {
      super(props);
      this.state = { ipAddress: "", myCountry: "", myRegion: "", myCity: "", myLat: "", myLng: "", postalCode: "", timeZone: "", ispName: "", connectionType: "" };
    }

  async callAPI() {
    axios.get('http://localhost:8000/geolocation')
    .then(result => {
        this.setState({ ipAddress: result.data.ip, 
                        myCountry: result.data.location.country,
                        myRegion: result.data.location.region,
                        myCity: result.data.location.city,
                        myLat: result.data.location.lat,
                        myLng:  result.data.location.lng,
                        postalCode: result.data.location.postalCode,
                        timeZone: result.data.location.timezone,
                        ispName: result.data.isp,
                        connectionType: result.data.connectionType})
    });
}

    componentDidMount() {
        if (!this.state.ipAddress){
          this.callAPI();
        }
    }


    render(){
      if (this.state.myLat && this.state.myLng){
        var myLatitude = this.state.myLat;
        var myLongitude = this.state.myLng;
  
        const google = window.google;
        let map;
  
        function initMap() {
          map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: myLatitude, lng: myLongitude },
            zoom: 10,
          });
        }
  
        initMap();
      }

      
        return (
          <div>
              <div id="display">
              <h1>Hey. Show my IP address.</h1>
              <p id="public-ip">Your public IP address is </p><span id="ip-address">{this.state.ipAddress}</span>

              
              <br></br>
              <p>{(this.state.myCity && this.state.myRegion && this.state.myCountry) ? (`${this.state.myCity + `, ` + this.state.myRegion + `, ` + this.state.myCountry}`) : ""}</p>
              </div>

              <div id="box-container">
                  <div id="map" className="map">
                    
                  </div>

                  <div id="info">
                  <ul>
                      <li>City: {this.state.myCity ? this.state.myCity : "N/A"}</li>
                      <li>State: {this.state.myRegion ? this.state.myRegion : "N/A"}</li>
                      <li>Country: {this.state.myCountry ? this.state.myCountry : "N/A"}</li>
                      <li>Timezone: {this.state.timeZone ? this.state.timeZone : "N/A"}</li>
                      <li>Latitude: {this.state.myLat ? this.state.myLat : ""}</li>
                      <li>Longitude: {this.state.myLng ? this.state.myLng : ""}</li>
                      <li>Postal Code: {this.state.postalCode ? this.state.postalCode : "N/A"}</li>
                      <li>ISP Name: {this.state.connectionType ? (`${this.state.ispName} (${this.state.connectionType})`) : this.state.ispName}</li>
                  </ul>
                  </div>
              </div>
          </div>
        )
    }
}