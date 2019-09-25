const express = require("express");
const router = express.Router();
const coursesCtrl = require("../../controllers/courses");

/*---------- Public Routes ----------*/
router.post("/create", coursesCtrl.createCourse);
router.get("/all", coursesCtrl.getAllCourses);
router.post("/deleteCourse", coursesCtrl.delCourse);
router.post("/updateCourse", coursesCtrl.updateCourse);

router.post("/createTest", coursesCtrl.createTest);
router.post("/tests", coursesCtrl.getTests);
router.post("/deleteTest", coursesCtrl.delTest);
router.post("/updateTest", coursesCtrl.updateTest);

module.exports = router;
