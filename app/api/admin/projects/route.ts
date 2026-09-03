import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { slugify } from "@/lib/utils";
export async function GET(){const s=await auth();if(!s?.user)return NextResponse.json({error:"Unauthorized"},{status:401});await connectDB();const docs=await Project.find().sort({order:1,createdAt:-1}).lean();return NextResponse.json(docs.map(d=>({...d,_id:String(d._id)})));}
export async function POST(req:Request){const s=await auth();if(!s?.user)return NextResponse.json({error:"Unauthorized"},{status:401});try{const b=await req.json();await connectDB();const doc=await Project.create({...b,slug:slugify(b.slug||b.title)});return NextResponse.json({_id:String(doc._id)},{status:201});}catch(e){return NextResponse.json({error:"Could not create project"},{status:400});}}
