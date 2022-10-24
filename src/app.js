const express=require("express");
const path=require("path");
const app = express();
require("./db/conn");
const hbs=require("hbs");
const register=require("./models/register");
const contact=require("./models/contact");
const { json, Router } = require("express");
const bcrypt=require("bcryptjs");
const { get } = require("http");



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


// show contact details on website
app.get("/database",async(req,res)=>{
    try{
        const result=await contact.find();
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
});

app.get("/:email",async(req,res)=>{

   const result=await contact.findOne({email:req.params.email});
   res.render("update",{update:result});
    
    
})
app.post("/update",async(req,res)=>{

    try{
      
            const nname=req.body.name;
            const nemail=req.body.email;
            const nphone=req.body.phone;
            const nadd=req.body.address;
    
        
            const result=await contact.updateOne({_id:req.body.oid},
                                            {$set:{name:nname,email:nemail,phone:nphone,address:nadd}});
            res.redirect("database");
        }catch(er){
            res.send(er);
        }
});
//add new contact in the contact list
app.post("/addData",async(req,res)=>{
    try{
        
        const id=req.body.id;
        const name=req.body.name;
        const email=req.body.email;
        const phone=req.body.phone;
        const add=req.body.address;
        

        //console.log(bcrypt.hash(pass,10));
        const data=new contact({
                id:id,
                name:name,
                email:email,
                phone:phone,
                address:add,               
        });
            
            const result=await data.save();
            res.status(201).redirect("database"); 
    }catch(err){
        res.status(404).send("Invalid details"+err);
    }
});

//registration page
app.get("/registration",(req,res)=>{
    res.render("registration");
})

app.get("/:id",async(req,res)=>{
    try{

        const result=contact.findByIdAndRemove(req.params.id,(err,doc)=>{
            if(!err){
               res.redirect("database");
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
        //console.log(result);

    }catch(err){
        res.status(404).send("not found");
        
    }

});

app.listen(port,()=>{
    console.log(`server is running port no ${port}`);

});