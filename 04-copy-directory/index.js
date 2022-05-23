const path = require('path');
const fs = require('fs');


function copyDir(){
  fs.mkdir((path.join(__dirname, 'files-copy')), {recursive: true}, err => {if (err) throw err;})

  fs.readdir((path.join(__dirname, 'files-copy')), {withFileTypes: true}, (err, files) => {
    if (err) console.log(err);
    files.forEach(elem => {
      fs.unlink(path.join(__dirname, 'files-copy', elem.name), err => {
        if (err) throw err;
      });
    })
  });

  fs.readdir((path.join(__dirname, 'files')), {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    files.forEach(elem => {
      fs.copyFile( path.join(__dirname, 'files', elem.name), path.join(__dirname, 'files-copy', elem.name), err => {
        if (err) console.log(err);
      })
    });
  });
}; 

copyDir();
