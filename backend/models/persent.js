import mongoose, { Schema } from "mongoose";
import generateUniqueID from "../utils/GenrateUniqueId.js";

const persentSchema = Schema({
  _id : {
    type : mongoose.Types.ObjectId,
  },
  persent : {
    type : Boolean,
    default : false
  }
})

export default  new mongoose.model("Persent", persentSchema)