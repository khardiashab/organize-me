import mongoose, { Schema } from "mongoose";
import generateUniqueID from "../utils/GenrateUniqueId.js";

const task = Schema({
  name : {
    type : String,
    required : [true, "Enter Task"]
  },
  done : {
    type : Boolean,
    default : false
  },
}, {timestamps : true})


const taskList = Schema({
  _id : {
    type : mongoose.Types.ObjectId
  },
  list : {
    type : [task],
    default : []
  }
})



const TaskList = new mongoose.model("DailyCollection", taskList)
export default TaskList