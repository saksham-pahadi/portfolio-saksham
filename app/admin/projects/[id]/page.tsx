import { requireAdmin } from "@/lib/require-admin";
import { notFound } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import ProjectEditor from "@/app/admin/ui/ProjectEditor";
export const dynamic = "force-dynamic";
export default async function EditProject({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;
  await connectDB();
  const p = await Project.findById(id).lean();
  const project = Array.isArray(p) ? p[0] : p;
  if (!project) notFound();
  return (
    <div className="px-5 py-16 md:py-5 md:px-8">
      <p className="mono text-xs uppercase tracking-[.25em] text-[#9b5cff]">
        projects / edit
      </p>
      <h1 className="mt-2 text-3xl font-bold">Edit project</h1>
      <div className="mt-8">
        <ProjectEditor
          id={id}
          initial={{ ...project, _id: String(project._id) }}
        />
      </div>
    </div>
  );
}
