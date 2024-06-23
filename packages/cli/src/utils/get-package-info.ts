import fs from 'fs-extra';

export function getPackageInfo() {
  return JSON.parse(fs.readFileSync('package.json', 'utf8').toString());
}
