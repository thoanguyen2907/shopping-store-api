var express         = require('express');
var authRouter          = express.Router();
const {checkUsername, checkEmail, checkRole, checkPassword, showErrors}     = require("../validates/auth");
const { check, validationResult } = require('express-validator');

const controllerName = 'auth';
const MainModel 	= require("../models/users");



authRouter.post('/register', 
checkUsername(),
checkRole(),
checkPassword(),
checkEmail(),
async (req,res, next) => {
    try {
        const result = await validationResult(req);
        if (!result.isEmpty()) {
            const errors = result.array(); 
           let messages = await showErrors(errors);     
           console.log(messages);    
            res.status(400).json({
                success : false,
                data : messages
            });
            return;         
          }
        const data = await MainModel.create(req.body);
            res.status(201).json({
                success : true,
                data : data
            })
    } catch(error) {
        console.log(error)
    }  
});

module.exports = {
    authRouter
}


