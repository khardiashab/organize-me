import express from "express"
import { addTask, deleteTask, updateTask } from "../route_helper/task.js"
import { getList, getTodayList } from "../route_helper/list.js";
import { verifyUser } from "../middlwares/authentication.js";


const taskRouter = express.Router()


// addTask, deleteTask and updateTask
taskRouter.route("/task/").put(verifyUser, addTask)
taskRouter.route("/task/:task_id").delete(verifyUser, deleteTask).patch(verifyUser, updateTask)

taskRouter.route("/").get(verifyUser, getTodayList)
taskRouter.route("/query?").get(verifyUser, getList)


export default taskRouter