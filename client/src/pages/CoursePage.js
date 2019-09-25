import React, { Component } from "react";
import Form from "../components/Form";
import DeleteTest from "../components/DeleteButton/DeleteTest";

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

  render() {
    let course = this.props.getCourse(this.props.match.params.id);

    let courseId = course.id;
    let test = this.filterTests(courseId);
    let tests = test ? (
      test.map((t, id) => (
        <div key={id}>
          <p>{t.name}</p>
          <p>{t.course_id}</p>
          <DeleteTest id={t.id} handleDeleteTest={this.handleDeleteTest} />
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

async function deleteTests(options) {
  try {
    const deleteTest = await fetch("/api/courses/deleteTest", options);
    const data = await deleteTest.json();
    return await data;
  } catch (error) {
    console.log(error);
  }
}
