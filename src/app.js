const express=require("express");
const path=require("path");
const app = express();
require("./db/conn");
const hbs=require("hbs");
const register=require("./models/register");
const { json, Router } = require("express");
const bcrypt=require("bcryptjs");



//work for other port
const port= process.env.PORT || 3000;
const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partialfile_path=path.join(__dirname,"../templates/partials");


//show data from signup page to another
app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path));


app.set("views",template_path);
app.set("view engine","hbs");
hbs.registerPartials(partialfile_path);

app.get("/database",async(req,res)=>{
    try{
        const result=await register.find();
        res.render("database",{database:result});
    }
    catch(err){
        console.log("here it is "+err);
    }
})

//index page
app.get("/",(req,res) => {
    res.render("index");
});

//login page
app.get("/login",(req,res) => {
    res.render("login");
});

app.get("/addData",(req,res)=>{
    res.render("addData");
})

//registration page
app.get("/registration",(req,res)=>{
    res.render("registration");
})

app.get("/database/:id",async = (req,res)=>{
    try{

        const result=register.findByIdAndRemove(req.params.id,(err,doc)=>{
            if(!err){
               res.render("database");
            }
            else{
                res.send(err);
            }
        });
       

    }catch(err){
        res.status(400).send("can't delete "+err);
    }
})

//send data from signup page to another page // registration
app.post("/registration",async (req,res)=>{
    try{
        
        const pass=req.body.password;
        const cpass=req.body.confirmpassword;
        const dname=req.body.name;
        const demail=req.body.email;
        const des=req.body.Description;
        

        //console.log(bcrypt.hash(pass,10));
        
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
        res.status(404).send("Invalid details"+err);
    }
});

app.get("/:id",async(req,res)=>{
    try{
        const result=await register.findById(req.params.id);
        res.render("update",{update:result});
    }
    catch(err){
        console.log("here it is "+err);
    }
})

app.post("/login",async (req,res)=>{
    try{
        
        const demail=req.body.email;
        const pass=req.body.password;
        const result=await register.findOne({email:demail});
        
       // const isMatch=await bcrypt.compare(pass,result.password);
        
        if(result.password=pass){
            res.status(201).render("userdashboard");
        }else{
            res.send("Invalid Password");
        }
        console.log(result);

    }catch(err){
        res.status(404).send("not found");
        
    }

});

app.listen(port,()=>{
    console.log(`server is running port no ${port}`);

});