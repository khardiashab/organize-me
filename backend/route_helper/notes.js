import { bufferUpload, deleteImage } from "../utils/cloudinary.js";
import Notes from "../models/notes.js";
import mongoose from "mongoose";

export const addNotes = async (req, res, next) => {
  try {
    let userId = req.user._id
    let title = req.body.title
    if (req.file) {
      const result = await bufferUpload(req.file.buffer)
      let photoId = result.public_id
      let photoUrl = result.url
      const newNote = {
        title,
        photoId,
        photoUrl
      }

      await Notes.updateOne(
        { userId },
        {
          $push: {
            notes: newNote
          }
        },
        { upsert: true }
      )

      res.status(200).json(
        {
          msg: "Note added"
        })
    } else {
      res.status(400).send("Upload image.")
    }
  } catch (error) {
    next(error)
  }
}

// search notes
export const SearchNotes = async (req, res, next) => {
  try {
    let search = req.query.q
    search = new RegExp(search)
    let userId = req.user._id
  const searchResults = await Notes.aggregate([
    {
      '$match': {
        'userId': mongoose.Types.ObjectId(userId)
      }
    }, {
      '$unwind': {
        'path': '$notes'
      }
    }, {
      '$match': {
        'notes.title': {
          '$regex': search, 
          '$options': 'i'
        }
      }
    },
    {
      $limit : 5
    },
     {
      '$project': {
        'notes.noteId': 1, 
        'notes.title': 1, 
        'notes.photoUrl': 1, 
        '_id': 0
      }
    }
  ]);

    console.log(searchResults)

    res.status(200).json({data : searchResults})

  } catch (error) {
    next(error)
  }
}


// pagination for the array
export const paginationNotes = async (req, res, next) => {
  try {
    const userId = mongoose.Types.ObjectId(req.user._id);
    const page = parseInt(req.query.page) || 1; // current page number
    const limit = parseInt(req.query.pageSize) || 5; // number of documents per page
    // const sortField = req.query.sortField || 'notes.noteId'; // sort field (default: notes._id)
    // const sortOrder = parseInt(req.query.sortOrder) || 1; // sort order (1: ascending, -1: descending)
    let result = await Notes.aggregate([
      {
        '$match': {
          'userId': userId
        }
      }, {
        '$unwind': {
          'path': '$notes'
        }
      }, {
        '$sort': {
          'notes.bookmark': -1, 
          'notes.views': -1, 
          'notes.noteId': -1
        }
      }, {
        '$facet': {
          'totalNotes': [
            {
              '$count': 'count'
            }
          ], 
          'notes': [
            {
              '$skip': (page -1 ) * limit
            }, {
              '$limit': limit
            }, {
              '$project': {
                '_id': 0, 
                'noteId': '$notes.noteId', 
                'title': '$notes.title', 
                'photoUrl': '$notes.photoUrl'
              }
            }
          ]
        }
      }
    ])
    result = result[0]
    const totalNotes = result.totalNotes[0].count
    const totalPages = Math.ceil(totalNotes/limit)
     res.status(200).json({
      notes: result?.notes,
      currentPage: page,
      totalPages: totalPages,
      totalNotes
    });
  } catch (error) {
    next(error)
  }
}

export const getNote = async (req, res, next) => {
  try {
    const query = { "notes.noteId": req.params.noteId };
    const data = await Notes.findOne({
      userId : req.userId,
      notes : {$elemMatch : {noteId  : req.params.noteId}}
    },
      {"notes.$" : 1}
    )
    res.status(200).json({ data })
  } catch (error) {
    next(error)
  }
}

export const deleteNote = async (req, res, next) => {
  try {
    const noteId = req.params.noteId
    const photoId = req.params.photoId
    const query = {
      userId : req.user._id,  
      "notes.noteId": noteId 
    };
    await deleteImage(photoId)
    await Notes.updateOne(
      query, 
      { $pull: { notes: { noteId: noteId } } },
    )
    res.status(200).send()
  } catch (error) {
    next(error)
  }
}

export const updateNote = async (req, res, next) => {
  try {
    const { title, bookmark } = req.body;
    const query = {userId: req.user._id, "notes.noteId": req.params.noteId };
    const update = {
      $set: {
        "notes.$.title": title,
        "notes.$.bookmark": bookmark,
      }
    }
    await Notes.updateOne(
      query, 
      update, 
    )
    res.status(200).json({ message : "data update" })
  } catch (error) {
    next(error)
  }
}

export const updateNoteViewCount = async (req, res) => {
try {
  await Notes.updateOne(
    { 'notes.noteId': req.params.noteId },
    { $inc: { "notes.$.views": 1 } }
  )
  res.status(200).send("View count updated.")
} catch (error) {
  next(error)
}
}





