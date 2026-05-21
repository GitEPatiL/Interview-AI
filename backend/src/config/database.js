const mongoose = require("mongoose");

const connectToDB =async ()=>{


    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to Database")
    }
    catch(err){
        console.log(`err:${err}`)
    }
}

module.exports= connectToDB;