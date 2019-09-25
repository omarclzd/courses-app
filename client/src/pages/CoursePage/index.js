import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Form from "../../components/Form";
import DeleteTest from "../../components/DeleteButton/DeleteTest";
import UpdateTest from "../../components/Form/UpdateTest";
import * as ROUTES from "../../constants/routes";

import deleteTests from "../../utils/DeleteTests";

class CoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: []
    };
  }

  updateTest() {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    };

    getTests(options).then(results =>
      this.setState({
        tests: results
      })
    );
  }

  componentDidMount() {
    this.updateTest();
  }

  filterTests = courseId => {
    return this.state.tests.map((t, id) => {
      if (courseId === t.course_id) {
        return t;
      } else {
        return false;
      }
    });
  };

  handleDeleteTest = async id => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ id })
    };
    return await deleteTests(options);
  };

  getTest = id => {
    return this.state.tests[id];
  };

  render() {
    let course = this.props.getCourse(this.props.match.params.id);

    let courseId = course.id;
    let test = this.filterTests(courseId);
    let tests = test ? (
      test.map((t, id) => (
        <div key={id}>
          <p>
            {t.name} id: {t.id}
          </p>
          <p>{t.course_id}</p>
          <DeleteTest id={t.id} handleDeleteTest={this.handleDeleteTest} />
          <Link to={`/update-test/${id}`}>Edit</Link>
        </div>
      ))
    ) : (
      <p>nothing</p>
    );

    return (
      <div className="container">
        <Router>
          <h2>Course: {course.name}</h2>
          <p>Domain: {course.domain}</p>
          <p>Description: {course.description}</p>

          <Form courseId={courseId} handleAddTest={this.props.handleAddTest} />
          <hr />

          {tests}
          <Route
            path={ROUTES.UPDATE_TEST}
            render={props => (
              <UpdateTest
                {...props}
                getTest={this.getTest}
                handleUpdateTest={this.props.handleUpdateTest}
              />
            )}
          />
        </Router>
      </div>
    );
  }
}

export default CoursePage;

async function getTests(options) {
  try {
    const fetchTests = await fetch("/api/courses/tests", options);
    const data = await fetchTests.json();
    return await data;
  } catch (error) {
    console.log(error);
  }
}
