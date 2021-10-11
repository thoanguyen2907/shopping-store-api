const mongoose = require('mongoose');
const databaseConfig = require("../configs/database");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var {JWT_EXP, JWT_SECRET} = require("../configs/system"); 
var schema = new mongoose.Schema({ 
    username:String,
    email: String,
    role: String,
    password : String 
	
});

schema.pre('save', function(next){
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next(); 
});

schema.methods.getSignedJwtToken = function () {
   return jwt.sign({  id : this._id}, JWT_SECRET , {
        expiresIn: 60 * 60 
    });
}

module.exports = mongoose.model(databaseConfig.col_users, schema );