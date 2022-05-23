const path = require('path');
const fs = require('fs');

const dir = path.join(__dirname, 'styles');
let data = '';
fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', err => {if (err) throw err});

fs.readdir(dir, {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  
  files.forEach(file => {
    if (file.isFile() === true){
      if(file.name.split('.')[1] === 'css'){
        const readableStream = fs.createReadStream(path.join(dir, file.name), err => {if (err) throw err});
        readableStream.on('data', chunk => data += chunk);
        readableStream.on('end', () => fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), data, err => {if (err) throw err}));
      }
    }
  })
})