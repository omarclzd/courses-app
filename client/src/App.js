import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { serverRes: "" };
  }

  callServer() {
    fetch("http://localhost:3001/users")
      .then(res => res.text())
      .then(res => this.setState({ serverRes: res }));
  }

  componentWillMount() {
    this.callServer();
  }

  render() {
    return (
      <div className="App">
        <h1>App</h1>
        <h2>{this.state.serverRes}</h2>
      </div>
    );
  }
}

export default App;
