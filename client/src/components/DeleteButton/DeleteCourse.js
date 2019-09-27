import React from "react";

const DeleteCourse = ({ handleDeleteCourse, id, getAllCourses }) => {
  function onClick(id) {
    handleDeleteCourse(id)
      .then(() => getAllCourses())
      .catch(err => console.log(err));
  }

  return (
    <button className="btn btn-danger btn-sm ml-3" onClick={() => onClick(id)}>
      Delete
    </button>
  );
};

export default DeleteCourse;
