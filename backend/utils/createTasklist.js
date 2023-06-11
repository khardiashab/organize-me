import TaskList from "../models/taskList.js";
import generateUniqueObjectId from "./GenrateUniqueId.js";

async function createTasklist(userId){
  const date = new Date()
  const id = generateUniqueObjectId(userId, date)
  let tasklist = new TaskList({
    _id : id,
    list : []
  })
  await tasklist.save()
}

export default createTasklist