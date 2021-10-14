const mongoose = require('mongoose');
const databaseConfig = require("../configs/database");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var crypto = require("crypto"); 

var {JWT_EXP, JWT_SECRET} = require("../configs/system"); 
var schema = new mongoose.Schema({ 
    username:String,
    email: String,
    role: String,
    password : String,
    resetPassToken : String,
    resetPassTokenExp: String
	
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

schema.methods.resetPassword  = function () {
    const resetToken    = crypto.randomBytes(20).toString("hex"); 
    this.resetPassToken = crypto.createHash("sha256")
                                .update(resetToken)
                                .digest("hex");
    this.resetPassTokenExp = Date.now() + 10 * 60 * 1000;     

    return resetToken
 }

schema.statics.findByCredentials = async function(email, password){
    let  err= ""; 
    //check empty
    if(!email || !password) return {err : "Email và Password không được rỗng !!!"}

    //check email
    const user = await this.findOne({email});
    if(!user) return {err: "Email và Password không chính xác !!!"}

    //check password
    const isMatch = await bcrypt.compare(password, user.password); 
    if(!isMatch)  return {err: "Email và Password không chính xác !!!"}
    return {user}
}

module.exports = mongoose.model(databaseConfig.col_users, schema );