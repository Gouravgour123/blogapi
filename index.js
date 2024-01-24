const express = require("express");
const app = express();
const cors = require("cors")
require("./mongoose")
const models = require("./Models/blogModel");
const { upload } = require("./multer");
// const { model } = require("mongoose");
app.use(express.json())
app.use(cors())
app.use(express.static("public"))

const PORT = 5000;


app.post("/", upload, async (req,res)=>{
    const data = await models({
        name:req.body.name,
        image:"http://localhost:5000/uploads/"+req.file.filename
    });
    console.log(data)
    const result = await data.save()
res.send(result)
});

app.get("/",  async (req,res)=>{
    const data =  await models.find()
    
    res.send(data)
})


app.put('/update',upload,async (req,res)=>{
    const data =await models.updateOne({name:req.body.name},{$set:{name:req.body.name,image:req.file.filename}})
    // console.log(data)
    res.send(data)
})


app.delete('/delete',upload, async (req,res)=>{
    const data = await models.deleteOne({name:req.body.name})
    console.log(data)
    res.send(data)
})


app.listen(PORT, ()=>{
    console.log(`server is running at ${PORT}`)
});

