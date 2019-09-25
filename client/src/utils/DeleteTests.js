async function deleteTests(options) {
  try {
    const deleteTest = await fetch("/api/courses/deleteTest", options);
    const data = await deleteTest.json();
    return await data;
  } catch (error) {
    console.log(error);
  }
}

export default deleteTests;
