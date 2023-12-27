import Dirs from '@axiona/monorepo/dir/array/dirs';
import UpdateGlobalDependencies from '@axiona/monorepo/update-global-dependencies';
import Files from '@axiona/monorepo/json/array/files';
import JsonRead from '@axiona/monorepo/json-read';
import MergeRight from '@axiona/monorepo/merge-right';
import MergeLeft from '@axiona/monorepo/merge-left';
import Write from '@axiona/monorepo/json/write';

const base = JsonRead(__dirname + '/jasmine.json');

Dirs(__dirname, JsonRead(__dirname + '/lerna.json').packages)
  .then(dirs=>Files('/jasmine.json', dirs))
  .then(files=>MergeRight(base, files))
  .then(files=>files.map(file=>Write(file)));
