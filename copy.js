const merge = require('deepmerge');
const fs = require('fs');
const glob = require('glob');
const Loader = require('./loader');


const [source, destination] = process.argv.slice(2);

if(!source || !destination) {

  throw new Error('not enough argument');
}


Loader.PackageDirectories().then(directories=>{

  for(const match of directories) {

    fs.copyFile(__dirname + `/${source}`, match + `/${destination}`, function(error) {

      if(error) {

        console.error(error);
      }

    });
  }
});



