import React from "react";

const DeleteCourse = ({ handleDeleteCourse, id }) => {
  return (
    <button className="btn btn-danger" onClick={() => handleDeleteCourse(id)}>
      X
    </button>
  );
};

export default DeleteCourse;
