const express = require("express");
const multer = require("multer")
const cors = require("cors")
const { blogModel } = require("./blogModel");
const app = express();
require("./mongoose")
app.use(express.json())
app.use(cors())
app.use(express.static("public"))
// const blog = require("./blogModel")

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"public/uploads/")
    },
    filename: (req, file, cb)=>{
        cb(null,file.originalname);
    }
});
const upload = multer({storage:storage}).single("image");

app.post("/",async (req,res)=>{
    upload (req,res,async(err)=>{

    
    const newImage = new blogModel({
        name:req.body.name,
        image:"http://localhost:4000/uploads/"+req.file.filename
    })
    const result = await newImage.save()
    res.send(result)
})
})

app.post("/", async (req,res)=>{
    const data =  await blogModel(req.body)
    const result = await data.save();

    console.log(result)
    res.send(result)
}).listen(4000);