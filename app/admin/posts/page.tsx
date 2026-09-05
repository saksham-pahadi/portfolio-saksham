import { requireAdmin } from "@/lib/require-admin";
import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import DeleteButton from "@/app/admin/ui/DeleteButton";
import { formatDate } from "@/lib/utils";
export const dynamic = "force-dynamic";
export default async function AdminPosts() {
  await requireAdmin();
  await connectDB();
  const docs = await Post.find().sort({ publishedAt: -1 }).lean();
  return (
    <div className="px-5 py-16 md:py-5 md:px-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="mono text-xs uppercase tracking-[.25em] text-[#9b5cff]">
            content / notebook
          </p>
          <h1 className="mt-2 text-3xl font-bold">Posts</h1>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-full bg-[#d6ff3f] px-4 py-2 text-xs font-bold text-black"
        >
          <Plus size={14} /> New
        </Link>
      </div>
      <div className="mt-8 grid gap-4">
        {docs.map((p: any) => (
          <div
            key={String(p._id)}
            className="flex flex-col justify-between gap-4 rounded-2xl border border-white/[.07] bg-[#111017] p-5 md:flex-row md:items-center"
          >
            <div>
              <p className="text-lg font-semibold">{p.title}</p>
              <p className="mt-1 text-xs text-white/35">
                {formatDate(p.publishedAt)} ·{" "}
                {p.published ? "Published" : "Draft"}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <Link
                href={`/blog/${p.slug}`}
                className="rounded-xl border border-white/[.07] px-3 py-2 text-xs text-white/45 hover:text-white"
              >
                View <ArrowUpRight size={13} className="inline" />
              </Link>
              <Link
                href={`/admin/posts/${p._id}`}
                className="rounded-xl border border-white/[.07] px-3 py-2 text-xs text-white/45"
              >
                Edit
              </Link>
              <DeleteButton url={`/api/admin/posts/${p._id}`} label="Delete" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
