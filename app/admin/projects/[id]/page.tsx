import { requireAdmin } from "@/lib/require-admin";
import { notFound } from "next/navigation"; import { connectDB } from "@/lib/mongodb"; import Project from "@/models/Project"; import ProjectEditor from "@/app/admin/ui/ProjectEditor";
export const dynamic="force-dynamic";
export default async function EditProject({params}:{params:Promise<{id:string}>}){await requireAdmin();const{id}=await params;await connectDB();const p=await Project.findById(id).lean();if(!p)notFound();return <div className="px-5 py-8 md:px-8"><p className="mono text-xs uppercase tracking-[.25em] text-[#9b5cff]">projects / edit</p><h1 className="mt-2 text-3xl font-bold">Edit project</h1><div className="mt-8"><ProjectEditor id={id} initial={{...p,_id:String(p._id)}}/></div></div>}
