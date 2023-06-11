import TaskList from "../models/taskList.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

export default asyncWrapper(async (req, res, next) => {
  if (req.cookies?.dailyList !== "true") {
    let userId = req.user._id;
    let date = new Date().toDateString();
    date = new Date(date);
    let result = await TaskList.findOneAndUpdate(
      { userId, date },
      { list: [] },
      { upsert: true }
    );

    const nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);

    res.cookie("dailyList", "true", {
      expires: nextDay,
      path: "/api/user/tasklist",
    });
  }
  return next();
});
