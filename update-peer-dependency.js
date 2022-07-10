import UpdatePeerDependencies from '@alirya/monorepo/update-peer-dependencies';
import Dirs from '@alirya/monorepo/dir/array/dirs';
import Files from '@alirya/monorepo/file/array/files';
import Write from '@alirya/monorepo/json/write';
import JsonRead from '@alirya/monorepo/json-read';
import PackageJson from '@alirya/monorepo/dir/package-json';

const dir = PackageJson(__dirname);

Dirs(__dirname, JsonRead(__dirname + '/lerna.json').packages)
  .then(dirs=>UpdatePeerDependencies([dir, ...dirs], (dev, pkg, dependency, from, to) => {
    const development = dev ? '[dev]' : '';
    console.log(`${pkg}: ${dependency} ${from} -> ${to} ${development}`)
  }))
  .then(files=>files.map(file=>Write(file)));