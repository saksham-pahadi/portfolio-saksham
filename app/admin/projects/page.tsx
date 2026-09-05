import { requireAdmin } from "@/lib/require-admin";
import Link from "next/link"; import { Plus, ArrowUpRight } from "lucide-react"; import { connectDB } from "@/lib/mongodb"; import Project from "@/models/Project"; import DeleteButton from "@/app/admin/ui/DeleteButton";
export const dynamic="force-dynamic";
export default async function AdminProjects() {
	await requireAdmin();
	await connectDB();
	const docs = await Project.find().sort({ order: 1, createdAt: -1 }).lean();

	return (
		<div className="px-5 py-16 md:py-5 md:px-8">
			<div className="flex items-center justify-between">
				<div>
					<p className="mono text-xs uppercase tracking-[.25em] text-[#9b5cff]">
						content / projects
					</p>
					<h1 className="mt-2 text-3xl font-bold">Projects</h1>
				</div>
				<Link
					href="/admin/projects/new"
					className="inline-flex items-center gap-2 rounded-full bg-[#d6ff3f] px-4 py-2 text-xs font-bold text-black"
				>
					<Plus size={14} /> New
				</Link>
			</div>
			<div className="mt-8 grid gap-4">
				{docs.map((p: any) => (
					<div
						key={String(p._id)}
						className="flex flex-col justify-between gap-4 rounded-2xl border border-white/[.07] bg-[#111017] p-5 sm:flex-row sm:items-center"
					>
						<div>
							<p className="text-lg font-semibold">{p.title}</p>
							<p className="mt-1 text-xs text-white/35">
								/{p.slug} · {p.featured ? "Featured" : "Standard"}
							</p>
						</div>
						<div className="flex items-center gap-2">
							<Link
								href={`/projects#${p.slug}`}
								className="rounded-xl border border-white/[.07] px-3 py-2 text-xs text-white/45 hover:text-white"
							>
								View <ArrowUpRight size={13} className="inline" />
							</Link>
							<Link
								href={`/admin/projects/${p._id}`}
								className="rounded-xl border border-white/[.07] px-3 py-2 text-xs text-white/45"
							>
								Edit
							</Link>
							<DeleteButton url={`/api/admin/projects/${p._id}`} label="Delete" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
