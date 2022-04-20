import Dirs from '@alirya/monorepo/dir/array/dirs';
import UpdateGlobalDependencies from '@alirya/monorepo/update-global-dependencies';
import Files from '@alirya/monorepo/json/array/files';
import JsonRead from '@alirya/monorepo/json-read';
import MergeRight from '@alirya/monorepo/merge-right';
import MergeLeft from '@alirya/monorepo/merge-left';
import Write from '@alirya/monorepo/json/write';

const base = JsonRead(__dirname + '/tsconfig.base.json');

Dirs(__dirname, JsonRead(__dirname + '/lerna.json').packages)
  .then(dirs=>Files('/tsconfig.json', dirs))
  .then(files=>MergeRight(base, files))
  .then(files=>files.map(file=>Write(file)));