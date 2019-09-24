//Require models

const Course = require("../src/models/course");
const Test = require("../src/models/test");

// //Create Relations
// Course.hasMany(Test, { as: "Tests", foreignKey: "course_id" });
// Test.belogsTo(Course, { as: "Course", foreignKey: "course_id" });

module.exports = {
  getAllCourses,
  createCourse
};

function getAllCourses(req, res) {
  Course.findAll()
    .then(courses => {
      console.log(courses);
      res.sendStatus(200);
    })
    .catch(err => console.log(err));
}

function createCourse(req, res) {
  console.log(req.body);
  let name = req.body.name;
  console.log(name);
}
