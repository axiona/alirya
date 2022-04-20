import Dirs from '@alirya/monorepo/dir/array/dirs';
import UpdateGlobalDependencies from '@alirya/monorepo/update-global-dependencies';
import Files from '@alirya/monorepo/file/array/files';
import JsonRead from '@alirya/monorepo/json-read';
import MergeRight from '@alirya/monorepo/merge-right';
import MergeLeft from '@alirya/monorepo/merge-left';
import Write from '@alirya/monorepo/file/write';

Dirs(__dirname, JsonRead(__dirname + '/lerna.json').packages)
  .then(dirs=>Files('/package.json', dirs))
  .then(files=>files.map(file=>console.log(file.name + ": " + file.version)));




