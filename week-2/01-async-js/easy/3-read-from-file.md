## Reading the contents of a file

Write code to read contents of a file and print it to the console. 
You can use the fs library to as a black box, the goal is to understand async tasks. 
Try to do an expensive operation below the file read and see how it affects the output. 
Make the expensive operation more and more expensive and see how it affects the output. 

<script>
    const fs = require('fs');

function readAndPrintFile(filePath) {
  // Read the content of the file asynchronously
  fs.readFile(filePath, 'utf-8', (err, fileContent) => {
    if (err) {
      console.error('Error reading the file:', err);
      return;
    }

    // Print the content to the console
    console.log('File Content:', fileContent);

    // Perform an increasingly expensive operation
    performExpensiveOperation();

    console.log('Operation completed.');
  });
}

function performExpensiveOperation() {
  // Simulate an expensive operation (e.g., a loop)
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
    sum += i;
  }

  console.log('Expensive operation completed.');
}

// Replace 'your-file.txt' with the actual file path you want to read
readAndPrintFile('your-file.txt');
<script>