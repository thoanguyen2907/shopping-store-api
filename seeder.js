const fs            = require('fs');
const mongoose      = require('mongoose');


const pathConfig        = require('./path');
global.__base           = __dirname + '/';
global.__path_app       = __base + pathConfig.folder_app + '/';

global.__path_configs   = __path_app + pathConfig.folder_configs + '/';

const databaseConfig  = require(__path_configs + 'database');


mongoose.connect(`mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@nodejstraining.4cyhs.mongodb.net/${databaseConfig.database}?retryWrites=true&w=majority`, { useNewUrlParser: true }, { useUnifiedTopology: true })

const ItemSchemas = require('./app/schemas/items');

const Items = JSON.parse(
    fs.readFileSync(`${__dirname}/app/_data/items.json`,'utf-8')
)

const importData = async () => {
    try {
        await ItemSchemas.create(Items)
        console.log('importData...');
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

const deleteData = async () => {
    try {
        await ItemSchemas.deleteMany({})
        console.log('deleteData...');
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

if(process.argv[2] === '-i'){
    importData();
    console.log(process.argv[2])
}else if(process.argv[2] === '-d'){
     deleteData();
    console.log(process.argv[2])

}