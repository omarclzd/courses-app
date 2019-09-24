import React, { Component } from "react";
import createCourse from "./utils/CreateCourse";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      name: ""
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  callServer() {
    fetch("http://localhost:3001/api/courses/all")
      .then(res => res.text())
      .then(res => this.setState({ serverRes: res }));
  }

  componentWillMount() {
    this.callServer();
  }

  async handleAddCourse(name) {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name })
    };
    return await createCourse(options);
  }

  handleOnChange(e) {
    this.setState({
      name: e.currentTarget.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    await this.handleAddCourse(this.state.name);
    this.setState({
      name: ""
    });
  }

  render() {
    return (
      <div className="App">
        <h1>App</h1>
        <h2>{this.state.serverRes}</h2>
        <form>
          <input
            type="text"
            name="name"
            onChange={this.handleOnChange}
            value={this.state.name}
          />
          <button onClick={this.handleSubmit}>Add</button>
        </form>
      </div>
    );
  }
}

export default App;
