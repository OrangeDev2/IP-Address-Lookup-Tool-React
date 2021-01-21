const { Component } = require("react");

class AboutPage extends Component {
    render() {
        return (
            <div style={{marginTop: "20vh"}}>
                <h3>ShowIP.io is a free service that shows your public IP Address and Geolocation with Google Maps API! <br></br>IP Address Lookup (IPv4, IPv6) is also available <a href="/ip-search">here</a>.</h3>
                <a href="https://nordvpn.com/special/?utm_medium=affiliate&utm_term&utm_content&utm_campaign=off15&utm_source=aff50645" target="_blank" rel="noreferrer">
                    <img src="./../nordvpn-assests/changeIP.jpg" style={{height: "50vh"}}></img>
                        </a>
                <p>If you have any questions. Please do not hesitate to contact the owner.</p>
                <p>Email: <a href="mailto:admin@showip.io" target="_blank" rel="noreferrer" style={{color: "grey"}}>admin@showip.io</a></p>
            </div>
        )
    }
}

export default AboutPage;
