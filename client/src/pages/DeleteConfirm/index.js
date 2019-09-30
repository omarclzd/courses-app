import React from "react";
import DeleteCourse from "../../components/DeleteButton/DeleteCourse";

const DeleteConfirm = props => {
  let course = props.getCourse(props.match.params.id);
  return (
    <div className="container">
      <h1>Delete Confirm </h1>
      <h3>Are you sure you want to delete course {course.name} ?</h3>
      <p>Domain: {course.domain}</p>
      <p>Description: {course.description}</p>
      <div className="card">
        <div className="card-body">
          Warning: All Test associated with this course will also be deleted
          permenantly!
        </div>
      </div>
      <DeleteCourse
        id={course.id}
        handleDeleteCourse={props.handleDeleteCourse}
        getAllCourses={props.getAllCourses}
      />
    </div>
  );
};

export default DeleteConfirm;
