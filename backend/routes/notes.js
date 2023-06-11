import express from "express";
import { SearchNotes, addNotes, deleteNote, getNote, paginationNotes, updateNote, updateNoteViewCount } from "../route_helper/notes.js";
import { verifyUser } from "../middlwares/authentication.js";
// import multer from "multer";
import multerUploads from "../utils/multer.js";

const notesRouter = express.Router()
notesRouter.route("/").post(verifyUser, multerUploads, addNotes)
notesRouter.route("/search").get(verifyUser, SearchNotes)
notesRouter.route("/note/:noteId/:photoId").get(verifyUser, getNote)
.put(verifyUser, updateNote)
.delete(verifyUser, deleteNote)
.patch(verifyUser, updateNoteViewCount)
notesRouter.route("/").get(verifyUser, paginationNotes)

export default notesRouter