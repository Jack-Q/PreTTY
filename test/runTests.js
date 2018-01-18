const spawn = require('cross-spawn');
const path = require('path');

const s = `\\${path.sep}`;
const pattern = process.argv[2] === 'e2e'
  ? `test${s}e2e${s}.+\\.(test|spec)\\.tsx?`
  : `(test|app)${s}(?!e2e${s})[^${s}]+${s}.+\\.(test|spec)\\.tsx?$`;

const result = spawn.sync(path.normalize('./node_modules/.bin/jest'), [pattern], { stdio: 'inherit' });

process.exit(result.status);
