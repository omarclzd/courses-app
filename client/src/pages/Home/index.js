import React from "react";
import { Link } from "react-router-dom";
import DeleteCourse from "../../components/DeleteButton/DeleteCourse";

const Home = props => {
  return (
    <div className="container">
      <h1>Courses</h1>
      {props.state.courses.map((c, id) => (
        <div key={c.id} className="card m-1">
          <h5 className="card-header">{c.name}</h5>
          <div className="card-body">
            <p className="card-text">Domain: {c.domain}</p>
            <p className="card-text">Description: {c.description}</p>

            <Link to={`/course/${id}`} className="card-link">
              details
            </Link>
            <Link to={`/update-course/${id}`} className="card-link">
              Edit
            </Link>
            <DeleteCourse
              id={c.id}
              handleDeleteCourse={props.handleDeleteCourse}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
