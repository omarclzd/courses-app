import React from "react";

const DeleteCourse = ({ handleDeleteCourse, id }) => {
  return (
    <button className="btn" onClick={() => handleDeleteCourse(id)}>
      Delete
    </button>
  );
};

export default DeleteCourse;
