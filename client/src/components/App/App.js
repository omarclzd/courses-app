import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import CoursePage from "../../pages/CoursePage";
import Home from "../../pages/Home";
import DeleteConfirm from "../../pages/DeleteConfirm";
import Navigation from "../Navigation";
import CreateCourse from "../Form/CreateCourse";

import UpdateCourse from "../Form/Update";
import UpdateTest from "../Form/UpdateTest";
import * as ROUTES from "../../constants/routes";

import FetchCalls from "../../utils/Fetchcalls";
import Landing from "../../pages/Landing";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      tests: [],
      name: "",
      domain: "",
      description: ""
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAllTests = this.getAllTests.bind(this);
  }

  getAllCourses() {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    };

    FetchCalls.getCourses(options).then(results =>
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
    await FetchCalls.deleteCourse(options);
  }

  async handleAddCourse({ name, domain, description }) {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, domain, description })
    };
    await FetchCalls.createCourse(options).then(() => this.getAllCourses());
  }

  async handleUpdateCourse({ name, domain, description, id }) {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, domain, description, id })
    };
    return await FetchCalls.updateCourse(options);
  }

  getAllTests(courseId) {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ courseId })
    };
    FetchCalls.getTests(options).then(results =>
      this.setState({
        tests: results
      })
    );
  }

  async handleAddTest({ name, num_of_questions, course_id, duration }) {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, course_id, num_of_questions, duration })
    };
    return await FetchCalls.createTest(options);
  }

  async handleUpdateTest({ name, num_of_questions, duration, id }) {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ name, num_of_questions, duration, id })
    };
    return await FetchCalls.updateTest(options);
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

  getTest = id => {
    return this.state.tests[id];
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
                getAllCourses={this.getAllCourses}
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
                state={this.state}
                getAllTests={this.getAllTests}
                getTest={this.getTest}
              />
            )}
          />
          <Route
            path={ROUTES.DELCONFIRM}
            render={props => (
              <DeleteConfirm
                {...props}
                getCourse={this.getCourse}
                state={this.state}
                getAllTests={this.getAllTests}
                getTest={this.getTest}
                handleDeleteCourse={this.handleDeleteCourse}
                getAllCourses={this.getAllCourses}
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
                getAllCourses={this.getAllCourses}
              />
            )}
          />
          <Route
            path={ROUTES.UPDATE_TEST}
            render={props => (
              <UpdateTest
                {...props}
                getTest={this.getTest}
                handleUpdateTest={this.handleUpdateTest}
              />
            )}
          />
        </Router>
      </div>
    );
  }
}

export default App;
