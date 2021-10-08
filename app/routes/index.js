var express = require('express');

const { itemsRouter } = require('./items');


const rootRouter = express.Router();

rootRouter.use("/items", itemsRouter); 


module.exports = {
    rootRouter
};
