import e from "express"
import Notes from "../models/notes.js"

export const getHomepage = async(req, res, next) =>{
  try {
    let userId = req.user._id
    let notes = await Notes.findOne({userId})
    res.status(200).json(notes)

  } catch (error) {
    next(error)
  }
}


export const searchBar = async (req, res, next)=>{
  try {
    let userId = req.user._id
    let search = req.body.search
    let result = await Notes.findOne({userId, "notes.title" :{$regex : search, option : "i" }})



    
    res.send(200).json({"list": ["UseState hook", "UseState hook uses", "usestate hook example", "Usestate heels", "useses of it."]})

  } catch (error) {
    next(error)
  }
}