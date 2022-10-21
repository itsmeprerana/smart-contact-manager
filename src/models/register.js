const mongoose=require("mongoose");
const { default: isEmail } = require("validator/lib/isemail");


//define document structure

const employeeschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        validation(value){
            if(!validator.isEmail(value)){
                throw new error("email is not valid");
            }

        },
        
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true

    },
    confirmpassword:{
        type:String,
        required:true
    },
    
});

const register=new mongoose.model("register",employeeschema);

module.exports=register;
