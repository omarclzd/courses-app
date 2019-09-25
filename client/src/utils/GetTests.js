async function getTests(options) {
  try {
    const fetchTests = await fetch("/api/courses/tests", options);
    const data = await fetchTests.json();
    return await data;
  } catch (error) {
    console.log(error);
  }
}

export default getTests;
