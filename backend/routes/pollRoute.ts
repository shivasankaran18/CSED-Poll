import express from "express"
import { deletePoll, pollCreate, viewDetails } from "../controllers/pollController";
import { authMiddleWare } from "../middlewares/auth";

const pollRouter = express.Router();

pollRouter.post("/create",authMiddleWare,pollCreate);
pollRouter.get("/details",authMiddleWare,viewDetails)
pollRouter.post("/delete",authMiddleWare,deletePoll)

export {pollRouter}