import cron from "node-cron";
import User from "../models/user.js";
import createTasklist from "./createTasklist.js";
import createPersent from "./createPersent.js";


const task = cron.schedule("0 0 * * *", async ()=>{
  try {
    const users = await User.find().select("_id")
    if(users.length > 0){
      for (const user of users){
       createTasklist(user._id)
       createPersent(user._id)
     }
    }
  } catch (error) {
    console.log(error)
  }
})

// Start the cron job
task.start()

