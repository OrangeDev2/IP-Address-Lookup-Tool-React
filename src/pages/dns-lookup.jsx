import $ from 'jquery';
const { Component } = require("react");

class DnsLookupPage extends Component {
    componentDidMount(){
        $("#dns-search-input").on('keypress',function(e) {
            if(e.which == 13) {
                $("#dns-search-btn").trigger("click");
            }
        });

        $("#dns-search-btn").on("click", function(){
            //
        });
    }

    render(){
        return (
            <div>
            <div id="display">
                <p id="dns-search-error"></p><span id="invalid-dns-close-btn"></span>
                <h1>DNS Lookup</h1>
                <p style={{fontSize: ".8em", marginRight: "1em"}}>Search by Domain name:</p>

                    <input placeholder="www.google.com" required
                    id="dns-search-input" className="search-input"
                    ></input>

                <p style={{fontSize: ".8em", marginRight: "1em"}}>Record Type:</p>

                <input value="A" placeholder="A, SOA, TXT, MX" required
                id="dns-search-input"
                ></input>
                    <button className="search-button-style" id="dns-search-btn" type="submit">DNS Lookup</button>
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
                <li id="dns-entered-value"></li>
            </ul>
            </div>
        </div>
        </div>
        )
    }
}

export default DnsLookupPage;