const Loader = require('./loader');
const { basename } = require('path');


Loader.PackageDirectories().then(directories=>{

  for(let path of directories) {

    const version = Loader.LoadJson(path + '/package.json').version;
    console.log(basename(path) + ": " + version);

  }

})






