import { PrismaClient } from "@prisma/client";
import { createPoll } from "../zod";
import { equal } from "assert";
import { pollMailPortion, transporter } from "../lib/util";

const prisma = new PrismaClient();
const format = (date: string) => {
    const dateObj = new Date(date);
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    console.log(formattedDate);
    return formattedDate
  }


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
                    type:body.polltype,

                    count:0,
                    createdby:req.headers.id,
                    autoDelete:body.autoDelete
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
              await sendMail(newPoll.title)
              return res.status(200).json({message:"Poll Created successfully"})

        }
        else{
            const newPoll = await prisma.poll.create({
                data:{
                    title:body.title,
                    description : body.description,
                    Instant: true,
                    type:body.polltype,
                    count:0,
                    createdby:req.headers.id,
                    stdate:format(new Date().toISOString().substring(0,10)),
                    sttime:new Date().toTimeString().substring(0,5),
                    autoDelete:body.autoDelete
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
              await sendMail(newPoll.title)
              return res.status(200).json({message:"Poll Created successfully"})

        }
   

    }
    catch(err){
        console.log(err);
        return res.status(501).json({message:err})
    }
}


async function sendMail(title:string){

    try{
        const students=await prisma.student.findMany({})

        students.map(async (x)=>{
            const mail=pollMailPortion(x.email,title,x.name);
            await transporter.sendMail(mail);
    
    
    
        })
    }
    catch(err){
        console.log(err)
    }

   





};

export const adminOngoingPolls =async(req:any,res:any)=>{
    try{
        const polls=await prisma.poll.findMany({
            where:{
                completed:false,
                OR:[
                   
                   {
                        stdate:{lt:format(new Date().toISOString().substring(0,10))},
                    },
                    {
                        stdate:format(new Date().toISOString().substring(0,10)),
                        sttime:{lte:new Date().toTimeString().substring(0,5)}
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


export const viewDetails=async(req:any,res:any)=>{

    try{

        const pollid=parseInt(req.headers.pollid)

        const details=await prisma.poll.findUnique({
            where:{
                id:pollid
            },
            include:{
                polled:{
                    include:{
                        student:true
                    }
                },
                options:true
            }
        })
        const polledids=details?.polled.map((x)=>x.studrollno)
        const notpolled=await prisma.student.findMany({
            where:{
                rollno:{notIn:polledids}
            }
        })


        return res.status(200).json({details:{polled:details,notpolled}})


    }
    catch(err){
        return res.status(500).json({msg:"erro"})

    }

    



}

export const deletePoll=async(req:any,res:any)=>{
    try
    {
        const body=req.body

        await prisma.poll.delete({
            where:{
                id:body.pollid
            }
        })

        return res.status(200).send({msg:"done"})
    }
    catch(err){
        return res.status(500).send({msg:"error"})
    }
   


}







