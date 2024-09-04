import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { studentpoll, studentSignin, studentSignUp } from "../zod";
import { PrismaClient } from "@prisma/client";
import { builtinModules } from "module";
import { error } from "console";

const prisma = new PrismaClient();

const createToken = (id:any)=>{
    return jwt.sign({id},"student");
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
        return res.status(200).json({token:token});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:err})
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
        return res.json({success:true,message:"Student Created Successfully",token:token});
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
                    studrollno:body.studrollno,
                    option:body.option
                }
            })
            return res.status(200).json({message:"Polled"})
        }else{
            const polled = await prisma.polled.create({
                data:{
                    pollid:body.pollid,
                    studrollno:body.studrollno,
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

const studCompletedPolls =async(req:any,res:any)=>{
    try{
        const data=await prisma.polled.findMany({
            where:{
                studrollno:req.headers.rollno
            },
            select:{
                poll:true
            }
        }) 
    }
    catch(er){
        console.log(er);
        res.status(501).json({message:er})
    }
}

export {studentRegister,studentLogin,studentPoll,studCompletedPolls}
