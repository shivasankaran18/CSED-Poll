import express from "express"
import { studentLogin, studentPoll, studentRegister } from "../controllers/studentController";

const studentRouter = express.Router();

studentRouter.post("/login",studentLogin);
studentRouter.post("/register",studentRegister);
studentRouter.post("/poll",studentPoll)

export {studentRouter}