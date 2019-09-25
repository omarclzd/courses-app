import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import CoursePage from "./pages/CoursePage";
import UpdateCourse from "./components/Form/Update";
import * as ROUTES from "./constants/routes";

import createCourse from "./utils/CreateCourse";
import updateCourse from "./utils/UpdateCourse";
import createTest from "./utils/CreateTest";
import DeleteCourse from "./components/DeleteButton/DeleteCourse";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      name: "",
      domain: "",
      description: ""
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

  async handleDeleteCourse(id) {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ id })
    };
    return await deleteCourse(options);
  }

  async handleAddCourse({ name, domain, description }) {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, domain, description })
    };
    return await createCourse(options);
  }

  async handleUpdateCourse({ name, domain, description, id }) {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, domain, description, id })
    };
    return await updateCourse(options);
  }

  async handleAddTest({ name, num_of_questions, course_id, duration }) {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, course_id, num_of_questions, duration })
    };
    return await createTest(options);
  }

  handleOnChange(e) {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    await this.handleAddCourse(this.state);
    this.setState({
      name: "",
      domain: "",
      description: ""
    });
  }

  getCourse = id => {
    return this.state.courses[id];
  };

  render() {
    return (
      <div className="App">
        <Router>
          <h1>App</h1>
          {this.state.courses.map((c, id) => (
            <div key={c.id}>
              <Link to={`/course/${id}`}>
                <p>{c.name}</p>
              </Link>
              <DeleteCourse
                id={c.id}
                handleDeleteCourse={this.handleDeleteCourse}
              />
              <Link to={`/update-course/${id}`}>Edit</Link>
            </div>
          ))}
          <button onClick={() => console.log(this.state)}>State</button>
          <form>
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={this.handleOnChange}
              value={this.state.name}
            />
            <label>Domain</label>
            <input
              type="text"
              name="domain"
              onChange={this.handleOnChange}
              value={this.state.domain}
            />
            <label>Description</label>
            <input
              type="text"
              name="description"
              onChange={this.handleOnChange}
              value={this.state.description}
            />
            <button onClick={this.handleSubmit}>Add</button>
          </form>
          <hr />
          <Route
            path={ROUTES.COURSE}
            render={props => (
              <CoursePage
                {...props}
                getCourse={this.getCourse}
                handleAddTest={this.handleAddTest}
              />
            )}
          />

          <hr />
          <Route
            path={ROUTES.UPDATE_COURSE}
            render={props => (
              <UpdateCourse
                {...props}
                getCourse={this.getCourse}
                handleUpdateCourse={this.handleUpdateCourse}
              />
            )}
          />
        </Router>
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

async function deleteCourse(options) {
  try {
    const delCourse = await fetch("/api/courses/deleteCourse", options);
    const data = await delCourse.json();
    return await data;
  } catch (error) {
    console.log(error);
  }
}
