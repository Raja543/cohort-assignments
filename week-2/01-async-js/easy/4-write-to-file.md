## Write to a file

Using the fs library again, try to write to the contents of a file.
You can use the fs library to as a black box, the goal is to understand async tasks.

<script>
    const fs = require('fs');

function appendToFile(filePath, textToAppend) {
  // Read the content of the file asynchronously
  fs.readFile(filePath, 'utf-8', (readErr, fileContent) => {
    if (readErr) {
      console.error('Error reading the file:', readErr);
      return;
    }

    // Append text to the existing content
    const modifiedContent = fileContent + '\n' + textToAppend;

    // Write the modified content back to the file asynchronously
    fs.writeFile(filePath, modifiedContent, 'utf-8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing to the file:', writeErr);
        return;
      }

      console.log('Content appended and written to the file successfully.');
    });
  });
}

// Replace 'your-file.txt' with the actual file path you want to modify
appendToFile('your-file.txt', 'This is the new text to append.');

<script>
