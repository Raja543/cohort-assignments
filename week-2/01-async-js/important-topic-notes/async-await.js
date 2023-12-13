// Async/await
// async/await is a syntactic sugar in JavaScript that simplifies working with
// asynchronous code. It makes asynchronous operations look and behave more like
// synchronous ones, making the code easier to read and write. async/await is
// built on top of Promises and is supported in modern JavaScript environments.

// An async function declaration creates an AsyncFunction object. Each time when
// an async function is called, it returns a new Promise which will be resolved
// with the value returned by the async function, or rejected with an exception
// uncaught within the async function.

// Example 1
function resolveAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("resolved");
    }, 2000);
  });
}

async function asyncCall() {
  console.log("calling");
  const result = await resolveAfter2Seconds();
  console.log(result);
}

asyncCall();

// Example 2
async function fetchData() {
  try {
    // Making an API request using Fetch
    const response = await fetch(
      "https://my-json-server.typicode.com/typicode/demo"
    );

    // Checking if the request was successful (status code 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parsing the response as JSON
    const data = await response.json();

    // Logging the fetched data
    console.log("Fetched Data:", data);
  } catch (error) {
    // Handling errors
    console.error("Error fetching data:", error.message);
  }
}

// Calling the async function
fetchData();
