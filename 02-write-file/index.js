const fs = require('fs');
const path = require('path');
const { stdin: input, stdout: output } = require('process');
const readline = require('readline');
const rl = readline.createInterface({ input, output });

const outputFile = fs.createWriteStream(path.join(__dirname, 'text.txt'));
output.write('Please, enter smth.. or press Ctrl + c or exit to close \n');

rl.on('line', (input) => {
  if (input === 'exit'){
    rl.close()
  }
  outputFile.write(input + '\n');
});

rl.on('SIGINT', () => {
  rl.close()
});

rl.on('close', () => {
  output.write('Bye!')
})


