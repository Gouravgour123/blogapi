const express = require("express");
const app = express();
const multer = require("multer")
const cors = require("cors")
require("./mongoose")
const models = require("./blogModel")
app.use(express.json())
app.use(cors())
app.use(express.static("public"))

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null,"public/uploads/")
    },
    filename: (req, file, cb)=>{
        cb(null,file.originalname);
    }
});
const upload = multer({storage:storage}).single("image");

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
app.listen(5000);



// app.get("/",  (req,res)=>{
    
//     res.send("data")
// })
// app.listen(4000);