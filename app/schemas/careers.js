const mongoose = require('mongoose');
const databaseConfig = require("../configs/database");

var schema = new mongoose.Schema({ 
	_id: String,
    name 		    : String,
	title 			: String,
	like		    : Number,
	dislike			: Number
});

module.exports = mongoose.model(databaseConfig.col_careers, schema );