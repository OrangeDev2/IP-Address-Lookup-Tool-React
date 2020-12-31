const { Component } = require("react");

class AboutPage extends Component {
    render() {
        return (
            <div>
                <h3>ShowIP.io is a free service that shows your IP Address and Geolocation with Dymanic Google Maps! <br></br>IP Address Lookup (IPv4, IPv6) is also available <a href="/ip-search">here</a>.</h3>
                <p>If you have any questions. Please do not hesitate to contact the owner.</p>
                <p>Email: <a href="mailto:admin@showip.io" target="_blank" rel="noreferrer" style={{color: "grey"}}>admin@showip.io</a></p>
            </div>
        )
    }
}

export default AboutPage;