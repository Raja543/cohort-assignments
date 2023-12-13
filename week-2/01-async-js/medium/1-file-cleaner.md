## File cleaner
Read a file, remove all the extra spaces and write it back to the same file.

For example, if the file input was
```
hello     world    my    name   is       raman
```

After the program runs, the output should be

```
hello world my name is raman
```

<script>
const fs = require('fs');

function cleanFile(filePath) {
  // Read the content of the file
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // Remove extra spaces using a regular expression
  const cleanedContent = fileContent.replace(/\s+/g, ' ');

  // Write the cleaned content back to the same file
  fs.writeFileSync(filePath, cleanedContent, 'utf-8');

  console.log('File cleaned successfully!');
}

cleanFile('your-file.txt');

<script>