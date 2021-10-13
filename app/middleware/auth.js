const jwt = require("jsonwebtoken"); 
var {JWT_EXP, JWT_SECRET} = require("../configs/system"); 
const UserModel 	= require("../models/users");
const protect = async (req, res, next) => {
//check whether token is available 
//get token from req.header
let token = ""; 
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(' ')[1];
} 

//kiểm tra token , nếu có token giải mã token
try {
    if(token ) {
        const decoded = await jwt.verify(token, JWT_SECRET );
        console.log(decoded); 
        req.user = await UserModel.listItems({id: decoded.id}, {task: "one"});
        console.log(req.user)
    }

} catch(error) {
    res.status(401).json({
        success: false, 
        messages: "Please log in !! "
    })
}

//nếu không có token, send error
if(!token ) {
    return res.status(401).json({
        success: false, 
        messages: "Please log in !! "
    })
}
}

module.exports = {
    protect
}