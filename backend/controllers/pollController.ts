import { any } from "zod";
import { createPoll } from "../zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const pollCreate = async(req:any,res:any) =>{
    try{
        const body = req.body;
        const parsing = createPoll.safeParse(body);
        if(!parsing.success){
            return res.json({success:false,message:"Type mismatch"})
        }
        if(body.instant == false){
            const newPoll = await prisma.poll.create({
                data:{
                    title:body.title,
                    description : body.description,
                    Instant: body.instant,
                    stdate:body.stdate,
                    sttime:body.sttime,
                    type:body.type,
                    count:0,
                    createdby:body.email
                }
            })
            if (body.options.length > 0) {
                const pollOptionsData = body.options.map((option: { name: string; reason: boolean }) => ({
                  name: option.name,
                  reason: option.reason,
                  count: 0,
                  pollid: newPoll.id,
                }));
          
                await prisma.pollOptions.createMany({
                  data: pollOptionsData,
                });
              }
            return res.status(200).json({message:"Poll created Successfully"})
        }
        else{
            const newPoll = await prisma.poll.create({
                data:{
                    title:body.title,
                    description : body.description,
                    Instant: body.instant,
                    type:body.type,
                    count:0,
                    createdby:body.email,
                }
            })
            if (body.options.length > 0) {
                const pollOptionsData = body.options.map((option: { name: string; reason: boolean }) => ({
                  name: option.name,
                  reason: option.reason,
                  count: 0,
                  pollid: newPoll.id,
                }));
          
                await prisma.pollOptions.createMany({
                  data: pollOptionsData,
                });
              }
            return res.status(200).json({message:"Poll Created successfully"})
        }
    }
    catch(err){
        console.log(err);
        return res.status(501).json({message:err})
    }
}


export {pollCreate}