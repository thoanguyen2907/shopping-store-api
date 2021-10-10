const mongoose = require('mongoose');
const databaseConfig = require("../configs/database");
const {Schema} = require('mongoose');
var schema = new mongoose.Schema({ 
    _id: String,
    username:String,
    email: String,
    role: String,
    password : String 
	
});

module.exports = mongoose.model(databaseConfig.col_users, schema );