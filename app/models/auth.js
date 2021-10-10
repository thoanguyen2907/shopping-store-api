const MainModel 	= require("../schemas/users");

module.exports = {
 
    create : (item) => {
        return new MainModel(item).save();
    },
  
}