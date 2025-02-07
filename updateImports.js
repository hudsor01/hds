const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');
const hooksPath = '@/hooks/data';

const updateImportStatements = (filePath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${filePath}:`, err);
      return;
    }

    // Log the original data for debugging
    console.log(`Original data in ${filePath}:\n${data}`);

    const updatedData = data.replace(/import\s+{([^}]*)}\s+from\s+['"]\.\.\/hooks\/data['"];/g, `import { $1 } from '${hooksPath}';`);

    // Log the updated data for debugging
    console.log(`Updated data in ${filePath}:\n${updatedData}`);

    fs.writeFile(filePath, updatedData, 'utf8', (err) => {
      if (err) {
        console.error(`Error writing file ${filePath}:`, err);
      } else {
        console.log(`Updated import statements in ${filePath}`);
      }
    });
  });
};

const processDirectory = (dir) => {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error(`Error reading directory ${dir}:`, err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error(`Error getting file stats for ${filePath}:`, err);
          return;
        }

        if (stats.isDirectory()) {
          processDirectory(filePath);
        } else if (stats.isFile() && (filePath.endsWith('.tsx') || filePath.endsWith('.ts'))) {
          updateImportStatements(filePath);
        }
      });
    });
  });
};

processDirectory(componentsDir);
