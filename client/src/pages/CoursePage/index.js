import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import AddTest from "../../components/Form/AddTest";
import DeleteTest from "../../components/DeleteButton/DeleteTest";
import UpdateTest from "../../components/Form/UpdateTest";
import getTests from "../../utils/GetTests";
import * as ROUTES from "../../constants/routes";

import deleteTests from "../../utils/DeleteTests";

class CoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: []
    };
  }

  getAllTests() {
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
    this.getAllTests();
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
        <tbody key={id}>
          <tr>
            <td>{t.name}</td>
            <td>{t.num_of_questions}</td>
            <td>{t.duration}</td>

            <td>
              <Link to={`/update-test/${id}`}>Edit</Link>
            </td>
            <td>
              <DeleteTest id={t.id} handleDeleteTest={this.handleDeleteTest} />
            </td>
          </tr>
        </tbody>
      ))
    ) : (
      <p>nothing</p>
    );

    return (
      <div className="container">
        <Router>
          <div className="row">
            <div className="col">
              <h2>Course: {course.name}</h2>
              <p>Domain: {course.domain}</p>
              <p>Description: {course.description}</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <AddTest
                courseId={courseId}
                handleAddTest={this.props.handleAddTest}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Number of questions</th>
                    <th>Duration</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>

                {tests}
              </table>
            </div>
          </div>

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
