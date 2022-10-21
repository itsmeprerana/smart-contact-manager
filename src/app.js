const express=require("express");
const path=require("path");
const app = express();
require("./db/conn");
const hbs=require("hbs");
const register=require("./models/register");
const { json } = require("express");
const bcrypt=require("bcryptjs");

//work for other port
const port= process.env.PORT || 3000;
const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partialfile_path=path.join(__dirname,"../templates/partials");
// console.log(path.join(__dirname,"../public"));

//show data from signup page to another
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path)); 

// static pages 
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partialfile_path);

//index page
app.get("/",(req,res) => {
    res.render("index");
});

//login page
app.get("/login",(req,res) => {
    res.render("login");
});

//registration page
app.get("/registration",(req,res)=>{
    res.render("registration");
})

//send data from signup page to another page // registration
app.post("/registration",async (req,res)=>{
    try{
        
        const pass=req.body.password;
        const cpass=req.body.confirmpassword;
        const dname=req.body.name;
        const demail=req.body.email;
        const des=req.body.Description;

        console.log(bcrypt.hash(pass,10));

        if(pass===cpass){
            const data=new register({
                name:dname,
                email:demail,
                password:pass,
                confirmpassword:cpass,
                Description:des
            });
            
        const result=await data.save();
       res.status(201).render("index"); 

        }else{
            res.send("passwrod inccorect")
        }

    }catch(err){
        res.status(404).send("Invalid details");
    }
});

app.post("/login",async (req,res)=>{
    try{
        
        const demail=req.body.email;
        const pass=req.body.password;
        const result=await register.findOne({email:demail});
        if(result.password===pass){
            res.render("index");
        }else{
            res.send("Invalid Password");
        }
        console.log(result);

    }catch(err){
        
    }

});

app.listen(port,()=>{
    console.log(`server is running port no ${port}`);

})