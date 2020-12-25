import $ from 'jquery';
const { Component } = require("react");

class WhoisPage extends Component {
    componentDidMount(){
        $("#whois-search-input").on('keypress',function(e) {
            if(e.which == 13) {
                $("#whois-search-btn").trigger("click");
            }
        });

        $("#whois-search-btn").on("click", function(){
            //
        });
    }

    render(){
        return (
            <div>
            <div id="display">
                <p id="whois-search-error"></p><span id="invalid-whois-close-btn"></span>
                <h1>WHOIS</h1>
                <p style={{fontSize: ".8em", marginRight: "1em"}}>Search by Domain name, whoisv4 address, whoisv6 address, email address:</p>

                    <input placeholder="www.google.com" required
                    id="whois-search-input" className="search-input"
                    ></input>
                    <button className="search-button-style" id="whois-search-btn" type="submit">WHOIS Lookup</button>
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
                <li id="whois-entered-value"></li>
            </ul>
            </div>
        </div>
        </div>
        )
    }
}

export default WhoisPage;