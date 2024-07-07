const fs = require('fs-extra');
const path = require('path');

const sourceDir = path.join(__dirname, 'dist', 'selfdiscovered', 'browser'); // Source directory
const targetDir = path.join(__dirname, 'dist', 'selfdiscovered'); // Target directory

// Function to move files from source to target directory
async function moveFiles() {
  try {
    // Check if source directory exists
    if (await fs.pathExists(sourceDir)) {
      // Read files from source directory
      const files = await fs.readdir(sourceDir);

      // Move each file to target directory, overwrite if exists
      for (const file of files) {
        const sourceFile = path.join(sourceDir, file);
        const targetFile = path.join(targetDir, file);
        await fs.move(sourceFile, targetFile, { overwrite: true });
        console.log(`Moved ${sourceFile} to ${targetFile}`);
      }

      console.log('Files moved successfully.');
    } else {
      console.log('Source directory does not exist.');
    }
  } catch (err) {
    console.error('Error moving files:', err);
  }
}

// Call the function to move files
moveFiles();
