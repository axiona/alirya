const merge = require('deepmerge');
const fs = require('fs');
const glob = require('glob');

const [source, destination] = process.argv.slice(2);

if(!source || !destination) {

  throw new Error('not enough argument');
}


const folders = loadJson(__dirname + '/package.json').workspaces;

for(const folder of folders) {

  glob(__dirname + `/${folder}/`, (err, matches) => {

    for(const match of matches) {

        fs.copyFile(__dirname + `/${source}`, match + `/${destination}`, function(error) {

          if(error) {

            console.error(error);
          }

        });
    }
  });
}

function loadJson(path) {

  return JSON.parse(fs.readFileSync(path));
}




