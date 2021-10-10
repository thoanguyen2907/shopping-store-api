const mongoose = require('mongoose');
const databaseConfig = require("../configs/database");
const {Schema} = require('mongoose');
var bcrypt = require('bcryptjs');
var schema = new mongoose.Schema({ 

    username:String,
    email: String,
    role: String,
    password : String 
	
});

schema.pre('save', function(next){
    console.log("run here");
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    console.log(this.password); 
    next(); 
});

module.exports = mongoose.model(databaseConfig.col_users, schema );