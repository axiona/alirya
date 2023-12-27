import Dirs from '@axiona/monorepo/dir/array/dirs';
import UpdateGlobalDependencies from '@axiona/monorepo/update-global-dependencies';
import Files from '@axiona/monorepo/file/array/files';
import JsonRead from '@axiona/monorepo/json-read';
import MergeRight from '@axiona/monorepo/merge-right';
import MergeLeft from '@axiona/monorepo/merge-left';
import Write from '@axiona/monorepo/file/write';

Dirs(__dirname, JsonRead(__dirname + '/lerna.json').packages)
  .then(dirs=>Files('/package.json', dirs))
  .then(files=>files.map(file=>console.log(file.name + ": " + file.version)));




