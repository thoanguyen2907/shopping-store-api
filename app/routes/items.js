var express         = require('express');
var itemsRouter          = express.Router();
const { body } = require('express-validator');
const { check, validationResult } = require('express-validator');

const controllerName = 'items';
const MainModel 	= require("../models/items");


itemsRouter.get('/', async (req,res, next) => {
        let params = []; 
        params.sortField = req.query.orderBy; 
        params.sortType = req.query.orderDir; 

        const data = await MainModel.listItems(params , {'task' : 'all'})
        res.status(200).json({
            success : true,
            count : data.length,
            data : data
        })
});

itemsRouter.get('/:id',async (req,res, next) => {
        const data = await MainModel.listItems({'id' : req.params.id} , {'task' : 'one'})
        res.status(200).json({
            success : true,
            data : data
        })
})

itemsRouter.post('/add', 
check('name').notEmpty(),
async (req,res, next) => {
    const result = validationResult(req);
    console.log(result.array());
    if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

    const data = await MainModel.create(req.body);
        res.status(201).json({
            success : true,
            data : data
        })
    
})

itemsRouter.put('/edit/:id',async (req,res, next) => {
 
        const data = await MainModel.editItem({'id' : req.params.id,'body' : req.body} , {'task' : 'edit'})
        res.status(200).json({
            success : true,
            data : data
        })
    
});

itemsRouter.delete('/delete/:id',async (req,res, next) => {
        const data = await MainModel.deleteItem({'id' : req.params.id} , {'task' : 'one'})
        res.status(200).json({
            success : true,
            data : data
        })
})

module.exports = {
    itemsRouter
}


