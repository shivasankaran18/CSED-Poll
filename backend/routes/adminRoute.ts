import express from "express"
import { adminLogin, adminRegister } from "../controllers/adminController";

const adminRouter = express.Router();

adminRouter.post("/login",adminLogin)
adminRouter.post("/register",adminRegister)

export {adminRouter}