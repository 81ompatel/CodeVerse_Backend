const mongoose = require("mongoose")
require("dotenv").config();
const DBconnection = ()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{

    }).catch((e)=>{
       console.log(e)
    })

}

module.exports = DBconnection;