import multer from "multer"

const Storage = multer.memoryStorage()

const  multerUploads = multer({storage : Storage}).single("notes")
export default multerUploads