const { Component } = require("react");


class ErrorPage extends Component {
    render () {
        return (
            <div style={{textAlign: "center", fontSize: "2em"}}>
                404 Page Not Found :( <br></br>Return to <a href="/" style={{textDecoration: "none", color: "blue"}}>homepage</a>
            </div>
        )
    }
}

export default ErrorPage;