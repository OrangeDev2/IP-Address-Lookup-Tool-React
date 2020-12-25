import $ from 'jquery';
const { Component } = require("react");


class IPLookUpPage extends Component {
  componentDidMount() {
    let ipAddress;

    $("#ip-search-input").on('keypress',function(e) {
      if(e.which == 13) {
          $("#ip-search-btn").trigger("click");
      }
  });

    $("#ip-search-btn").on("click", function(){
            if ($("#ip-search-input").val().match(/^(?:(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)\.){3}(?:2[0-4]\d|25[0-5]|1\d{2}|[1-9]?\d)(?:\:(?:\d|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?$/)) {
              ipAddress = $("#ip-search-input").val();
                $("#ip-search-error").html("");
                $("#invalid-ip-close-btn").html("").css("background", "none");
            
              const api_key = `${process.env.REACT_APP_GEOLOCATION_API_KEY}`;
              var geolocation_url = `https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=${api_key}&ipAddress=` + ipAddress;

              $.getJSON(geolocation_url, function(data){
                console.log(`API JSON Request Data ->`,data);
                  $("#ip-search-input").val("");
                  
                  
                  $("#ip-entered-value").html(`IP address: ${ipAddress}`);

                  if (data.location.city && data.location.region && data.location.country){
                      $("#address").html(`${data.location.city}, ${data.location.region}, ${data.location.country}`);
                    }
                    else {
                      $("#address").html(``)
                    }
            
                    if (data.location.city){
                      $("#city").html(`City: ${data.location.city}`);
                    } 
                    else {
                      $("#city").html(`City: N/A`);
                    }
            
                    if (data.location.region){
                      $("#state").html(`State: ${data.location.region}`);
                    }
                    else {
                      $("#state").html(`State: N/A`);
                    }
            
                    if (data.location.country){
                      $("#country").html(`Country: ${data.location.country}`);
                    }
                    else {
                      $("#country").html(`Country: N/A`);
                    }
            
                    $("#lat").html(`Latitude: ${data.location.lat}`);
                    $("#lng").html(`Longitude: ${data.location.lng}`);
            
                    if (data.location.postalCode) {
                      $("#postal-code").html(`Postal Code: ${data.location.postalCode}`);
                    }
                    else {
                      $("#postal-code").html(`Postal Code: N/A`);
                    }
            
                    if (data.connectionType){
                      $("#isp-name").html(`ISP: ${data.isp} (${data.connectionType})`);
                    }
                    else {
                      $("#isp-name").html(`ISP: ${data.isp}`);
                    }



                    const google = window.google;
                    let map;
      
                    function initMap() {
                      map = new google.maps.Map(document.getElementById("map"), {
                          center: { lat: data.location.lat, lng: data.location.lng },
                          zoom: 14,
                          });
                    }
                    initMap();
              });
            }
            else { // is empty
              $("#ip-search-error").html(`Invalid IP`).css({"color": "red", "padding": "5px", "border-radius": "5px", "width": "75%", "font-size": "1em"});
              $("#invalid-ip-close-btn").html("x").css({"color": "color", "padding": ".5em", "font-size": ".5em", "background-color": "grey", "border-radius": "1em"});
              $("#ip-search-error, #invalid-ip-close-btn").css({"display": "inline", "cursor": "pointer"});

              $("#ip-search-error, #invalid-ip-close-btn").on("click", function(){
                $("#ip-search-error").html("");
                $("#invalid-ip-close-btn").html("").css("background", "none");
              });
          }
        });
    }

    render(){
        return (
            <div>
            <div id="display">
                <p id="ip-search-error"></p><span id="invalid-ip-close-btn"></span>
                <h1>IP Search</h1>
                <p style={{fontSize: ".8em", marginRight: "1em"}}>IP Address Lookup:</p>

                    <input placeholder="156.33.241.5" required
                    id="ip-search-input"
                    ></input>
                    <button className="search-button-style" id="ip-search-btn" type="submit">IP Lookup</button>
            </div>

            <div id="box-container">
            <div id="map" className="map"></div>

            <div id="info">
            <ul>
                <li id="city"></li>
                <li id="state"></li>
                <li id="country"></li>
                <li id="lat"></li>
                <li id="lng"></li>
                <li id="postal-code"></li>
                <li id="isp-name"></li>
                <li id="ip-entered-value"></li>
            </ul>
            </div>
        </div>
        </div>
        )
    }
}

export default IPLookUpPage;