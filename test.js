const fs = require('fs');

// Function to read a file and normalize its whitespace
function readAndNormalize(file) {
    // Read file, then replace all whitespace sequences with a single space and trim
    return fs.readFileSync(file, 'utf8').replace(/\s+/g, ' ').trim();
}

// Read and normalize both HTML files
const originalHtml = readAndNormalize('index.html');
const newHtml = readAndNormalize('new_index.html');

// Compare the normalized content
if (originalHtml === newHtml) {
    console.log('✅ Success: The original and generated HTML files are identical.');
} else {
    console.error('❌ Error: The HTML files do not match.');
    // Optional: Write the differences to a file for easier debugging
    fs.writeFileSync('diff.txt', `--- Original\n+++ Generated\n${newHtml.split('').map((char, i) => char === originalHtml[i] ? char : `^${char}`).join('')}`);
    console.log('A diff.txt file has been created with the differences.');
}