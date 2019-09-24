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

  componentDidMount() {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json"
      }
    };

    getCourses(options).then(results =>
      this.setState({
        courses: results
      })
    );
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
        {this.state.courses.map((c, idx) => (
          <div key={idx}>
            <p>{c.name}</p>
          </div>
        ))}
        <button onClick={() => console.log(this.state)}>State</button>
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

async function getCourses(options) {
  try {
    const fetchCourses = await fetch("/api/courses/all", options);
    const data = await fetchCourses.json();
    return await data;
  } catch (error) {
    console.log(error);
  }
}
