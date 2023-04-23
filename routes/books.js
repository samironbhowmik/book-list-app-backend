const bookModel = require("../models/book")

const route = require("express").Router()

//adding books
route.post("/books", async(req,res)=>{
    try {
        const {title, author, isbn, publisher, genre} = req.body
        // console.log(isbn, publisher);
        const book = await bookModel.create({
            title:title,
            author:author,
            isbn:isbn,
            publisher:publisher,
            genre:genre
        })
        res.json({
            status:"success",
            book
        })
    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})

//getting books
route.get("/books", async(req,res)=>{
    try {
        const {id} = req.params
        const book = await bookModel.find({id:id})
        res.json({
            status:"success",
            book
        })
    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})

//updating books
route.put("/books/:id", async(req,res)=>{
    try {
        const id = req.params.id
        const {title, author, isbn, publisher,genre} = req.body
        const edit = {
            title:title,
            author:author,
            isbn:isbn,
            publisher:publisher,
            genre:genre
        }
        const books = await bookModel.findByIdAndUpdate( id, edit, {new:true})
        res.json({
            status:"success",
            books
        })
    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})

//deleting
route.delete("/books/:id", async(req,res)=>{
    try {
        const id = req.params.id
        const book = await bookModel.findByIdAndDelete(id)
        res.json({
            status:"success"
        })
    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})

module.exports = route