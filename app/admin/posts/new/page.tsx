import { requireAdmin } from "@/lib/require-admin";
import PostEditor from "@/app/admin/ui/PostEditor";
export default async function NewPost(){await requireAdmin();return <div className="px-5 py-8 md:px-8"><p className="mono text-xs uppercase tracking-[.25em] text-[#9b5cff]">notebook / new</p><h1 className="mt-2 text-3xl font-bold">Create post</h1><div className="mt-8"><PostEditor/></div></div>}
