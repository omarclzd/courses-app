import React from "react";

const DeleteTest = ({ handleDeleteTest, id, courseId, getAllTests }) => {
  function onClick(id, courseId) {
    handleDeleteTest(id);
    getAllTests(courseId);
  }

  return (
    <button
      className="btn btn-danger btn-sm"
      onClick={() => onClick(id, courseId)}
    >
      X
    </button>
  );
};

export default DeleteTest;
