import express from "express"
import { adminLogin, adminRegister } from "../controllers/adminController";
import { ongoingPolls } from "../controllers/pollController";

const adminRouter = express.Router();

adminRouter.post("/login",adminLogin)
adminRouter.post("/register",adminRegister)

















adminRouter.get("/ongoing",ongoingPolls)

export {adminRouter}