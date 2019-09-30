const models = require("../models");

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
  models.Test.findOne({
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
    .then(test => res.status(201).json(test))
    .catch(err => console.log(err));
}

function updateCourse(req, res) {
  console.log(req.body);
  let name = req.body.name;
  let domain = req.body.domain;
  let description = req.body.description;
  let id = req.body.id;
  models.Course.findOne({
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

    .then(course => {
      res.status(200).json(course);
    })
    .catch(err => console.log(err));
}

function delCourse(req, res) {
  console.log(req.body);
  let id = req.body.id;
  models.Course.destroy({
    where: { id: id }
  })
    .then(course => {
      res.status(201).json(course);
    })
    .then(() => {
      models.Test.destroy({
        where: { CourseId: id }
      });
    })

    .catch(err => console.log(err));
}

function delTest(req, res) {
  console.log(req.body);
  let id = req.body.id;
  models.Test.destroy({
    where: { id }
  })
    .then(test => res.status(201).json(test))
    .catch(err => console.log(err));
}

function getTests(req, res) {
  let CourseId = req.body.courseId;
  models.Test.findAll({
    where: { CourseId }
  })
    .then(tests => {
      res.status(201).json(tests);
    })
    .catch(err => console.log(err));
}

function createTest(req, res) {
  let name = req.body.name;
  let CourseId = req.body.course_id;
  let duration = req.body.duration;
  let num_of_questions = req.body.num_of_questions;

  models.Test.create({
    CourseId,
    num_of_questions,
    name,
    duration
  })
    .then(test => res.status(201).json(test))
    .catch(err => console.log(err));
}

function getAllCourses(req, res) {
  models.Course.findAll()
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
  models.Course.create({
    name,
    domain,
    description
  })
    .then(course => res.status(201).json(course))
    .catch(err => console.log(err));
}
