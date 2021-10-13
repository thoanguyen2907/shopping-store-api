var express         = require('express');
var itemsRouter          = express.Router();
const {checkName, checkDescription, showErrors}     = require("../validates/items");
const { check, validationResult } = require('express-validator');

const controllerName = 'items';
const MainModel 	= require("../models/items");
const {protect}      = require("../middleware/auth")

itemsRouter.get('/', protect, async (req,res, next) => {
        // let params = []; 
        // params.sortField = req.query.orderBy; 
        // params.sortType = req.query.orderDir; 

        const data = await MainModel.listItems(req.query , {'task' : 'all'})
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
// check('name').notEmpty().withMessage("Name is not empty"),
checkName(),
checkDescription(),
async (req,res, next) => {
    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            const errors = result.array(); 
           let messages = showErrors(errors);         
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
    
    
})

itemsRouter.put('/edit/:id',
checkName(),
checkDescription(),
async (req,res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        const errors = result.array(); 
       let messages = showErrors(errors);         
        res.status(400).json({
            success : false,
            data : messages
        });
        return;         
      }
 try {
    const data = await MainModel.editItem({'id' : req.params.id,'body' : req.body} , {'task' : 'edit'})
    res.status(200).json({
        success : true,
        data : data
    })

 } catch(error) {
     console.log(error)
 }
       
    
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


