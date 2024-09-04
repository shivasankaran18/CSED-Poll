import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { studentpoll, studentSignin, studentSignUp } from "../zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createToken = (id:any)=>{
    return jwt.sign({id},process.env.JWT_SECRET || "");
}

const studentLogin = async(req: any,res: any)=>{
    try{
        const body = req.body;
        const parsing = studentSignin.safeParse(body);
        if(!parsing.success){
            return res.json({success:false,message:"Type mismatch"})
        }
        const student = await prisma.student.findUnique({
            where:{
                rollno:body.rollno
            },select:{
                password:true
            }
        })
        if(!student){
            return res.json({success:false,message:"Student not found"})
        }
        const verifyPass = await bcrypt.compare(body.password,student.password);
        if(!verifyPass){
            return res.json({success:false,message:"Invalid Password"})
        }
        const token = createToken(body.rollno);
        return res.json({success:true,token:"Bearer "+token});
    }
    catch(err){
        console.log(err);
        return res.json({success:false,message:err})
    }
}


const studentRegister = async(req:any,res:any)=>{
    try{
        const body = req.body;
        const parsing = studentSignUp.safeParse(body);
        if(!parsing.success){
            return res.json({success:false,message:"Type mismatch"});
        }
        const password = body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);
        const newStudent = await prisma.student.create({
            data:{
                name:body.name,
                rollno:body.rollno,
                password:hashedPass,
                dept:body.dept,
                section:body.section,
                year:body.year,
                contactno:body.contactno,
            }
        })
        const token = createToken(body.rollno);
        return res.json({success:true,message:"Student Created Successfully",token:"Bearer "+token});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:err})
    }
}

const studentPoll = async(req:any,res:any)=>{
    try{
        const body = req.body;
        const parsing = studentpoll.safeParse(body);
        if(!parsing.success){
            return res.json({success:false,message:"Type mismatch"});
        }
        if(body.reason == null){
            const polled = await prisma.polled.create({
                data:{
                    pollid:body.pollid,
                    studrollno:req.headers.id,
                    option:body.option
                }
            })
            return res.status(200).json({message:"Polled"})
        }else{
            const polled = await prisma.polled.create({
                data:{
                    pollid:body.pollid,
                    studrollno:req.headers.id,
                    reason:body.reason,
                    option:body.option
                }
            })
            return res.status(200).json({message:"Polled"})
        }
    }catch(err){
        console.log(err);
        return res.status(501).json({message:err})
    }
}

export const getNotPolled = async(req:any,res:any)=>{
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
            }
        })
        const pollIds = polls.map(poll => poll.id);
        const polledPolls = await prisma.polled.findMany({
            where: {
                studrollno: req.headers.id,
                pollid: { in: pollIds }
            }
        })
        console.log(polls)
        const polledPollIds = polledPolls.map(polled => polled.pollid);
        const polled = polls.filter(poll => polledPollIds.includes(poll.id));
        const unpolled = polls.filter(poll => !polledPollIds.includes(poll.id));
        return  res.status(200).json({polled:polled,unpolled:unpolled})
    }catch(err){
        console.log(err);
        return res.status(501).json({message:err})
    }
}


export {studentRegister,studentLogin,studentPoll}