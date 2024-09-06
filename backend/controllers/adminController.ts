import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client"
import { adminSignIn, adminSignUp } from "../zod";

const prisma = new PrismaClient();

const createToken = (id:any)=>{
    return jwt.sign({id},process.env.JWT_SECRET || "");
}

const adminRegister = async(req:any,res:any) =>{
    try{
        const body = req.body;
        console.log(body)
        const parsing = adminSignUp.safeParse(body);
        if(!parsing.success){
            return res.status(500).json({message:"Type mismatch"});
        }
        const password = body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);
        const newAdmin = await prisma.admin.create({
            data:{
                email:body.email,
                name:body.name,
                password:hashedPass,
                dept:body.dept,
                section:body.section
            }
        })
        const token = createToken(body.email);
        return res.status(200).json({success:true,message:"Admin Created",token:"Bearer "+token})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:err});
    }
}

const adminLogin = async(req:any,res:any) =>{
    try{
        const body = req.body;
        const parsing = adminSignIn.safeParse(body);
        if(!parsing.success){
            return res.status(500).json({success:false,message:"Type mismatch"})
        }
        const admin = await prisma.admin.findUnique({
            where:{
                email:body.email
            },select:{
                password:true
            }
        })
        if(!admin){
            return res.status(500).json({success:false,message:"Admin not found"})
        }
        const verifyPass = await bcrypt.compare(body.password,admin.password);
        if(!verifyPass){
            return res.status(500).json({success:false,message:"Invalid Password"})
        }
        const token = createToken(body.email);
        return res.status(200).json({success:true,token:"Bearer "+token});
    }
    catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:err})
    }
}

export {adminLogin,adminRegister}
