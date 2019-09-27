import React from "react";

const DeleteCourse = ({ handleDeleteCourse, id }) => {
  return (
    <button
      className="btn btn-danger btn-sm ml-3"
      onClick={() => handleDeleteCourse(id)}
    >
      Delete
    </button>
  );
};

export default DeleteCourse;
