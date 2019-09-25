import React, { Component } from "react";
import Form from "../components/Form";

class CoursePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tests: []
    };
  }

  componentDidMount() {
    const options = {
      method: "GET",
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

  filterTests = courseId => {
    return this.state.tests.map((t, id) => {
      if (courseId === t.course_id) {
        return t;
      } else {
        return false;
      }
    });
  };

  handleDelete = e => {
    console.log(e.currentTarget.id);
  };

  render() {
    let course = this.props.getCourse(this.props.match.params.id);

    let courseId = course.id;
    let test = this.filterTests(courseId);
    let tests = test ? (
      test.map((t, id) => (
        <div key={id}>
          <p>{t.name}</p>
          <p>{t.course_id}</p>
          <button onClick={this.handleDelete} id={t.id}>
            X
          </button>
        </div>
      ))
    ) : (
      <p>nothing</p>
    );

    return (
      <div>
        <h1>Course Page</h1>
        <h2>
          Course: {course.name}
          <br />
          Course Id: {course.id}
        </h2>
        <Form courseId={courseId} handleAddTest={this.props.handleAddTest} />
        <hr />

        {tests}
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
