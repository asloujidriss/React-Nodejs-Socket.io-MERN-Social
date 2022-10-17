const express = require("express")
const app = express()
const dotenv = require("dotenv")
const morgan = require("morgan")
const helmet = require("helmet")
const cors = require("cors")
const Database = require("./config/database")
const multer= require("multer")
const path = require("path")

var corsOptions ={
    origin:'http://localhost:3000',
   optionsSuccessStatus: 200
}



app.use("/images", express.static(path.join(__dirname, "public/images")));

//middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan("tiny"))
app.use(cors(corsOptions))



const storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/images')
    },
    filename:(req,file,cb)=>{
      cb(null,req.body.name)  
    }
})

const upload = multer({storage})
app.post("/upload", upload.single("file"),(req,res)=>{
    try {
        return res.status(200).json("File uploaded Successfuly") 
        
    } catch (error) {
        console.log(err)
    }
})


const userRoute = require("./routes/UserRoute")
const authRoute = require("./routes/authRouter")
const postRoute = require("./routes/PostsRouter")



app.use("/Users", userRoute)
app.use("/Auth", authRoute)
app.use("/Posts",postRoute)




app.listen(5009,()=>{
    console.log("server working on http://localhost:5009")
})