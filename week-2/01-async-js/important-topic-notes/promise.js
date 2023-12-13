// A Promise in JavaScript is an object that represents the eventual completion or failure
//  of an asynchronous operation and its resulting value. Promises provide a clean and
//  standardized way to work with asynchronous code, making it more manageable and readable.

// Key Concepts of Promises:
// States:
//   1 : - Pending: The initial state when the Promise is created, representing that
//  the asynchronous operation is ongoing and hasn't completed or failed yet.
//   2 : - Fulfilled: The state when the asynchronous operation is successful, and
//  the resulting value is available.
//   3 : - Rejected: The state when there's an error or failure in the asynchronous
//  operation, and an error reason is provided.

// Promises use two callbacks: resolve and reject.
// The resolve callback is used to fulfill the Promise with a successful result.
// The reject callback is used to reject the Promise with an error.

// first example
let mypromise = new Promise(function (resolve, reject) {
  const x = "helloworld";
  const y = "helloworld";
  if (x === y) {
    resolve();
  } else {
    reject();
  }
});

mypromise
  .then(function () {
    console.log("Success, You are a GEEK");
  })
  .catch(function () {
    console.log("Some error has occurred");
  });

// second example
// Simulating an asynchronous API request
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    // Simulating an API request after 2 seconds
    setTimeout(() => {
      const success = Math.random() > 0.3; // Simulating success or failure

      if (success) {
        const userData = {
          id: userId,
          username: `user${userId}`,
          email: `user${userId}@example.com`,
        };
        resolve(userData); // Resolve with the user data
      } else {
        reject(`Error: Unable to fetch data for user ${userId}`);
      }
    }, 5000); // Simulating a 2-second delay
  });
}
// Using the Promise
const userId = 1;

fetchUserData(userId)
  .then((userData) => {
    console.log("User Data:", userData);
  })
  .catch((error) => {
    console.error(error);
  });

// Third example
// Imagine this is a function that reads a file asynchronously
function readFileAsync() {
  // Creating a Promise
  return new Promise((resolve, reject) => {
    // Simulating reading a file after 2 seconds
    setTimeout(() => {
      const success = Math.random() > 0.5; // Simulating success or failure
      console.log(success);

      if (success) {
        // If successful, resolve with the file content
        resolve("File content: Hello, Promises!");
      } else {
        // If failed, reject with an error message
        reject("Error: Could not read the file.");
      }
    }, 2000); // Simulating a 2-second delay
  });
}
// Using the Promise
readFileAsync()
  .then((fileContent) => {
    console.log("Success:", fileContent);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Chaining Promises:
// Promises can be chained to handle sequences of asynchronous operations:
const firstPromise = someAsyncOperation();

firstPromise
  .then((result) => {
    console.log("First operation succeeded:", result);
    return anotherAsyncOperation(result);
  })
  .then((result) => {
    console.log("Second operation succeeded:", result);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });

//   Promise.all
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 2000, "foo");
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
