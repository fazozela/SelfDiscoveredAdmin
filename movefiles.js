const fs = require('fs');
const path = require('path');
const fse = require('fs-extra');

const sourceDir = path.join(__dirname, 'dist', 'selfdiscoveredadmin', 'browser');
const destDir = path.join(__dirname, 'dist', 'selfdiscoveredadmin');

if (fs.existsSync(sourceDir)) {
  fs.readdirSync(sourceDir).forEach(file => {
    const sourceFile = path.join(sourceDir, file);
    const destFile = path.join(destDir, file);
    fse.moveSync(sourceFile, destFile, { overwrite: true });
  });

  // Remove the now empty 'browser' directory
  fs.rmdirSync(sourceDir);
} else {
  console.error(`Source directory ${sourceDir} does not exist.`);
}
