import express from "express"
import { adminLogin, adminRegister } from "../controllers/adminController";
import { adminCompletedPolls, adminOngoingPolls } from "../controllers/pollController";

const adminRouter = express.Router();

adminRouter.post("/login",adminLogin)
adminRouter.post("/register",adminRegister)

















adminRouter.get("/ongoing",adminOngoingPolls)
adminRouter.get("/completed",adminCompletedPolls)
export {adminRouter}