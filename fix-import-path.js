import JsonRead from "@axiona/monorepo/json-read";
import Dirs from "@axiona/monorepo/dir/array/dirs";
import {TrimPrefixParameters} from "@axiona/string/trim-prefix";
import Escape from "@axiona/string/pattern/escape";
const glob = require('glob');
const path = require('path');
const {camelCase, startCase} = require('lodash');
// const Dirs = require("@axiona/monorepo/dir/array/dirs");
const UpdateGlobalDependencies = require("@axiona/monorepo/update-global-dependencies");
const Write = require("@axiona/monorepo/json/write");
const fs = require('fs');
const packages = __dirname + '/package.json';

// const maps = new Map();

Dirs(__dirname, JsonRead(__dirname + '/lerna.json').packages)
  .then(dirs=> {
      return dirs;
  })
  .then((dirs) => {
      return dirs.flatMap(dir=>[`${dir.dir}/src`, `${dir.dir}/spec`])
  })
  .then((dirs) => {

      const promises = [];

      for(const dir of dirs) {

          promises.push(new Promise(function (resolve, reject) {

              glob(dir + '/**/*.ts', {nodir:true}, function (error, files) {
                  error ? reject(error) : resolve(files);
              })

          }));

      }

      return Promise.all(promises).then(results=>results.flatMap(result=>result))

  }).then(files=>{

    for(const path of files) {

        console.log(`Starting: ${path}`);

        let isMatch = false;

        // console.log(`Loading`);
        let file = fs.readFileSync(path).toString();

        // console.log(`Matching`);
        const pattern = new RegExp(`from\\s+['"](.\/)?(..\/)*([@.a-zA-z0-9-_]+\/?)+['"];`, 'g');
        let matches = file.match(pattern) || [];
        matches = matches.filter(match => {
            return match.match(/[@a-zA-z0-9-_]/);
        });

        // console.log(`match: ${matches.length}`);

        // let i = 0;

        for (let match of matches) {

            // i++;
            // console.log(`checking: ${i}`);

            let clean = match.replace(/['";]/g, '').split(/\s/g).pop();

            if(!clean.match(/\.js$/)) {

                file = file
                  .replace(`'${clean}';`, `'${clean}.js';`)
                  .replace(`"${clean}";`, `"${clean}.js";`);

                // console.log(`Replacing: ${file}->${replaced}`);

                // file = replaced;

                isMatch = true;

            } else {

                // console.log(`Replace Skipped`);
            }
        }

        if(isMatch) {
            console.log(`Updating: ${path}`);
            fs.writeFileSync(path, file);
        } else {
            console.log(`Skipping: ${path}`);
        }
    }

});


