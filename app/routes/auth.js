var express         = require('express');
var authRouter          = express.Router();
const {checkUsername, checkEmail, checkRole, checkPassword, showErrors}     = require("../validates/auth");
const { check, validationResult } = require('express-validator');

const controllerName = 'auth';
const MainModel 	= require("../models/auth");

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
           
            res.status(400).json({
                success : false,
                data : messages
            });
            return;         
          }
        const token = await MainModel.create(req.body);
            // res.status(201).json({
            //     success : true,
            //     token
            // })
            saveCookieResponse(res, 201, token)
    } catch(error) {
        console.log(error)
    }  
});

authRouter.post("/login",

 async (req, res, next) => {
    try {
       
        const token = await MainModel.login(req.body, res);
        if(token) {
            // res.status(201).json({
            //     success : true,
            //     token
            // })
            saveCookieResponse(res, 201, token)
        }   
       
    } catch(error) {
        console.log(error)
    }
})

module.exports = {
    authRouter
}

const saveCookieResponse = (res, statusCode, token) => {
    const options = {
        expires: new Date(
            Date.now() + 30 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true 
    }
    res.status(statusCode)
    .cookie('token', token, options)
    .json({
        success: true, 
        token
    })
}


