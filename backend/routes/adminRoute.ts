import express from "express"
import { adminLogin, adminRegister } from "../controllers/adminController";
import { adminCompletedPolls, adminOngoingPolls } from "../controllers/pollController";
import { authMiddleWare } from "../middlewares/auth";

const adminRouter = express.Router();

adminRouter.post("/login",adminLogin)
adminRouter.post("/register",adminRegister)





adminRouter.get("/ongoing",authMiddleWare,adminOngoingPolls)
adminRouter.get("/completed",authMiddleWare,adminCompletedPolls)
export {adminRouter}