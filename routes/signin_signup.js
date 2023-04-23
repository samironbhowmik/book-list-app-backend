const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const route = require("express").Router()

route.post("/signup", async(req,res)=>{
    try {
        const {email, password, confirmPassword} = req.body
        const existingUser = await userModel.findOne({email:email})
        if(existingUser){
            return res.json({
                status:"failed",
                message:"user exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await userModel.create({
            email:email,
            password:hashedPassword,
            confirmPassword:hashedPassword
        })
        const token = await jwt.sign({email:user.email, id:user._id}, process.env.MY_JWT)
        res.json({
            status:"success",
            user,
            token
        })
    } catch (error) {
        res.json({
            status:"failed",
            message:error.message
        })
    }
})

route.post("/signin", async(req,res)=>{
    try {
        const {email,password} = req.body
        const existingUser = await userModel.findOne({email:email})
        if(!existingUser){
            return res.json({status:"failed", message:"user not found"})
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if(!matchPassword){
            return res.json({status:"failed" , message:"invalid user"})
        }
        const token = await jwt.sign({email:existingUser.email, id:existingUser._id}, process.env.MY_JWT)
        res.json({
            status:"success",
            existingUser,
            token
        })
    } catch (error) {
        res.json({
            status:"success",
            message:error.message
        })
    }
})

module.exports = route