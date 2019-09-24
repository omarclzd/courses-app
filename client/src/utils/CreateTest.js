const BASE_URL = "/api/courses/";

async function createTest(options) {
  try {
    const sendPost = await fetch(BASE_URL + "createTest", options);
    const postResults = await sendPost.json();
    return await postResults;
  } catch (error) {
    console.log(error);
  }
}

export default createTest;
