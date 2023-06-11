import express from "express";
import { getPersent, getTodayPersent, updatePersent } from "../route_helper/persent.js";
import { verifyUser } from "../middlwares/authentication.js";

const persentRouter = express.Router()
persentRouter.route("/").get(verifyUser, getTodayPersent).put(verifyUser, updatePersent)
persentRouter.route("/query?").get(verifyUser, getPersent)

export default persentRouter