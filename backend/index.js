import express  from "express";
import dotenv from "dotenv"
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import "express-async-errors";
import {dbConnection} from "./utils/connect.js"
import locationRouter from "./routes/location.js";
import taskRouter from "./routes/tasks.js";
import notesRouter from "./routes/notes.js";
import persentRouter from "./routes/persent.js";
import authRouter from "./routes/auth.js";
import { notFound } from "./middlwares/not-found.js";
import { errorHandler } from "./middlwares/errorHandler.js";
import "./utils/cron.js";
import userRouter from "./routes/user.js";
const app = express();

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/user/location",  locationRouter);
app.use("/api/user/tasklist", taskRouter);
app.use("/api/user/notes", notesRouter);
app.use("/api/user/persent", persentRouter);


// error handler 
app.use(errorHandler);
app.use(notFound);

app.listen(5555, async()=>{
  try {
    await dbConnection()
    console.log("backend connected...")  
  } catch (error) {
    console.log(err)
  }
})
