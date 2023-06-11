import express from "express";
import User from "../models/user.js";
import { verifyUser } from "../middlwares/authentication.js";


const userRouter = express.Router()

userRouter.get("/", verifyUser, async(req, res, next)=>{
try {
  let userId = req.user._id
  let user = await User.findById(userId).select("createdAt")
  res.status(200).json({data : user.createdAt})
} catch (error) {
  next(error)
}
})


export default userRouter