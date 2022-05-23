const fs = require('fs');
const path = require('path');
const folder = path.join(__dirname, 'secret-folder');
const {stdout} = process;


fs.readdir(folder, {withFileTypes: true}, (err, filesArr) => {
  if (err) throw err;
  filesArr.forEach(file => {
     if (file.isFile() === true){
       fs.stat(path.join(folder, file.name), (err, stats) => {
       if (err) console.log(err);
       const fileName = file.name.split('.')[0];
       const ext = file.name.split('.')[1];
       stdout.write(`${fileName} - ${ext} - ${stats.size}b \n`);
     })
    }
  });
})

