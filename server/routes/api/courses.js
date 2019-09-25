const express = require("express");
const router = express.Router();
const coursesCtrl = require("../../controllers/courses");

/*---------- Public Routes ----------*/
router.post("/create", coursesCtrl.createCourse);
router.get("/all", coursesCtrl.getAllCourses);

router.post("/createTest", coursesCtrl.createTest);
router.get("/tests", coursesCtrl.getTests);

module.exports = router;