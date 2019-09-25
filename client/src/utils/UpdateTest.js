const BASE_URL = "/api/courses/";

async function updateTest(options) {
  try {
    const sendPost = await fetch(BASE_URL + "updateTest", options);
    const postResults = await sendPost.json();
    return await postResults;
  } catch (error) {
    console.log(error);
  }
}

export default updateTest;
