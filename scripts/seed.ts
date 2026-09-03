import "dotenv/config";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project"; import Post from "@/models/Post";
import { demoProjects, demoPosts } from "@/lib/site-data";

async function run(){await connectDB(); if(await Project.countDocuments()===0){await Project.insertMany(demoProjects.map(({_id,...p})=>p));} if(await Post.countDocuments()===0){await Post.insertMany(demoPosts.map(({_id,...p})=>p));} console.log("Seed complete.");process.exit(0)}
run().catch(e=>{console.error(e);process.exit(1)});
