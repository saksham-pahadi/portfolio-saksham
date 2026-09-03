import { requireAdmin } from "@/lib/require-admin";
import ProjectEditor from "@/app/admin/ui/ProjectEditor";
export default async function NewProject(){await requireAdmin();return <div className="px-5 py-8 md:px-8"><p className="mono text-xs uppercase tracking-[.25em] text-[#9b5cff]">projects / new</p><h1 className="mt-2 text-3xl font-bold">Create project</h1><div className="mt-8"><ProjectEditor/></div></div>}
