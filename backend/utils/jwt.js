import jwt from "jsonwebtoken"
import customError from "../errors/customError.js"
import { InvalidError } from "../errors/errors.js"

async function createJwt() {
  let payload = { _id: this._id, name: this.username, isAdmin: this.isAdmin }
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}

async function verifyJwt(req, res, next) {
  try {
    let authHeader = req.headers.authorization;

    let access_token = req.cookies?.access_token;
    // for apis 
    if (access_token) {
      let payload = jwt.verify(access_token, process.env.JWT_SECRET)
      req.user = payload
      next()
    }

    else if (authHeader) {
      const token = authHeader.split(" ")[1]
      let payload = jwt.verify(token, process.env.JWT_SECRET)
      req.user = payload
      next()
    }

    else {
      res.status(402).json({ message: "Bad request. Not have a token.", success: false })
    }
  } catch (error) {
    // console.log(error)
    res.status(402).json({ message: "Invalid token.", success: false })
  }
  //   let payload = jwt.verify(token, process.env.JWT_SECRET)
  // return  payload
}

export { createJwt, verifyJwt }