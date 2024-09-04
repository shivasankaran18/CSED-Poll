import {  PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();

const createPoll = async(req:any,res:any) =>{
    try{
        const body = req.body;
        
    }
    catch{

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
                                stdate:new Date().toISOString().substring(0,10),
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