import mongoose, { Schema }  from "mongoose";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import { createJwt } from "../utils/jwt.js";

const UserSchema = new Schema({
  username : {
    type : String,
    required : [true, "Please give a username."],
    minlength : [3, "Name would be more than 3 letters"],
    maxlength : [30, "Name would be less than 30 letters."]
  },
  email : {
    type : String,
    required : [true, "Please give a email."],
    unique : true
  },
  password : {
    type : String,
    required : [true, "Please give a password."],
  },
  isAdmin : {
    type : Boolean,
    default: false
  }, 
  createdAt : {
    type : Date,
    default : new Date()
  }
})

UserSchema.pre("save", hashPassword)

// make create jwt method 
UserSchema.methods.createJwt = createJwt


// make compare password mthod
UserSchema.methods.comparePassword = comparePassword

const User = mongoose.model("User", UserSchema)
export default User