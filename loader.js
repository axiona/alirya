const glob = require('glob');
const fs = require('fs');


const folders = LoadJson(__dirname + '/lerna.json').packages;

function LoadJson(path) {

  return JSON.parse(fs.readFileSync(path));
}


function PackageDirectories () {

  const promises = [];
  const directories = [];

  for(const folder of folders) {

    promises.push(new Promise((resolve, reject) => {

      glob(__dirname + `/${folder}/`, (err, matches) => {

        if(err) {

          reject();

        } else {

          directories.push(...matches);
          resolve();
        }
      });
    }));

  }

  return Promise.all(promises).then(()=>directories);
}

module.exports = {LoadJson, PackageDirectories};
