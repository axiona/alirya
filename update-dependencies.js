const merge = require('deepmerge');
const fs = require('fs');
const Loader = require('./loader');



// update only alirya dependency across packages



Loader.PackageDirectories().then(directories=>{

    const packages = [];

    for(const match of directories) {

        const path = match + `/package.json`;

        const data = {
            object : Loader.LoadJson(path),
            path,
        };


        packages.push(data);

    }

    for(const {object, path} of packages) {

        const version = object['version'];
        const name = object['name'];

        for(const {object} of packages) {

            if(object.dependencies && object.dependencies[name]) {

                object.dependencies[name] = `^${version}`;

                if(object.dependencies[name] !== version) {

                    console.log(`${object.name}.dependency ${name} ${object.dependencies[name]} -> ^${version}`)
                }
            }

            if(object.devDependencies && object.devDependencies[name]) {

                object.devDependencies[name] = `^${version}`;

                if(object.devDependencies[name] !== version) {

                    console.log(`${object.name}.devDependencies ${name} ${object.devDependencies[name]} -> ^${version}`)
                }
            }
        }
    }

    for(const {object, path} of packages) {

        fs.writeFileSync(
            path,
            JSON.stringify(object, null, 2).trim(),
            {encoding:"utf8"}
        );
    }

});

