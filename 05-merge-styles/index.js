const path = require('path');
const fs = require('fs');

const stylesDir = path.resolve(__dirname, 'styles');
const output = fs.createWriteStream(path.resolve(__dirname, 'project-dist', 'bundle.css'));

try {
  const filesDir = fs.promises.readdir(stylesDir);
  filesDir.then((files) => {
    for (const file of files) {
      if (path.extname(file) !== '.css') continue;
      const input = fs.createReadStream(path.resolve(stylesDir, file), 'utf-8');
      input.pipe(output);
    }
  });
  console.log('bundle.css created');
} catch (err) {
  console.log(err);
}