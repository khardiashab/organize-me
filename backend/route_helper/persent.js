import Persent from "../models/persent.js";
import generateUniqueObjectId from "../utils/GenrateUniqueId.js";
import asyncWrapper from "../utils/asyncWrapper.js";

export const getTodayPersent = async (req, res, next) => {
  let date = new Date()
  let userId = req.user._id
  const id = generateUniqueObjectId(userId, date, "persent")
  const persent = await Persent.findById(id)
  res.status(200).json({ data: persent })
}

export const getPersent = async (req, res, next) => {
  const { day, month, year } = req.query
  let date = new Date(Number(year), Number(month), Number(day))
  // Convert the date to Indian Standard Time (IST)
  date.setUTCHours(date.getUTCHours() + 5); // Add 5 hours for IST
  date.setUTCMinutes(date.getUTCMinutes() + 30); // Add 30 minutes for IST
  let userId = req.user._id
  const id = generateUniqueObjectId(userId, date, "persent")
  const persent = await Persent.findById(id)
  res.status(200).json({ data: persent })
}
export const updatePersent = asyncWrapper(
  async (req, res, next) => {
    let userId = req.user._id
    let date = new Date()
    const id = generateUniqueObjectId(userId, date, "persent")
    const persent = await Persent.findByIdAndUpdate(id, {
      $set: { persent: true }
    }, { new: true })
    res.status(200).json({ data: persent })
  })
