const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./database/connectDB")
const signin_signup = require("./routes/signin_signup")
const books = require("./routes/books")
const logout = require("./routes/logout")
const cors = require("cors")

const app = express()
dotenv.config()
app.use(express.json())

app.use(cors())

app.use("/", signin_signup)
app.use("/", books)
app.use("/", logout)

app.listen(process.env.PORT, async(req,res)=>{
    await connectDB()
    console.log(`App is connected at port ${process.env.PORT}`);
})