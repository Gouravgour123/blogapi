const mongoose = require("mongoose")

const blogSchema =new mongoose.Schema({
   name:String,
   image:String
})
//  mongoose.model("students",blogSchema)

module.exports =  mongoose.model("students",blogSchema)
