import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import AddTest from "../../components/Form/AddTest";
import DeleteTest from "../../components/DeleteButton/DeleteTest";

import FetchCalls from "../../utils/Fetchcalls";

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
    await FetchCalls.deleteTests(options); //Trying to update the test array after deleting
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
            <DeleteTest
              id={t.id}
              courseId={courseId}
              handleDeleteTest={this.handleDeleteTest}
              getAllTests={this.props.getAllTests}
            />
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
                getAllTests={this.props.getAllTests}
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
