var express         = require('express');
var careersRouter          = express.Router();
const {checkName, checkDescription, showErrors}     = require("../validates/careers");
const { check, validationResult } = require('express-validator');

const controllerName = 'careers';
const MainModel 	= require("../models/careers");


careersRouter.get('/', async (req,res, next) => {
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

careersRouter.get('/:id',async (req,res, next) => {
        const data = await MainModel.listItems({'id' : req.params.id} , {'task' : 'one'})
        res.status(200).json({
            success : true,
            data : data
        })
})

careersRouter.post('/add', 
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

careersRouter.put('/edit/:id',
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
careersRouter.put('/event/:type/:id',async (req,res, next) => {
    const data   = await MainModel.event({'id' : req.params.id,'type' : req.params.type})
    if(!data) return res.status(200).json({success : true,data : "Sai trạng thái cập nhật"})
    res.status(200).json({
        success : true,
        data : data
    })
})

// careersRouter.put('/like/:id',async (req,res, next) => {
//         const career = await MainModel.listItems({'id': req.params.id} , {'task' : 'one'}); 
//         const data = await MainModel.event({'id' : req.params.id,'like' : career.like +1} , {'task' : 'like'})
//         res.status(200).json({
//             success : true,
//             data : data
//         })
//     });

// careersRouter.put('/dislike/:id',async (req,res, next) => {
//         const career = await MainModel.listItems({'id': req.params.id} , {'task' : 'one'}); 
//         const data = await MainModel.event({'id' : req.params.id,'dislike' : career.like +1} , {'task' : 'dislike'})
//         res.status(200).json({
//             success : true,
//             data : data
//         })
//     })

careersRouter.delete('/delete/:id',async (req,res, next) => {
        const data = await MainModel.deleteItem({'id' : req.params.id} , {'task' : 'one'})
        res.status(200).json({
            success : true,
            data : data
        })
})

module.exports = {
    careersRouter
}


