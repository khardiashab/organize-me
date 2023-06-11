import User from "../models/user.js"
export default async(req, res, next)=>{
  const user = await User.find()
  req.user = user[0]
  next()
}