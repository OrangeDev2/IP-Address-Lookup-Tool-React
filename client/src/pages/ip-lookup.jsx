import axios from 'axios';
const { Component } = require("react");

export class IPLookUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = { submitted: false, invalidInput: "", invalidInputColor: "", type: "", myCountryCode: "", myCountryFlag: "", myRegionCode: "", geonameID: "", asn: "", ipAddressDisplay:"" , ipAddress: "", myCountry: "", myRegion: "", myCity: "", myLat: "", myLng: "", postalCode: "", timeZone: "", ispName: "", connectionType: "" };
  }

    async callAPI(ipAddressParam) {
      axios.get(`/geolocation/${ipAddressParam}`)
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

    mySubmitHandler = (event) => {
        event.preventDefault();

        let inputValue = event.target.children[0].value;

        if (inputValue === this.state.ipAddress){
          this.setState({invalidInput: `You already entered "${inputValue}". Try again.`, invalidInputColor: "red"});
          this.setState({submitted: false, myLat: "", myLng: ""});
          event.target.reset();
        }

        else if (inputValue.match(/^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)(?:\:(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/) || inputValue.match(/^(?:^|(?<=\s))(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))(?=\s|$)/)){
          let ipAddressValue = inputValue;
          this.callAPI(ipAddressValue);
          this.setState({submitted: true});
          this.setState({invalidInput: `You entered "${inputValue}"`, invalidInputColor: "#D6DFE5"});
          event.target.reset();
        }
        else {
          this.setState({invalidInput: `Invalid IP - "${inputValue}". Try again.`, invalidInputColor: "red"});
          this.setState({submitted: false, myLat: "", myLng: ""});
          event.target.reset();
        }
    }

    /*myChangeHandler = (event) => {
      this.setState({ipAddressDisplay: event.target.value, invalidInputColor: "#D6DFE5"});

      //onChange={this.myChangeHandler} -> Add this to input element if uncommented.
    }*/

    renderIpInfo(){
      return  (
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
              <li><span style={{textDecoration: "underline"}}>IP Address entered</span>: {this.state.ipAddress ? this.state.ipAddress : ""}</li>
            </ul>
          </div>
        </div>
      )
    }

    render(){
      if (this.state.myLat && this.state.myLng){
        let myLatitude = this.state.myLat;
        let myLongitude = this.state.myLng;

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
            <div id="display" style={{textAlign: "left"}}>

                <h1>IP Search</h1>
        <p style={{fontSize: ".8em", marginRight: "1em", height: "100%"}}>IP Address Lookup: <span style={{color: this.state.invalidInputColor}}>{this.state.invalidInput}</span></p>

                    <form onSubmit={this.mySubmitHandler}>
                      <input type="text" placeholder="8.8.8.8" className="search-input"
                      required minLength="7" id="inputElement"></input>
                      <button className="search-button-style" type="submit">IP Lookup</button>
                    </form>
            </div>

            {this.state.submitted && this.renderIpInfo()}

        </div>
        )
    }
}

export default IPLookUpPage;