import React, { Component } from "react";

class AddTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_id: this.props.courseId,
      num_of_questions: "",
      name: "",
      duration: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    let courseId = this.props.courseId;
    await this.props.handleAddTest(this.state);
    this.props.getAllTests(courseId);
    this.setState({
      name: "",
      duration: "",
      num_of_questions: ""
    });
  };

  render() {
    return (
      <div>
        <h1>Add Test</h1>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Number of Questions</label>
            <input
              type="number"
              name="num_of_questions"
              value={this.state.num_of_questions}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Duration</label>
            <input
              type="text"
              name="duration"
              value={this.state.duration}
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
          <button onClick={this.handleSubmit}>Add Test</button>
        </form>
      </div>
    );
  }
}

export default AddTest;
