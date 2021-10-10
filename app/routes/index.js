var express = require('express');

const { itemsRouter } = require('./items');

const { careersRouter } = require('./careers');

const rootRouter = express.Router();

rootRouter.use("/items", itemsRouter); 
rootRouter.use("/careers", careersRouter); 


module.exports = {
    rootRouter
};
