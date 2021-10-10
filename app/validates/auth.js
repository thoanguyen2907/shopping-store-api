const { check, validationResult } = require('express-validator');

const options = {
    username: {min: 2},
    password: {min: 6},
    enum: ["user"]
}

module.exports = {
    checkUsername : () => {
        return check('username')
        .isLength({ min: options.username.min })
        .withMessage(`Name is not empty and length must be greater than ${options.username.min}`)
    },
    checkEmail : () => {
        return check('email')
        .isEmail()
        .withMessage("Email must be in right format")
    },

    checkRole : () => {
        return check('role')
        .isIn(options.enum)
        .withMessage("Role must be user")
    },
    checkPassword : () => {
        return check('password')
        .isLength({ min: options.password.min })
        .withMessage(`Name is not empty and length must be greater than ${options.password.min}`)
    },

    showErrors : async (errors) => {
        let messages = {}; 
        await errors.map((err) => {
            messages[err.param] = err.msg;                
        });

    
       return messages;
    }
}