import React from "react";

const DeleteTest = ({ handleDeleteTest, id }) => {
  return (
    <button
      className="btn btn-danger btn-sm"
      onClick={() => handleDeleteTest(id)}
    >
      X
    </button>
  );
};

export default DeleteTest;
