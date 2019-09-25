import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import CoursePage from "../../pages/CoursePage";
import Home from "../../pages/Home";
import Navigation from "../Navigation";
import CreateCourse from "../Form/CreateCourse";

import UpdateCourse from "../Form/Update";
import * as ROUTES from "../../constants/routes";

import createCourse from "../../utils/CreateCourse";
import updateCourse from "../../utils/UpdateCourse";
import createTest from "../../utils/CreateTest";
import updateTest from "../../utils/UpdateTest";
import getCourses from "../../utils/GetCourses";
import deleteCourse from "../../utils/DeleteCourse";
import Landing from "../../pages/Landing";

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

  getAllCourses() {
    const options = {
      method: "POST",
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

  componentDidMount() {
    this.getAllCourses();
  }

  async handleDeleteCourse(id) {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ id })
    };
    await deleteCourse(options);
  }

  async handleAddCourse({ name, domain, description }) {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, domain, description })
    };
    await createCourse(options).then(() => this.getAllCourses());
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

  async handleUpdateTest({ name, num_of_questions, duration, id }) {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, num_of_questions, duration, id })
    };
    return await updateTest(options);
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
          <Navigation />
          <Route
            path={ROUTES.HOME}
            render={props => (
              <Home
                {...props}
                state={this.state}
                handleDeleteCourse={this.handleDeleteCourse}
                handleUpdateCourse={this.handleUpdateCourse}
                handleOnChange={this.handleOnChange}
                handleSubmit={this.handleSubmit}
              />
            )}
          />
          <Route
            exact
            path={ROUTES.LANDING}
            render={({ history }) => <Landing />}
          />
          <Route
            path={ROUTES.CREATE_COURSE}
            render={props => (
              <CreateCourse
                {...props}
                state={this.state}
                handleDeleteCourse={this.handleDeleteCourse}
                handleUpdateCourse={this.handleUpdateCourse}
                handleOnChange={this.handleOnChange}
                handleSubmit={this.handleSubmit}
              />
            )}
          />
          <Route
            path={ROUTES.COURSE}
            render={props => (
              <CoursePage
                {...props}
                getCourse={this.getCourse}
                handleAddTest={this.handleAddTest}
                handleUpdateTest={this.handleUpdateTest}
                courses={this.state.courses}
              />
            )}
          />

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
