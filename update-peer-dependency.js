import UpdatePeerDependencies from '@axiona/monorepo/update-peer-dependencies';
import Dirs from '@axiona/monorepo/dir/array/dirs';
import Files from '@axiona/monorepo/file/array/files';
import Write from '@axiona/monorepo/json/write';
import JsonRead from '@axiona/monorepo/json-read';
import PackageJson from '@axiona/monorepo/dir/package-json';

const dir = PackageJson(__dirname);

Dirs(__dirname, JsonRead(__dirname + '/lerna.json').packages)
  .then(dirs=>UpdatePeerDependencies([dir, ...dirs], (dev, pkg, dependency, from, to) => {
    const development = dev ? '[dev]' : '';
    console.log(`${pkg}: ${dependency} ${from} -> ${to} ${development}`)
  }))
  .then(files=>files.map(file=>Write(file)));
