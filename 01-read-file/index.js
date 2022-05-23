const fs = require('fs');
const path = require('path').join(__dirname, 'text.txt');

const readableStream = fs.createReadStream(path).on( 'data', chunk => process.stdout.write(chunk));

