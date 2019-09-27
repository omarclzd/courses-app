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
  }

  componentDidMount() {
    let courseId = this.props.getCourse(this.props.match.params.id).id;

    this.props.getAllTests(courseId);
  }

  handleDeleteTest = async id => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ id })
    };
    await deleteTests(options); //Trying to update the test array after deleting
  };

  render() {
    // this is to match the index of course from the getCourse function
    let course = this.props.getCourse(this.props.match.params.id);
    let courseId = course.id;
    let tests = this.props.state.tests.map((t, id) => (
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
    ));

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
        </Router>
      </div>
    );
  }
}

export default CoursePage;
