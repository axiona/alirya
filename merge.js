const merge = require('deepmerge');
const fs = require('fs');
const glob = require('glob');


const [parent, child, destination] = process.argv.slice(2);

if(!parent || !child || !destination) {

  throw new Error('not enough argument');
}

const folders = loadJson(__dirname + '/package.json').workspaces;
const parentData = loadJson(__dirname + `/${parent}`);

for(const folder of folders) {

  glob(__dirname + `/${folder}/`, (err, matches) => {

    for(const match of matches) {

        const childData = loadJson(match + `/${child}`);

        const data = merge(parentData, childData);

        fs.writeFileSync(match + `/${destination}`, JSON.stringify(data, null, 2), {encoding:"utf8"});
    }
  });
}

function loadJson(path) {

  return JSON.parse(fs.readFileSync(path));
}




