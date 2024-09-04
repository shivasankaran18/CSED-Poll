import express from "express"
import cors from "cors"
import { studentRouter } from "./routes/studentRoute";
import { adminRouter } from "./routes/adminRoute";

const app = express();

app.use(express.json())
app.use(cors())
const BACKEND_PORT = process.env.PORT


app.get("/test",async(req,res)=>{


    
})

app.listen(BACKEND_PORT,()=>{
    console.log("Running")
})

app.use("/api/student",studentRouter)
app.use("/api/admin",adminRouter)