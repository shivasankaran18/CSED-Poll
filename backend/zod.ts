import zod, { string } from "zod"

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