// const merge = require('deepmerge');
// const fs = require('fs');
// const glob = require('glob');
// const Loader = require('./loader');
//
//
// const [source, destination] = process.argv.slice(2);
//
// if(!source || !destination) {
//
//   throw new Error('not enough argument');
// }
//
//
// Loader.PackageDirectories().then(directories=>{
//
//   for(const match of directories) {
//
//     fs.copyFile(__dirname + `/${source}`, match + `/${destination}`, function(error) {
//
//       if(error) {
//
//         console.error(error);
//       }
//
//     });
//   }
// });
//
//
//
import Copy from "@axiona/monorepo/copy";
import Dirs from "@axiona/monorepo/dir/array/dirs";
import JsonRead from "@axiona/monorepo/json-read";
import Files from "@axiona/monorepo/file/array/files";

const file = '/LICENSE';

Dirs(__dirname, JsonRead(__dirname + '/lerna.json').packages)
    .then(dirs=>Files(file, dirs))
    .then(files=>Copy(__dirname + file, files))
