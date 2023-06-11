import { UnAuthorisedError } from "../errors/errors.js"
import { verifyJwt } from "../utils/jwt.js"

export const verifyUser = async (req, res, next) => {
  verifyJwt(req, res, next, ()=>{
    next()
  })
}

export const verifyAdmin = async (req, res, next) => {
  verifyJwt(req, res, next, () => {
    if(req.user.isAdmin){
      next()
    } else {
      res.status(403).send("This route is forbiden.")
    }
  })
}