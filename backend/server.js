require("dotenv").config(); 
const app = require("./src/app")
const connectToDB = require("./src/config/database");


connectToDB()
const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON PORT NO ${PORT} `)
})



