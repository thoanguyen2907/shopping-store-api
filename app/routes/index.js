var express = require('express');

const { itemsRouter } = require('./items');

const { careersRouter } = require('./careers');

const { usersRouter } = require('./users');

const { authRouter } = require('./auth');

const rootRouter = express.Router();

rootRouter.use("/items", itemsRouter); 
rootRouter.use("/careers", careersRouter); 
rootRouter.use("/users", usersRouter); 
rootRouter.use("/auth", authRouter); 


module.exports = {
    rootRouter
};
