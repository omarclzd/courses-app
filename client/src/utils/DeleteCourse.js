async function deleteCourse(options) {
  try {
    const delCourse = await fetch("/api/courses/deleteCourse", options);
    const data = await delCourse.json();
    return await data;
  } catch (error) {
    console.log(error);
  }
}

export default deleteCourse;
