import React, { Component } from 'react';
import $ from 'jquery';

export class HomePage extends Component {
    componentDidMount() {
      //let ipAddressValue;

      const api_key = `${process.env.REACT_APP_GEOLOCATION_API_KEY}`;


        $.getJSON(`https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=${api_key}&ipAddress`
      , function(data){
        console.log(`API JSON Request Data ->`,data);
        /*$("#ipv4").click(function(){
          //$("#ip-address").html(`${}`);
          $("#ipv4").css("color", "white");
          $("#ipv6").css("color", "blue");
        });
  
        $("#ipv6").click(function(){
          $("#ip-address").html(`${data.ip}`);
          $("#ipv4").css("color", "blue");
          $("#ipv6").css("color", "white");
        })*/
  
        //$("#ip-address").val(`${data.ip}`).attr('placeholder', `${data.ip}`);
        $("#ip-address").html(`${data.ip}`);

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

        /*$("#searchip-button").on("click", function(){ // Just take the input value to ip-lookup page while redirecting there.
          ipAddressValue = $("#ip-address").val();
          window.location.href = "/ip-search";
        });*/

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


// <input id="ip-address" placeholder="0.0.0.0" required></input><button className="search-button-style" id="searchip-button">IP Search</button>
    render(){
        return (
    <div>
        <div id="display">
        <h1>Hey. What's my IP address?</h1>
        <p id="public-ip">Your public IP address is </p><span id="ip-address"></span>

        
        <br></br>
        <p id="address"></p>
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
            </ul>
            </div>
        </div>
    </div>
        )
    }
}

//export default HomePage;
//export {ipAddressValue};