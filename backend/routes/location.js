import express from "express"
import { getLocation, createLocation, updateLocation, deleteLocation } from "../route_helper/locationHelper.js"
import { verifyUser } from "../middlwares/authentication.js"

const locationRouter = express.Router()

locationRouter.route("/").get(verifyUser, getLocation).post(verifyUser, createLocation).delete(verifyUser,  deleteLocation).put(verifyUser, updateLocation)

export default locationRouter