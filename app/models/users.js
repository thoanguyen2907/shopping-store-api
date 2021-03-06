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
                .select()
        }
    },
    create : async (item) => {
        //khi tạo user, tạo token
        const newUser = await new MainModel(item).save();
        
        const token   = await newUser.getSignedJwtToken();

        return token
    },
    deleteItem : async (params,option) => { 
        if(option.task == 'one'){
            return await MainModel
                .deleteOne({id : params.id})
        }
    },
    editItem : async (params,option) => { 
        if(option.task == 'edit'){
            const user = await MainModel.findById(params.id); 
            const userNew = await user.updateNew(params.body); 
            await MainModel.updateOne({_id : params.id}, userNew)
            return userNew
        }
    }, 
}