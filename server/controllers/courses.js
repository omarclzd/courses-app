//Require models

const Course = require("../src/models/course");
const Test = require("../src/models/test");

// //Create Relations
// Course.hasMany(Test, { as: "Tests", foreignKey: "course_id" });
// Test.belogsTo(Course, { as: "Course", foreignKey: "course_id" });

module.exports = {
  getAllCourses,
  createCourse,
  createTest
};

// Course.hasMany(Test, { as: "Tests", foreignKey: "course_id" });
// Test.belongsTo(Course, { as: "Course", foreignKey: "course_id" });

function createTest(req, res) {
  Course.hasMany(Test, { as: "Tests", foreignKey: "course_id" });
  Test.belongsTo(Course, { as: "Course", foreignKey: "course_id" });
  let name = req.body.name;
  Test.create({
    name
  })
    .then(test => console.log(test))
    .catch(err => console.log(err));
}

function getAllCourses(req, res) {
  Course.findAll()
    .then(courses => {
      res.status(200).json(courses);
    })
    .catch(err => console.log(err));
}

function createCourse(req, res) {
  console.log(req.body);
  let name = req.body.name;
  console.log(name);
  Course.create({
    name
  })
    .then(course => res.status(201).json(course))
    .catch(err => console.log(err));
}
