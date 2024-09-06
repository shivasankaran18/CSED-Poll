import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { studentchangepassword, studentchangepasswordlogin, studentchangepasswordotp, studentpoll, studentSignin, studentSignUp } from "../zod";
import { PrismaClient } from "@prisma/client";
import { builtinModules } from "module";
import { generateOTP, changeMailPortion, transporter,  } from "../lib/util";

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


  export const getCurrentISTTime = () => {
    const now = new Date();
  
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  

    const [{ value: day }, , { value: month }, , { value: year }, , { value: hour }, , { value: minute }, , { value: second }] = formatter.formatToParts(now);
 
    return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
  };

const createToken = (id:any)=>{
    return jwt.sign({id},process.env.JWT_SECRET || "");
}



const studentLogin = async(req: any,res: any)=>{
    try{
        const body = req.body;
        const parsing = studentSignin.safeParse(body);
        if(!parsing.success){
            return res.status(500).json({success:false,message:"Type mismatch"})
        }
        const student = await prisma.student.findUnique({
            where:{
                rollno:body.rollno
            },select:{
                password:true
            }
        })
        if(!student){
            return res.status(500).json({success:false,message:"Student not found"})
        }
        const verifyPass = await bcrypt.compare(body.password,student.password);
        if(!verifyPass){
            return res.status(500).json({success:false,message:"Invalid Password"})
        }
        const token = createToken(body.rollno);
        return res.status(200).json({success:true,token:"Bearer "+token});
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
                email:body.email
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
            return res.status(500).json({success:false,message:"Type mismatch"});
        }
        if(body.reason == null){
            const polled = await prisma.polled.create({
                data:{
                    pollid:body.pollid,
                    studrollno:req.headers.id,
                    option:body.option
                }
            })
            
           
        }else{
            const polled = await prisma.polled.create({
                data:{
                    pollid:body.pollid,
                    studrollno:req.headers.id,
                    reason:body.reason,
                    option:body.option
                }
            })
           
        }
        await prisma.$transaction(async (tx)=>{
            console.log("body" +body.pollid)
            const temp1=await tx.pollOptions.update({
                where:{
                    id:body.option 
                },data:{
                    count:{increment:1}
                }
            })
            console.log(temp1)
            const temp2=await tx.poll.update({
                where:{
                    id:body.pollid
                },
                data:{
                    count:{increment:1}
                }
            })
            if(temp2.count==4)
            {
                const temp3=await tx.poll.update({
                    where:{
                        id:body.pollid,
                       
                    },
                    data:{
                        completed:true
                    }
                })
            }

            



        })
        return res.status(200).json({message:"Polled"})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:err})
    }
}

export const getPolls = async(req:any,res:any)=>{
    try{
     
        const allPolls=await prisma.poll.findMany({
            where:{
                OR:[
                   
                    {
                         stdate:{lt:format(getCurrentISTTime().toISOString().substring(0,10))},
                     },
                     {
                         stdate:format(getCurrentISTTime().toISOString().substring(0,10)),
                         sttime:{lte:getCurrentISTTime().toTimeString().substring(0,5)}
                     }
                     ] 

            },
            include:{
                options:true,
                polled:true
            }

        })
        const pollIds = allPolls.map(poll => poll.id);
    

        const polledPolls = await prisma.polled.findMany({
            where: {
                studrollno: req.headers.id,
                pollid: { in: pollIds }
            }
        })
        // console.log(ongoingPolls)
        const polledPollIds = polledPolls.map(polled => polled.pollid);
        const polled = allPolls.filter(poll => polledPollIds.includes(poll.id));
        const unpolled = allPolls.filter(poll => !polledPollIds.includes(poll.id));
        return  res.status(200).json({polled:polled,unpolled:unpolled})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:err})
    }
}

export const studentChangePasswordLogin=async(req:any,res:any)=>{
    try{
        const result=studentchangepasswordlogin.safeParse(req.body)
        if(!result.success)
        {
            return res.status(500).json({msg:"type mismatch"})
        }
        const {email}=req.body;
        const student=await prisma.student.findUnique({
            where:{
                email
            }
        })
   
    
        if(!student)
        {
            return res.status(500).json({msg:"invalid email"})
        }
        const otp=generateOTP()
    
        const temp=await prisma.oTPRequest.create({
            data:{
                email,
                otp,
                expires:new Date(getCurrentISTTime().getTime() + 10*60*1000)
            }
        })
        let mail=changeMailPortion(email,otp)
        let info=await transporter.sendMail(mail)
    
        return res.status(200).json({otp,email:temp.email})
    
    
        }
        catch(err)
        {
            console.log(err)
            return res.status(500).json({msg:"error"})
        }
        


}


export const studentChangePasswordOTP=async(req:any,res:any)=>{
    const result=studentchangepasswordotp.safeParse(req.body)
        if(!result.success)
        {
            console.group(result.error)
            return res.status(500).json({msg:"typo"})
        }
    try{
        console.log(req.body)
        const body=req.body
        const verify=await prisma.oTPRequest.findUnique({
            where:{
                email:body.email,
                otp:parseInt(body.otp),
                expires:{gte:new Date()}

            }

        })
        if(!verify)
        {
            console.log("hii")
            return res.status(500).json({msg:"error"})

        }
        return res.status(200).json({msg:"done"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({msg:"error"})
    }
    finally{
        await prisma.oTPRequest.delete({
            where:{
                email:req.body.email
            }
        })
    }
  



}

export const studentChangePassword=async(req:any,res:any)=>{

    try{
        const result=studentchangepassword.safeParse(req.body)
        if(!result.success)
        {
            return res.status(500).json({msg:"typo"})
        }
        const student=await prisma.student.findUnique({
            where:{
                email:req.body.email
            }
        })
        if(!student)
        {
            return res.status(500).json({msg:"email doesn't exist"})
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password,salt);

        await prisma.student.update({
            where:{
                email:req.body.email
            },data:{
                password:hashedPass
            }

        })

        return res.status(200).json({msg:"done"})




    }
    catch(e)
    {
        console.log(e)
        return res.status(500).json({msg:"error"})
    }


}

export {studentRegister,studentLogin,studentPoll}


