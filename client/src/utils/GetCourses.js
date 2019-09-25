async function getCourses(options) {
  try {
    const fetchCourses = await fetch("/api/courses/all", options);
    const data = await fetchCourses.json();
    return await data;
  } catch (error) {
    console.log(error);
  }
}

export default getCourses;
