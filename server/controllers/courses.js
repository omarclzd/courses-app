//Require models

const Course = require("../src/models/course");
const Test = require("../src/models/test");

module.exports = {
  getAllCourses,
  createCourse,
  createTest,
  getTests,
  delTest,
  delCourse,
  updateCourse,
  updateTest
};

function updateTest(req, res) {
  console.log(req.body);
  let name = req.body.name;
  let id = req.body.id;
  let duration = req.body.duration;
  let num_of_questions = req.body.num_of_questions;
  Test.findOne({
    where: { id: id }
  })
    .then(test =>
      test.update(
        {
          name,
          duration,
          num_of_questions
        },
        { returning: true, where: { id: id } }
      )
    )
    .then(test => res.status(201))
    .catch(err => console.log(err));
}

function updateCourse(req, res) {
  console.log(req.body);
  let name = req.body.name;
  let domain = req.body.domain;
  let description = req.body.description;
  let id = req.body.id;
  Course.findOne({
    where: { id: id }
  })
    .then(course =>
      course.update(
        {
          name,
          domain,
          description
        },
        { returning: true, where: { id: id } }
      )
    )
    .then(course => res.status(201))
    .catch(err => console.log(err));
}

function delCourse(req, res) {
  console.log(req.body);
  let id = req.body.id;
  Course.destroy({
    where: { id: id }
  })
    .then(course =>
      Test.destroy({
        where: { course_id: id }
      })
    )
    .catch(err => console.log(err));
}

function delTest(req, res) {
  console.log(req.body);
  let id = req.body.id;
  Test.destroy({
    where: { id: id }
  })
    .then(test => res.status(201))
    .catch(err => console.log(err));
}

function getTests(req, res) {
  Test.findAll()
    .then(tests => {
      res.status(200).json(tests);
    })
    .catch(err => console.log(err));
}

function createTest(req, res) {
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
