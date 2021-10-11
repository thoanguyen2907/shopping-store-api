const MainModel 	= require("../schemas/users");

module.exports = {
    create : async (item) => {
        try{ 
            const newUser = await new MainModel(item).save(); 
            const token   = await newUser.getSignedJwtToken();
        
            return token
        }catch(error) {
            console.log(error);
        }
    }
}