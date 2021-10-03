const mongoose = require('mongoose');
const databaseConfig = require(__path_configs + 'database');

var schema = new mongoose.Schema({ 
    name 		    : String,
	description 	: String,
	careers	        : [String],
	type		    : [String],
	local		    : [String],
	web		        : String,
	address 	    : String,
	phone		    : Number,
	email		    : String
});

module.exports = mongoose.model(databaseConfig.col_items, schema );