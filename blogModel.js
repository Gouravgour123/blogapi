const mongoose = require("mongoose")

const blogSchema =new mongoose.Schema({
   name:String,
   image:String
})
const blogModel = mongoose.model("student",blogSchema)

module.exports =  {blogModel}