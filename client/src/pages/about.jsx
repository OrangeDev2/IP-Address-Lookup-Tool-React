const { Component } = require("react");

class AboutPage extends Component {
    render() {
        return (
            <div style={{marginTop: "20vh"}}>
                <h3>ShowIP.io is a free service that shows your public IP Address and Geolocation with Google Maps API! <br></br>IP Address Lookup (IPv4, IPv6) is also available <a href="/ip-search">here</a>.</h3>
                <p style={{marginTop: "10vh"}}>If you have any questions. Please do not hesitate to contact the owner.</p>
                <p>Email: <a href="mailto:admin@showip.io" target="_blank" rel="noreferrer" style={{color: "grey"}}>admin@showip.io</a></p>
            </div>
        )
    }
}

export default AboutPage;
