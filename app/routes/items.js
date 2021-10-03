var express         = require('express');
var router          = express.Router();



const controllerName = 'items';
const MainModel 	= require(__path_models + controllerName);
const MainValidate	= require(__path_validates + controllerName);


router.get('/', async (req,res, next) => {

        const data = await MainModel.listItems(req.query , {'task' : 'all'})
        res.status(200).json({
            success : true,
            count : data.length,
            data : data
        })
});

router.get('/:id',async (req,res, next) => {
        const data = await MainModel.listItems({'id' : req.params.id} , {'task' : 'one'})
        res.status(200).json({
            success : true,
            data : data
        })
})

router.post('/add', async (req,res, next) => {
    let err = await validateReq(req,res, next);
    if(!err){
        const data = await MainModel.create(req.body);
        res.status(201).json({
            success : true,
            data : data
        })
    }
})

router.put('/edit/:id',async (req,res, next) => {
    let err = await validateReq(req,res, next);
    if(!err){
        const data = await MainModel.editItem({'id' : req.params.id,'body' : req.body} , {'task' : 'edit'})
        res.status(200).json({
            success : true,
            data : data
        })
    }
})

router.delete('/delete/:id',async (req,res, next) => {
        const data = await MainModel.deleteItem({'id' : req.params.id} , {'task' : 'one'})
        res.status(200).json({
            success : true,
            data : data
        })
})

module.exports = router;


