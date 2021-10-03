const fs            = require('fs');
const mongoose      = require('mongoose');
var colors          = require('colors');

const pathConfig        = require('./path');
global.__base           = __dirname + '/';
global.__path_app       = __base + pathConfig.folder_app + '/';

global.__path_configs   = __path_app + pathConfig.folder_configs + '/';

const databaseConfig  = require(__path_configs + 'database');


mongoose.connect(`mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@cluster0.omedx.mongodb.net/${databaseConfig.database}`)

const ItemSchemas = require('./app/schemas/items');
const items = require('./app/schemas/items');

const Items = JSON.parse(
    fs.readFileSync(`${__dirname}/app/_data/items.json`,'utf-8')
)

const importData = async () => {
    try {
        await ItemSchemas.create(Items)
        console.log('importData...'.bgCyan);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

const deleteData = async () => {
    try {
        await ItemSchemas.deleteMany({})
        console.log('deleteData...'.bgCyan);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

if(process.argv[2] === '-i'){
    importData();
}else if(process.argv[2] === '-d'){
    deleteData();
}