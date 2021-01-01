import errorImg from './../pictures/showip-loaga.png';
const { Component } = require("react");


class ErrorPage extends Component {
    render() {
        return (
            <div>
                <h1>404 page not found :(</h1>
                <img src={errorImg} style={{width: "20vw", height: "auto"}}></img>
                <p>We are sorry but the page you are looking for does not exist.</p>
                <p>Please return to <a href="/">homepage</a>.</p>
            </div>
        )
    }
}

export default ErrorPage;
