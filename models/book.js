const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    title:String,
    author:String,
    isbn:String,
    publisher:String,
    genre:String,

})

const bookModel = mongoose.model("bookModel", bookSchema)
module.exports = bookModel