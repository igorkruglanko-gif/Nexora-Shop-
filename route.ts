import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession } from "@/lib/auth";
const schema=z.object({name:z.string().trim().min(2).max(80),email:z.string().email().max(254),password:z.string().min(8).max(128)});
export async function POST(req:Request){
 const parsed=schema.safeParse(await req.json());if(!parsed.success)return NextResponse.json({error:"Проверьте имя, email и пароль (не менее 8 символов)."},{status:400});
 try{
  const email=parsed.data.email.toLowerCase();if(await prisma.user.findUnique({where:{email}}))return NextResponse.json({error:"Этот email уже зарегистрирован."},{status:409});
  const user=await prisma.user.create({data:{name:parsed.data.name,email,passwordHash:await bcrypt.hash(parsed.data.password,12)},select:{id:true,name:true,email:true,role:true}});
  await createSession(user);return NextResponse.json({user:{name:user.name,email:user.email}});
 }catch{return NextResponse.json({error:"Не удалось создать аккаунт. Проверьте настройки сервера."},{status:503})}
}
