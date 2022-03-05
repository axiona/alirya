const merge = require('deepmerge');
const fs = require('fs');
const Loader = require('./loader');


const [parent, child, destination] = process.argv.slice(2);

if(!parent || !child || !destination) {

  throw new Error('not enough argument');
}


const parentData = Loader.LoadJson(__dirname + `/${parent}`);


Loader.PackageDirectories().then(directories=>{

  for(const match of directories) {

    const childData = Loader.LoadJson(match + `/${child}`);

    const data = merge(parentData, childData);

    fs.writeFileSync(
      match + `/${destination}`,
      JSON.stringify(data, null, 2).trim() + '\r\n',
      {encoding:"utf8"}
    );
  }
});


