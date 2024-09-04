import express from "express"
import { studentLogin, studentRegister } from "../controllers/studentController";

const studentRouter = express.Router();

studentRouter.post("/login",studentLogin);
studentRouter.post("/register",studentRegister);

export {studentRouter}