import React, { Component } from "react";

class Update extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      domain: "",
      description: "",
      id: this.props.getCourse(this.props.match.params.id).id
    };
  }

  handleOnChange = e => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    });
  };

  handleUpdateSubmit = async e => {
    e.preventDefault();
    await this.props.handleUpdateCourse(this.state);
    this.setState({
      name: "",
      domain: "",
      description: ""
    });
  };
  render() {
    let course = this.props.getCourse(this.props.match.params.id);
    let id = course.id;
    return (
      <div>
        <h1>Update Form for {id} </h1>
        <form>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder={course.name}
            onChange={this.handleOnChange}
            value={this.state.name}
          />
          <label>Domain</label>
          <input
            type="text"
            name="domain"
            placeholder={course.domain}
            onChange={this.handleOnChange}
            value={this.state.domain}
          />
          <label>Description</label>
          <input
            type="text"
            name="description"
            placeholder={course.description}
            onChange={this.handleOnChange}
            value={this.state.description}
          />
          <button onClick={this.handleUpdateSubmit}>Add</button>
        </form>
      </div>
    );
  }
}

export default Update;
