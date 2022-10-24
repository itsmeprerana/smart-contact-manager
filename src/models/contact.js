const mongoose=require("mongoose");
const { default: isEmail } = require("validator/lib/isemail");

const contactschema=new mongoose.Schema({

    id:{
        type:Number,
    },
    name:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
            validation(value){
                if(!validator.isEmail(value)){
                    throw new error("email is not valid");
                }

            },
    },
    phone:{
        type:Number,
    },
    address:{
        type:String
    }     
});


const contact=new mongoose.model("contact",contactschema);

module.exports=contact;
