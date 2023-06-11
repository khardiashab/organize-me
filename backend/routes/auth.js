import express from "express"
import { BadRequestError, InvalidError } from "../errors/errors.js"
import  User  from "../models/user.js"
import createTasklist from "../utils/createTasklist.js"
const authRouter = express.Router()

authRouter.route("/register").post(async(req, res, next)=>{

  let {username, email, password} = req.body
  try {
    if(!username || !email || !password){
      throw BadRequestError("Please provide all details.")
    }
    let user = await User.create(req.body)
    await createTasklist(user._id)
    let token = await user.createJwt()

    // for apis
    res.cookie("access_token", token, {
      httpOnly : true,
      maxAge : 1*86400000
    })
    
    return res.status(200).json({ token})
    
  } catch (error) {
  
    next(error)
  }

})
authRouter.route("/login").post(async(req, res, next) =>{
  try {
    let {email , password} = req.body
    if(!email || !password ){
      throw BadRequestError("Please Provide all details.")
    }
    let user = await User.findOne({email})
    if(!user){
      throw InvalidError("Invalid email.")
    }
    console.log(user)
  
    let isUser = await user.comparePassword(password)
    if(!isUser){
      throw( InvalidError("Invalid password."))
    } 
  
    // login
    let token = await user.createJwt()

    // for apis 
    res.cookie("access_token", token, {
      httpOnly : true,
      maxAge : 1*86400000
    })

    return res.status(200).json({token})
  } catch (error) {
    next(error)
  }



})

export default authRouter