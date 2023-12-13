// callback
// A callback is a function that is passed as an argument to another function . It is executed after another another function finished execution

// Example of a callback function(synchronous)
function greet(name, callback) {
	console.log("Hello, " + name + "!");
	// Execute the callback function after greeting
	callback();
  }
  
  // Function to be passed as a callback
  function sayGoodbye() {
	console.log("Goodbye!");
  }
  
  // Using the greet function with a callback
  greet("John", sayGoodbye);
  

// Example of a callback function(Asynchronous)
function greet(){  
    console.log("greet after 1 second")  
}  
setTimeout(greet, 1000)  
console.log("first") 
console.log("Second")  



//// callback hell

// Callback hell, also known as "Pyramid of Doom," is a situation in JavaScript where 
// multiple nested callbacks create code that is hard to read, understand, and maintain. 

// for example : Let say we have split the word IloveProgramming into three separate words and are trying
// to animate each word after one after another

let words = document.querySelectorAll(".word");

const animateAll = (animate) => {
  setTimeout(() => {
    animate(words[0]);
    setTimeout(() => {
      animate(words[1]);
      setTimeout(() => {
        animate(words[2]);
      }, 1000);
    }, 1000);
  }, 1000);
};

const animate = (word) => {
  word.classList.add("animate");
};

animateAll(animate);
