var express         = require('express');
var authRouter          = express.Router();
const {checkUsername, checkEmail, checkRole, checkPassword, showErrors}     = require("../validates/auth");
const { check, validationResult } = require('express-validator');
const {protect, authorize}      = require("../middleware/auth")
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
            saveCookieResponse(res, 201, token)
        }    
    } catch(error) {
        console.log(error)
    }
});

authRouter.get("/me", protect, authorize("user"),
 async (req, res, next) => {
    try {
        res.status(200).json({
            success: true, 
            user: req.user
        })         
    } catch(error) {
        console.log(error)
    }
});

authRouter.post("/forgotPassword",
 async (req, res, next) => {
     //in auth models , forgotPassword function return resetToken
    const result = await MainModel.forgotPassword(req.body); 
    if(!result) {
        res.status(401).json({
            success: true,
            messages: "Email is not exists "
        })
    } else {
        res.status(201).json({
            success: true,
            data: result
        })
    }
});

authRouter.post("/resetPassword/:resetToken",
 async (req, res, next) => {
    const result = await MainModel.resetPassword({resetToken: req.params.resetToken, 
    password: req.body.password
    })
    if(!result) {
        res.status(401).json({
            success: true,
            messages: "The reset token is not available"
        })
    } else {
        res.status(201).json({
            success: true, 
            result
        })
    }
  
});

authRouter.get("/logout",  async (req, res, next) => {
res.status(200)
.cookie('token', 'none', {
    expires: new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true 
})
.json({
    success: true, 
})
}
);


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


