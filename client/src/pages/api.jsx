import axios from "axios";
const { Component } = require("react");


class geolocationApiPage extends Component {
    constructor(props) {
        super(props);
        this.state = { ipAddress: "", city: "", region: "" };
    }
  
      async callAPI() {
        axios.get('http://localhost:8000/geolocation')
        .then(result => {
            this.setState({ ipAddress: result.data.ip, city: result.data.location.city, region: result.data.location.region })
        });
    }

    componentDidMount(){
        this.callAPI();
    }

    render () {
        return (
            <div style={{textAlign: "center", fontSize: "2em"}}>
                <p>API Response from Express:</p>
                IP Address: {this.state.geolocationResponse}
                City: {this.state.city}
                State: {this.state.region}
            </div>
        )
    }
}

export default geolocationApiPage;