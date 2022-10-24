const mongoose=require("mongoose");
const { default: isEmail } = require("validator/lib/isemail");
//const bcrypt=require("bcryptjs");

//define document structure

const userschema=new mongoose.Schema({
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
/*
employeeschema.pre("save",async function(next){
    //check if the password is modify first time or only the password field is modified
    if(this.isModified("password")){
        console.log(`before covert original password is ${this.password}`);
        this.password=await bcrypt.hash(this.password,10); //convert it into hash code
        console.log(`after covert original password is ${this.password}`);
        thius.confirmpassword=undefined;
    }

});
*/

const register=new mongoose.model("register",userschema);

module.exports=register;
