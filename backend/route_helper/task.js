import TaskList from "../models/taskList.js";
import generateUniqueObjectId from "../utils/GenrateUniqueId.js";


export const addTask = async (req, res, next) => {
  try {
    let date = new Date()
    let userId = req.user._id
    let id = generateUniqueObjectId(userId, date)
    let updatedTaskList = await TaskList.findByIdAndUpdate(id,
      {
        $push: { list: req.body },
      },
      { 
        "new": true,
        
       }).select("list")
    res.status(200).json({data :updatedTaskList?.list})
  } catch (error) {
    next(error)
  }
}
export const deleteTask = async (req, res, next) => {
  try {
    let date = new Date()
    let userId = req.user._id
    let id = generateUniqueObjectId(userId, date)
    let deletedTaskList = await TaskList.findByIdAndUpdate(id, 
    {
      $pull: { list: { _id: req.params.task_id } }
    },
      { 'new': true })
    res.status(200).send()
  } catch (error) {
    next(error)
  }
}

// update task 
export const updateTask = async (req, res, next) => {
  try {
    let date = new Date()
    let userId = req.user._id
    let id = generateUniqueObjectId(userId, date)
    let updatedTaskList = await TaskList.findOneAndUpdate({_id :id, 'list._id' : req.params.task_id},
      {
        $set: { "list.$.done" : true },
      },
      {'new' : true})
    res.status(200).json({data : updatedTaskList})
  } catch (error) {
    next(error)
  }
}

