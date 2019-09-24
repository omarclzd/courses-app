import React from "react";

const CoursePage = props => {
  let course = props.getCourse(props.match.params.id);

  return (
    <div>
      <h1>Course Page</h1>
      <h2>Course: {course.name}</h2>
    </div>
  );
};

export default CoursePage;
