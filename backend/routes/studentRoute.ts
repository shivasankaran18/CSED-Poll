import express from "express"
import {  getNotPolled, studentLogin, studentPoll, studentRegister } from "../controllers/studentController";
import { authMiddleWare } from "../middlewares/auth";

const studentRouter = express.Router();

studentRouter.post("/login",studentLogin);
studentRouter.post("/register",studentRegister);
studentRouter.post("/poll",authMiddleWare,studentPoll)
studentRouter.get("/notpolled",authMiddleWare,getNotPolled)

export {studentRouter}