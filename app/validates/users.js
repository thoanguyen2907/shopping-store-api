const { check, validationResult } = require('express-validator');

const options = {
    name: {min: 6},
    description: {min: 20}
}

module.exports = {
    checkName : () => {
        return check('name')
        .isLength({ min: options.name.min })
        .withMessage(`Name is not empty and length must be greater than ${options.name.min}`)
    },
    checkDescription : () => {
        return check('description')
        .isLength({ min: options.description.min })
        .withMessage(`Description is not empty and length must be greater than ${options.description.min}`)
    },

    showErrors : async (errors) => {
        let messages = {}; 
        await errors.map((err, index) => {
            messages[err.param] = err.msg;                
        });
    
       return messages;
    }
}