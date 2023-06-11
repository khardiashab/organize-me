import TaskList from "../models/taskList.js";
import generateUniqueObjectId from "../utils/GenrateUniqueId.js";

export const getTodayList = async (req, res, next) => {
  try {
    let date = new Date()

    let userId = req.user._id
    let id = generateUniqueObjectId(userId, date)
    let result = await TaskList.findById(id)
    res.status(200).json({ data: result?.list })
  } catch (error) {
    next(error)
  }
}
export const getList = async (req, res, next) => {
  try {
    const { day, month, year } = req.query
    let date = new Date(Number(year), Number(month), Number(day))
    // Convert the date to Indian Standard Time (IST)
    date.setUTCHours(date.getUTCHours() + 5); // Add 5 hours for IST
    date.setUTCMinutes(date.getUTCMinutes() + 30); // Add 30 minutes for IST
    let userId = req.user._id
    const id = generateUniqueObjectId(userId, date)
    let result = await TaskList.findById(id)
    res.status(200).json({ data: result?.list })
  } catch (error) {
    next(error)
  }
}


