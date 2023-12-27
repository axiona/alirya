import UpdatePeerDependencies from '@axiona/monorepo/update-peer-dependencies.js';
import Dirs from '@axiona/monorepo/dir/array/dirs.js';
import Files from '@axiona/monorepo/file/array/files.js';
import Write from '@axiona/monorepo/json/write.js';
import JsonRead from '@axiona/monorepo/json-read.js';
import PackageJson from '@axiona/monorepo/dir/package-json.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dir = PackageJson(__dirname);

Dirs(__dirname, JsonRead(__dirname + '/lerna.json').packages)
  .then(dirs=>UpdatePeerDependencies([dir, ...dirs], (dev, pkg, dependency, from, to) => {
    const development = dev ? '[dev]' : '';
    console.log(`${pkg}: ${dependency} ${from} -> ${to} ${development}`)
  }))
  .then(files=>files.map(file=>Write(file)));
