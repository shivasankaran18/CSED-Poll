import express from "express"
import {   getPolls, studentChangePassword, studentChangePasswordLogin, studentChangePasswordOTP, studentLogin, studentPoll, studentRegister } from "../controllers/studentController";
import { authMiddleWare } from "../middlewares/auth";

const studentRouter = express.Router();

studentRouter.post("/login",studentLogin);
studentRouter.post("/register",studentRegister);
studentRouter.post("/poll",authMiddleWare,studentPoll)
studentRouter.get("/polls",authMiddleWare,getPolls)
studentRouter.post("/changepassword/login",studentChangePasswordLogin)
studentRouter.post("/changepassword/otp",studentChangePasswordOTP)
studentRouter.post("/changepassword/password",studentChangePassword)

export {studentRouter}