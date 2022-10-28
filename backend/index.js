const express = require("express")
const cors = require("cors")
const connectToMongoose = require("./db")
const bodyParser = require('body-parser')
const app = express()
require("dotenv").config()
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
connectToMongoose()
// ------------ routes
app.use("/api" , require("./routes/notes"))
app.use("/api" , require("./routes/user"))
// ------------ routes
const port = process.env.PORT || 5000 
app.listen(port , ()=>{
    console.log(`Running on Port ${port} 👍`)
})



// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJDdXN0b21lciI6eyJOYW1lIjoiZGl2eWFuc2hpIG1laHJhIiwiRW1haWwiOiJkaXZ5YW5zaGltZWhyYUBnbWFpbC5jb20iLCJSb2xlIjoiY3VzdG9tZXIiLCJQcm9maWxlUGljIjoieC5qcGcifSwiaWF0IjoxNjY1MTYzNDI0LCJleHAiOjE2NjUyNDk4MjR9.JS44ceLTv_8Du4tGCZgXKdW1r-dP5jX3ytbuTWSksEI