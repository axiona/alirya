import Dirs from '@axiona/monorepo/dir/array/dirs.js';
import UpdateGlobalDependencies from '@axiona/monorepo/update-global-dependencies.js';
import Files from '@axiona/monorepo/json/array/files.js';
import JsonRead from '@axiona/monorepo/json-read.js';
import MergeRight from '@axiona/monorepo/merge-right.js';
import MergeLeft from '@axiona/monorepo/merge-left.js';
import Write from '@axiona/monorepo/json/write.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const base = JsonRead(__dirname + '/package.base.json');

Dirs(__dirname, JsonRead(__dirname + '/lerna.json').packages)
  .then(dirs=>Files('/package.json', dirs))
  .then(files=>MergeRight(base, files))
  // .then(files=>console.log(files))
  .then(files=>files.map(file=>Write(file)))
;
