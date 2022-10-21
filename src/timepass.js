

const bcrypt=require("bcryptjs");


const securePass = async(pass)=>{

    const passhash=await bcrypt.hash(pass,10);
    console.log(passhash);

}

securePass("prerana");