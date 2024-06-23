/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

const utilsDir = path.join(__dirname, '../src/utils');

const outputFile = path.join(__dirname, '../public', 'registry.json');

async function convertTsFilesToJson() {
  try {
    const files = fs.readdirSync(utilsDir);

    const result = files.map((file) => {
      const filePath = path.join(utilsDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const functionName = path.basename(file, '.ts');

      return {
        name: functionName,
        dir: 'utils',
        file: {
          name: file,
          content: content
        }
      };
    });

    fs.writeFileSync(outputFile, JSON.stringify(result, null, 2), 'utf8');
    console.log('JSON file created successfully.');
  } catch (error) {
    console.error('Error processing TypeScript files:', error);
  }
}

convertTsFilesToJson();
