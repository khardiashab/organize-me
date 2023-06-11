import mongoose, { Schema } from "mongoose";

const subSchema = Schema({
  noteId: { // Use notesId instead of _id for each note
    type: Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId,
  },
  title : {
    type : String,
    required : [true, "Enter title"]
  },
  photoId : String,
  photoUrl : {
    type : String,
    required : [true, "Enter the image"]
  },
  bookmark : {
    type : Boolean,
    default : false
  },
  views : {
    type : Number,
    default : 0
  }
}, {_id : false})

const newSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    unique : true
  },
  notes : [{
   type : subSchema
  }]
})

const Notes =  mongoose.model("NotesCollection", newSchema)
export default Notes
