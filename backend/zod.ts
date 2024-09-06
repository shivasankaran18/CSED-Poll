import zod, { boolean, string } from "zod"

export const studentSignin = zod.object({
    rollno : zod.string(),
    password : zod.string(),
})

export const studentSignUp = zod.object({
    rollno : zod.string(),
    name:zod.string(),
    password: zod.string().min(8),
    dept : zod.string(),
    section : zod.string(),
    contactno : zod.string(),
    year: zod.number().int(),
    email:zod.string().endsWith(".cse2023@citchennai.net")
})

export const adminSignUp = zod.object({
    email : zod.string().email(),
    name: zod.string(),
    password: zod.string().min(8),
    dept : zod.string(),
    section : zod.string()
})

export const adminSignIn = zod.object({
    email : zod.string().email(),
    password : zod.string()
})

export const createPoll = zod.object({
    title:zod.string(),
    description:zod.string(),
    options: zod.array(string()),
    reasonsNeeded : zod.array(boolean()),
    stdate : zod.string().optional(),
    sttime : zod.string().optional(),
    type : zod.string(),
    autoDelete:zod.boolean(),
    polltype:zod.string()
})

export const studentpoll = zod.object({
    pollid:zod.number().int(),
    reason:zod.string().optional(),
    option : zod.number().int()
})

export const studentchangepasswordlogin=zod.object({
    email:zod.string().endsWith(".cse2023@citchennai.net")
})

export const studentchangepasswordotp=zod.object({
    email:zod.string().endsWith(".cse2023@citchennai.net"),
    otp:zod.string().length(6)
})

export const studentchangepassword=zod.object({
    email:zod.string().endsWith(".cse2023@citchennai.net"),
    password:zod.string().min(8)


})

