const BASE_URL = "/api/courses/";

class FetchCalls {
  constructor() {}
  async createCourse(options) {
    try {
      const sendPost = await fetch(BASE_URL + "create", options);
      const postResults = await sendPost.json();
      return await postResults;
    } catch (error) {
      console.log(error);
    }
  }

  async getCourses(options) {
    try {
      const fetchCourses = await fetch(BASE_URL + "all", options);
      const data = await fetchCourses.json();
      return await data;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCourse(options) {
    try {
      const delCourse = await fetch(BASE_URL + "deleteCourse", options);
      const data = await delCourse.json();
      return await data;
    } catch (error) {
      console.log(error);
    }
  }

  async updateCourse(options) {
    try {
      const sendPost = await fetch(BASE_URL + "updateCourse", options);
      const postResults = await sendPost.json();
      return await postResults;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCourse(options) {
    try {
      const delCourse = await fetch(BASE_URL + "deleteCourse", options);
      const data = await delCourse.json();
      return await data;
    } catch (error) {
      console.log(error);
    }
  }

  async createTest(options) {
    try {
      const sendPost = await fetch(BASE_URL + "createTest", options);
      const postResults = await sendPost.json();

      return await postResults;
    } catch (error) {
      console.log(error);
    }
  }

  async getTests(options) {
    try {
      const fetchTests = await fetch(BASE_URL + "tests", options);
      const data = await fetchTests.json();
      return await data;
    } catch (error) {
      console.log(error);
    }
  }
  async updateTest(options) {
    try {
      const sendPost = await fetch(BASE_URL + "updateTest", options);
      const postResults = await sendPost.json();
      return await postResults;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteTests(options) {
    try {
      const deleteTest = await fetch(BASE_URL + "deleteTest", options);
      const data = await deleteTest.json();
      return await data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new FetchCalls();
