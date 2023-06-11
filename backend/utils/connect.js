import mongoose from "mongoose"

export const dbConnection = async ()=>{
  try {
    mongoose.set("strictQuery", true)
    await mongoose.connect("mongodb://localhost:27017/ReactLibrary")
    console.log("mongodb connected...")
  } catch (error) {
    console.log(error.message)
    console.log(error.stack)
  }
}