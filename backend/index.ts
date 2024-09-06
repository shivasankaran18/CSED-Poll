import express from "express"
import cors from "cors"
import { studentRouter } from "./routes/studentRoute";
import { adminRouter } from "./routes/adminRoute";
import { pollRouter } from "./routes/pollRoute";
import { PrismaClient } from "@prisma/client";

import { error } from "console";


const app = express();
const prisma = new PrismaClient();
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
app.use("/api/poll",pollRouter)

app.delete("/delete",async(req,res)=>{
    try{
        const deleted = await prisma.oTPRequest.deleteMany({
          
        })
        return res.json({message:"Deleted"})
    }catch(er){
        console.log(er)
        return res.json({message:er})
    }
})

app.get("/check",(req,res)=>{
    return res.send("running")
})











