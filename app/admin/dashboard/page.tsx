import { requireAdmin } from "@/lib/require-admin";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Post from "@/models/Post";
import Message from "@/models/Message";
import PageView from "@/models/PageView";
import { BarChart3, Eye, FileText, FolderKanban, Mail } from "lucide-react";

export const dynamic = "force-dynamic";
export default async function Dashboard() {
  await requireAdmin();
  await connectDB();
  const [projects, posts, messages, views, history] = await Promise.all([
    Project.countDocuments(),
    Post.countDocuments(),
    Message.countDocuments({ status: "new" }),
    PageView.aggregate([{ $group: { _id: null, total: { $sum: "$count" } } }]),
    PageView.aggregate([
      { $group: { _id: "$dateKey", count: { $sum: "$count" } } },
      { $sort: { _id: -1 } },
      { $limit: 14 },
      { $sort: { _id: 1 } },
    ]),
  ]);
  const totalViews = views[0]?.total || 0;
  return (
    <div className="px-5 py-16 md:py-5 md:px-8">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <p className="mono text-xs uppercase tracking-[.25em] text-[#9b5cff]">
            control room
          </p>
          <h1 className="mt-2 text-4xl font-bold">Good to see you.</h1>
          <p className="mt-2 text-sm text-white/40">
            Your portfolio has a pulse. Here’s the snapshot.
          </p>
        </div>
        <p className="mono text-[10px] text-white/25">LIVE / MONGODB</p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Views", totalViews, Eye],
          ["Projects", projects, FolderKanban],
          ["Posts", posts, FileText],
          ["New messages", messages, Mail],
        ].map(([label, value, Icon]: any) => (
          <div
            key={label}
            className="rounded-[22px] border border-white/[.07] bg-[#111017] p-5"
          >
            <Icon size={18} className="text-[#9b5cff]" />
            <p className="mt-5 text-xs text-white/35">{label}</p>
            <p className="mt-1 text-3xl font-black">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_.75fr]">
        <div className="rounded-[28px] border border-white/[.07] bg-[#111017] p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">
                Views over the last 14 days
              </p>
              <p className="mt-1 text-xs text-white/30">
                Stored as daily counters in MongoDB.
              </p>
            </div>
            <BarChart3 size={18} className="text-[#d6ff3f]" />
          </div>
          <div className="mt-8 flex h-56 items-end gap-2">
            {history.map((d: any) => (
              <div
                key={d._id}
                className="flex h-full flex-1 flex-col justify-end gap-2"
              >
                <div
                  title={`${d._id}: ${d.count}`}
                  className="rounded-t-lg bg-linear-to-t from-[#5b1fb3] to-[#9b5cff]"
                  style={{
                    height: `${Math.max(8, Math.round((d.count / Math.max(...history.map((x: any) => x.count), 1)) * 100))}%`,
                  }}
                />
                <span className="text-center text-[9px] text-white/20">
                  {String(d._id).slice(5)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[28px] border border-white/[.07] bg-[#111017] p-6">
          <p className="text-sm font-semibold">System notes</p>
          <div className="mt-5 grid gap-3">
            {[
              "Contact form writes to MongoDB before email delivery.",
              "Admin is protected with Auth.js credentials + JWT sessions.",
              "Demo content automatically appears when the database is empty.",
              "Analytics stores aggregate counters — not raw browsing sessions.",
            ].map((n) => (
              <div
                key={n}
                className="rounded-2xl bg-white/2.5 p-4 text-xs leading-5 text-white/45"
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
