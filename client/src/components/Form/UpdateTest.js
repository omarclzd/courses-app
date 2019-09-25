import React, { Component } from "react";

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num_of_questions: "",
      name: "",
      duration: "",
      id: this.props.getTest(this.props.match.params.id).id
    };
  }

  handleChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  handleUpdateSubmit = async e => {
    e.preventDefault();
    await this.props.handleUpdateTest(this.state);
    this.setState({
      num_of_questions: "",
      name: "",
      duration: ""
    });
  };
  render() {
    let test = this.props.getTest(this.props.match.params.id);
    let id = test.id;
    return (
      <div>
        <h1>Update Test for {id} </h1>
        <form>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder={test.name}
            value={this.state.name}
            onChange={this.handleChange}
          />
          <label>Number of Questions</label>
          <input
            type="number"
            name="num_of_questions"
            placeholder={test.num_of_questions}
            value={this.state.num_of_questions}
            onChange={this.handleChange}
          />
          <label>Duration</label>
          <input
            type="text"
            name="duration"
            placeholder={test.duration}
            value={this.state.duration}
            onChange={this.handleChange}
          />
          <button onClick={this.handleUpdateSubmit}>Add Test</button>
        </form>
      </div>
    );
  }
}

export default Update;
