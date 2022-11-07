const fs = require('fs');
const { copyFile, rm, mkdir, readdir, readFile } = require('fs/promises');
const path = require('path');

// Project folders path
const dirStyles = path.join(__dirname, 'styles');
const dirAssets = path.join(__dirname, 'assets');
const dirAssetsFonts = path.join(dirAssets, 'fonts');
const dirAssetsImg = path.join(dirAssets, 'img');
const dirAssetsSvg = path.join(dirAssets, 'svg');

// Project-dist folders path
const dirProjectDist = path.join(__dirname, 'project-dist');
const dirAssetsProject = path.join(dirProjectDist, 'assets');
const dirAssetsProjectFonts = path.join(dirAssetsProject, 'fonts');
const dirAssetsProjectImg = path.join(dirAssetsProject, 'img');
const dirAssetsProjectSvg = path.join(dirAssetsProject, 'svg');

// HTML files path
let dirTemplate = path.join(__dirname, 'template.html');
let dirIndex = path.join(dirProjectDist, 'index.html');
let dirComponents = path.join(__dirname, 'components');

async function buildPage() {
  try {
    // Create folders
    await rm(dirProjectDist, { recursive: true, force: true });
    await mkdir(dirProjectDist, { recursive: true });
    await mkdir(dirAssetsProject, { recursive: true });
    await mkdir(dirAssetsProjectFonts, { recursive: true });
    await mkdir(dirAssetsProjectImg, { recursive: true });
    await mkdir(dirAssetsProjectSvg, { recursive: true });
    
    // Copy assets folder with files
    const fonts = await readdir(dirAssetsFonts, { withFileTypes: true });
    fonts.forEach(font => {
      if (font.isFile()) {
        copyFile(`${dirAssetsFonts}/${font.name}`, `${dirAssetsProjectFonts}/${font.name}`);
      }
    });
    const images = await readdir(dirAssetsImg, { withFileTypes: true });
    images.forEach(img => {
      if (img.isFile()) {
        copyFile(`${dirAssetsImg}/${img.name}`, `${dirAssetsProjectImg}/${img.name}`);
      }
    });
    const svgs = await readdir(dirAssetsSvg, { withFileTypes: true });
    svgs.forEach(svg => {
      if (svg.isFile()) {
        copyFile(`${dirAssetsSvg}/${svg.name}`, `${dirAssetsProjectSvg}/${svg.name}`);
      }
    });

    // Copy styles css
    const stylesPath = path.join(__dirname, 'project-dist', 'style.css');
    const writeStream = fs.createWriteStream(stylesPath);
    const styles = await readdir(dirStyles, { withFileTypes: true });
    styles.forEach(file => {
      let filePath = path.join(dirStyles, file.name);
      if (file.isFile() && path.extname(filePath).slice(1) === 'css' && file.name !== 'footer.css') {
        const readStream = fs.createReadStream(filePath, 'utf-8');
        readStream.on('data', (chunk) => {
          writeStream.write(`${chunk}`);
        });
        readStream.on('error', error => console.log('Error', error.message));
      }
    });
    styles.forEach(file => {
      let filePath = path.join(dirStyles, file.name);
      if (file.isFile() && path.extname(filePath).slice(1) === 'css' && file.name === 'footer.css') {
        const readStream = fs.createReadStream(filePath, 'utf-8');
        readStream.on('data', (chunk) => {
          writeStream.write(`${chunk}`);
        });
        readStream.on('error', error => console.log('Error', error.message));
      }
    });

    // Copy HTML files
    let html = await readFile(dirTemplate, 'utf-8', { withFileTypes: true });
    const templates = html.match(/{{\w*}}/g).map(item => item.replace(/[{}]/g, ''));
    for (let template of templates) {
      const filePath = path.join(dirComponents, `${template}.html`);
      const htmlTemplate = await readFile(filePath, 'utf-8');
      const htmlRegExp = new RegExp(`{{${template}}}`);
      html = html.replace(htmlRegExp, htmlTemplate);
    }
    const htmlWriteStream = fs.createWriteStream(dirIndex);
    htmlWriteStream.write(html);
    console.log('HTML страница из компонентов и стилей успешно собрана!');
  } catch (err) {
    console.error(err);
  }
}
buildPage();