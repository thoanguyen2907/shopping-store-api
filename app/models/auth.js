const MainModel 	= require("../schemas/users");
const mongoose = require('mongoose');


module.exports = {
    create : async (item) => {
        try{ 
            const newUser = await new MainModel(item).save(); 
            const token   = await newUser.getSignedJwtToken();
        
            return token
        }catch(error) {
            console.log(error);
        }
    }, 
    login : async (item, res) => {
        const {email, password} = item; 
        const result = await MainModel.findByCredentials(email, password); 
        if(result.err) {
            res.status(401).json({
                success: true, 
                messages: result.err
            });
            return false 
        }
        return await result.user.getSignedJwtToken()
     
    },
    forgotPassword: async (item) => { 
        const user = await MainModel.findOne({email: item.email});          
        if(user) {
            const resetToken = await user.resetPassword(); 

            console.log({user})
            await user.save(); 
            return resetToken
        } else {
            return false;
        }
        
    }
}