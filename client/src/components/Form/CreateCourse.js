import React from "react";
import getCourses from "../../utils/GetCourses";

const CreateCourse = props => {
  return (
    <div className="container">
      <div className="card">
        <h3 className="card-header">Add New Course</h3>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                onChange={props.handleOnChange}
                value={props.state.name}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Domain</label>
              <input
                type="text"
                name="domain"
                onChange={props.handleOnChange}
                value={props.state.domain}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                onChange={props.handleOnChange}
                value={props.state.description}
                className="form-control"
              />
            </div>
            <button onClick={props.handleSubmit} className="btn btn-primary">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
