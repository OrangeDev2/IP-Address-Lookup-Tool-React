import axios from 'axios';
const { Component } = require("react");

export class IPLookUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = { submitted: false, invalidInput: "", invalidInputColor: "", ipAddressDisplay:"" , ipAddress: "", myCountry: "", myRegion: "", myCity: "", myLat: "", myLng: "", postalCode: "", timeZone: "", ispName: "", connectionType: "" };
  }

    async callAPI(ipAddressParam) {
      axios.get(`http://localhost:8000/geolocation/${ipAddressParam}`)
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
          this.setState({invalidInput: "", invalidInputColor: "#D6DFE5"});
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

      // onChange={this.myChangeHandler} -> Add this to input element if uncommented.
    }*/

    renderIpInfo(){
      return  (
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
                <li>IP Address entered: {this.state.ipAddress ? this.state.ipAddress : ""}</li>
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
          });
        }
        initMap();
      }

        return (
            <div>
            <div id="display">

                <h1>IP Search</h1>
        <p style={{fontSize: ".8em", marginRight: "1em"}}>IP Address Lookup: <span style={{textDecoration: "underline", color: this.state.invalidInputColor}}>{this.state.invalidInput}</span></p>

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