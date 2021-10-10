const MainModel 	= require("../schemas/users");

module.exports = {
    listItems : (params,option) => {
        // let sort = {};
        // let objWhere = {};
        // if(params.keyword !== '') objWhere.name = new RegExp(params.keyword, 'i');
        // if(params.sortField) sort[params.sortField] = params.sortType;
        //copy params 
        const queryFind = {...params}; 

        let find, select, sort; 

          //remove fields
        //   const removeFields = ['select', 'sort', 'page', 'limit'];

        //   removeFields.forEach(param => delete queryFind[param]); 
          console.log(queryFind)

        // create query string
        let queryStr = JSON.stringify(queryFind); 

        //replace symbol with $
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, find => `$${find}`); 
        //parse
        find = JSON.parse(queryStr); 

        if(params.select) {
            select = params.select.split(',').join(" ");
   
        }
        if(params.sort) {
            sort = params.sort.split(',').join(" ");
        }
        //pagination
        const page = parseInt(params.page) || 1; 
        const limit = parseInt(params.limit) || 3; 
        const skip = (page -1) * limit;
        
        if(option.task == 'all'){
            return MainModel
                .find(find)
                .select(select)
                .sort(sort)
               
        }
        if(option.task == 'one'){
            return MainModel
                .findById(params.id)
                .select('id name status')
        }
    },
    create : (item) => {
        return new MainModel(item).save();
    },
    deleteItem : (params,option) => { 
        if(option.task == 'one'){
            return MainModel
                .deleteOne({id : params.id})
        }
    },
    editItem : (params,option) => { 
        if(option.task == 'edit'){
            return MainModel
                .updateOne({id : params.id},params.body)
        }
    }, 
}