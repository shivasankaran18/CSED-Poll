import express from "express"
import { pollCreate } from "../controllers/pollController";

const pollRouter = express.Router();

pollRouter.post("/create",pollCreate);

export {pollRouter}