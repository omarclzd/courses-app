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

    return (
      <div>
        <div className="container">
          <div className="card">
            <h3 className="card-header">Update Form for {course.name} </h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder={course.name}
                    onChange={this.handleOnChange}
                    value={this.state.name}
                  />
                </div>
                <div className="form-group">
                  <label>Domain</label>
                  <input
                    type="text"
                    name="domain"
                    placeholder={course.domain}
                    onChange={this.handleOnChange}
                    value={this.state.domain}
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <input
                    type="text"
                    name="description"
                    placeholder={course.description}
                    onChange={this.handleOnChange}
                    value={this.state.description}
                  />
                </div>
                <button onClick={this.handleUpdateSubmit}>Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Update;
