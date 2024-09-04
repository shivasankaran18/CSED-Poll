import { PrismaClient } from "@prisma/client";
import { createPoll } from "../zod";

const prisma = new PrismaClient();


export const pollCreate = async(req:any,res:any) =>{
    try{
        const body = req.body;
        const parsing = createPoll.safeParse(body);
        if(!parsing.success){
            return res.json({success:false,message:"Type mismatch"})
        }
        if(body.type ==='scheduled'){
            const newPoll = await prisma.poll.create({
                data:{
                    title:body.title,
                    description : body.description,
                    Instant: false,
                    stdate:body.stdate,
                    sttime:body.sttime,
                    type:body.type,
                    count:0,
                    createdby:body.email,
                }
            })
            if (body.options.length > 0) {
                const pollOptionsData = body.options.map((option: string,index:number) => ({
                  name: option,
                  reason: body.reasonsNeeded[index],
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
              const pollOptionsData = body.options.map((option: string,index:number) => ({
                name: option,
                reason: body.reasonsNeeded[index],
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

export const adminOngoingPolls =async(req:any,res:any)=>{
    try{
        const polls=await prisma.poll.findMany({
            where:{
                completed:false,
                OR:[
                    {
                        Instant:true
                    },
                    {
                        Instant:false,
                        OR:[
                            {
                                stdate:{lt:new Date().toISOString().substring(0,10)},
                            },
                            {
                                stdate:new Date().toLocaleDateString(),
                                sttime:{lte:new Date().toTimeString().split(" ")[0]}
                            }
                        ]   
                    }
                ]
            },
            include:{
                polled:true,
                options:true
    
            },
        })
        return res.status(200).json({polls})
    }
    catch(err){
        return res.status(500).json({msg:"error"})
    }
}

export const adminCompletedPolls=async(req:any,res:any)=>{

    try{

        const polls=await prisma.poll.findMany({
            where:{
                completed:true
            },
            include:{
                polled:true,
                options:true
            }
        })

        return res.status(200).json({polls})
    }
    catch(err){
        return res.status(500).json({msg:"error"})
    }
}







