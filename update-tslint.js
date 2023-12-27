import Dirs from '@axiona/monorepo/dir/array/dirs';
import UpdateGlobalDependencies from '@axiona/monorepo/update-global-dependencies';
import Files from '@axiona/monorepo/json/array/files';
import JsonRead from '@axiona/monorepo/json-read';
import MergeRight from '@axiona/monorepo/merge-right';
import MergeLeft from '@axiona/monorepo/merge-left';
import Write from '@axiona/monorepo/json/write';
import Copy from '@axiona/monorepo/copy';

const base = JsonRead(__dirname + '/tslint.base.json');

Dirs(__dirname, JsonRead(__dirname + '/lerna.json').packages)
  .then(dirs=>Files('/tslint.json', dirs))
  .then(files=>MergeRight(base, files))
  .then(files=>files.map(file=>Write(file)));

const file = '/.eslintrc.json';

Dirs(__dirname, JsonRead(__dirname + '/lerna.json').packages)
  .then(dirs=>Files(file, dirs))
  .then(files=>Copy(__dirname + file, files))
