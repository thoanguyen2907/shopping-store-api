var express = require('express');

const { itemsRouter } = require('./items');

const { careersRouter } = require('./careers');
const { usersRouter } = require('./users');


const rootRouter = express.Router();

rootRouter.use("/items", itemsRouter); 
rootRouter.use("/careers", careersRouter); 
rootRouter.use("/users", usersRouter); 


module.exports = {
    rootRouter
};
