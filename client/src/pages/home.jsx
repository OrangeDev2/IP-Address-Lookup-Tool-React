import React, { Component } from 'react';
import axios from 'axios';

export class HomePage extends Component {
    constructor(props) {
      super(props);
      this.state = { type: "", ipAddress: "", geonameID: "", myCountryFlag: "", myCountryCode: "", myRegionCode: "", myCountry: "", myRegion: "", myCity: "", myLat: "", myLng: "", postalCode: "", timeZone: "", ispName: "", asn: "" };
    }

  async callAPI() {
    //axios.get(`http://localhost:8000/api/geolocation/`)
    axios.get(`api/geolocation/`)
    .then(result => {
        this.setState({ ipAddress: result.data.ip, 
                        type: `(${result.data.type})`,
                        myCountry: result.data.country_name,
                        myCountryCode: result.data.country_code,
                        myCountryFlag: result.data.location.country_flag_emoji,
                        myRegion: result.data.region_name,
                        myRegionCode: result.data.region_code,
                        myCity: result.data.city,
                        myLat: result.data.latitude,
                        myLng:  result.data.longitude,
                        postalCode: result.data.zip,
                        geonameID: result.data.location.geoname_id,
                        timeZone: result.data.time_zone.id + ' ' + result.data.time_zone.current_time + ' ' + result.data.time_zone.code,
                        ispName: result.data.connection.isp,
                        asn: result.data.connection.asn})
    });
}

    componentDidMount() {
          this.callAPI();
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
            mapTypeId: google.maps.MapTypeId.TERRAIN
          });
        }
  
        initMap();
      }

      
        return (
          <div>
              <div id="display">
              <h1>Show my IP address.</h1>
              <p id="public-ip">Your public IP address is <span id="ip-address" style={{fontSize: "1em"}}>{this.state.ipAddress}</span> {this.state.type}</p>
              
              <br></br>
              <p style={{marginTop: "1em", textAlign: "left"}}>{(this.state.myCity && this.state.myRegionCode && this.state.myCountryFlag) ? (`${this.state.myCity + `, ` + this.state.myRegionCode + `, ` + this.state.myCountryFlag}`) : ""}</p>
              </div>

              <div id="box-container">
                  <div id="map" className="map">
                    
                  </div>

                  <div id="info">
                  <ul>
                      <li><span style={{textDecoration: "underline"}}>City</span>: {this.state.myCity ? this.state.myCity : "N/A"}</li>
                      <li><span style={{textDecoration: "underline"}}>State</span>: {this.state.myRegion ? this.state.myRegion : "N/A"}</li>           
                      <li><span style={{textDecoration: "underline"}}>Country</span>: {this.state.myCountry ? this.state.myCountry : "N/A"}</li>        
                      <li><span style={{textDecoration: "underline"}}>Timezone</span>: {this.state.timeZone ? this.state.timeZone : "N/A"}</li>
                      <li><span style={{textDecoration: "underline"}}>Latitude</span>: {this.state.myLat ? this.state.myLat : ""}</li>          
                      <li><span style={{textDecoration: "underline"}}>Longitude</span>: {this.state.myLng ? this.state.myLng : ""}</li>            
                      <li><span style={{textDecoration: "underline"}}>Postal Code</span>: {this.state.postalCode ? this.state.postalCode : "N/A"}</li>               
                      <li><span style={{textDecoration: "underline"}}>ISP Name</span>: {this.state.ispName ? this.state.ispName : "N/A"}</li>
                      <li><span style={{textDecoration: "underline"}}>Geoname ID</span>: {this.state.geonameID ? this.state.geonameID : "N/A"}</li>
                      <li><span style={{textDecoration: "underline"}}>ASN</span>: {this.state.asn ? this.state.asn : "N/A"}</li>
                  </ul>
                  </div>
              </div>
          </div>
        )
    }
}