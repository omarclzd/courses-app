//Require models

const Course = require("../src/models/course");
const Test = require("../src/models/test");

// //Create Relations
// Course.hasMany(Test, { as: "Tests", foreignKey: "course_id" });
// Test.belogsTo(Course, { as: "Course", foreignKey: "course_id" });

module.exports = {
  getAllCourses,
  createCourse,
  createTest,
  getTests
};

// Course.hasMany(Test, { as: "Tests", foreignKey: "course_id" });
// Test.belongsTo(Course, { as: "Course", foreignKey: "course_id" });

function getTests(req, res) {
  Test.findAll()
    .then(tests => {
      res.status(200).json(tests);
    })
    .catch(err => console.log(err));
}

function createTest(req, res) {
  // Course.hasMany(Test, { as: "Tests", foreignKey: "course_id" });
  // Test.belongsTo(Course, { as: "Course", foreignKey: "course_id" });
  let name = req.body.name;
  let course_id = req.body.course_id;
  let duration = req.body.duration;
  let num_of_questions = req.body.num_of_questions;
  console.log(req.body);
  Test.create({
    course_id,
    num_of_questions,
    name,
    duration
  })
    .then(test => res.status(201).json(test))
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
  let name = req.body.name;
  let domain = req.body.domain;
  let description = req.body.description;

  console.log(req.body);
  Course.create({
    name,
    domain,
    description
  })
    .then(course => res.status(201).json(course))
    .catch(err => console.log(err));
}
