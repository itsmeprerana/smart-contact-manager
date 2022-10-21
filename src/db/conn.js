//connection creation 
const { default: mongoose } = require("mongoose");
const{default:validator}=require("validator");

const { stringify } = require("querystring");
mongoose.connect("mongodb://localhost:27017/project")
.then(() => console.log("connection successfull"))
.catch( (err) => console.log(err));

/*
//document structure
const inst=new mongoose.Schema({
    id:{
        type:Number,
        required :true,        
    },
    name : {                    //embedded document
        first:{
            type:String,
            trim:true,
            lowercase:true,
            minlength:2,
            maxlength:10,
            required:true
        },
        last : {
            type:String,
            trim:true,
            lowercase:true,
            minlength:2,
            maxlength:10,
            required:true
        },
        
    },
    address:{
        city: String,
        pincode:Number
        
    },
    salary:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error("video count should not be negative");
            }
        }
    },
    status:String,
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
               throw new Error("email is not valid");
            }
        }
    },
    date:{
        type:Date,
        default:Date.now
    }
})


const instructor=new mongoose.model("instructor",inst);

const createDocument= async() =>{

        const record= new instructor({
            id:15,
            name : {
                first:"ss",
                last : "rane" 
            },
            address:{
                city: "bhusawal",
                pincode:2343
            },
            salary:2834,
            email:"prerna_patil@moderncoe.edu.in",
            status:"unaprroved",
           
        });
        const record1= new instructor({
            id:0,
            name : {
                first:"anurag",
                last : "sjdk" 
            },
            address:{
                city: "pune",
                pincode:450001
            },
            salary:98,
            email:"prerna_patil@moderncoe.edu.in",
            status:"aprroved",
           
        });
        //( [ {} ] )
        const result=await instructor.insertMany([record,record1]);
        console.log(result);
        
}

//createDocument()

const getDocument = async() =>{
    try{
        const result=await instructor.find({salary:{$gt:40000}}).sort({salary:1});
    console.log(result);
    }
    catch(err){
        console.log(err);
    }
};

const deleteDocument = async() =>{

    try{
        const result=await instructor.deleteMany({id:{$gt:1}});
    console.log(result);  
    } catch(err){
        console.log(arr);
    } 

}

const getupdate = async ()=>{
    const result = await instructor.updateMany({id:{$gt:1}}, {$inc:{salary:-300}});
    console.log(result);
}




//update document
*/

