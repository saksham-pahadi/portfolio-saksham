import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SiteHeader from "@/app/components/SiteHeader";
import Reveal from "@/app/components/Reveal";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { demoProjects } from "@/lib/site-data";
export const dynamic = "force-dynamic";
export default async function ProjectsPage() {
  let projects: any[] = demoProjects;
  try {
    await connectDB();
    const d = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
    if (d.length) projects = d.map((x) => ({ ...x, _id: String(x._id) }));
  } catch {}
  return (
    <main className="min-h-screen bg-[#09080d]">
      <SiteHeader />
      <div className="mx-auto max-w-7xl px-5 pb-28 pt-25 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-white/35"
        >
          <ArrowLeft size={14} /> home
        </Link>
        <Reveal>
          <p className="mono mt-12 text-xs uppercase tracking-[.28em] text-[#9b5cff]">
            work / case files
          </p>
          <h1 className="mt-3 text-6xl font-black tracking-[-.06em] md:text-8xl">
            Selected work.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/45">
            A collection of product experiments, client-style builds and systems
            designed to survive contact with reality.
          </p>
        </Reveal>
        <div className="mt-16 grid gap-6">
          {projects.map((p, i) => (
            <Reveal key={p._id}>
              <article
                id={p.slug}
                className="grid overflow-hidden rounded-4xl border border-white/7 bg-[#111017] lg:grid-cols-[1.1fr_.9fr]"
              >
                <div className="relative min-h-70">
                  <Image
                    width={800}
                    height={500}
                    src={p.image || `/project-${(i % 4) + 1}.svg`}
                    alt={p.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-7 md:p-9">
                  <p className="mono text-xs text-white/25">
                    CASE {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 text-3xl font-bold">{p.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-white/45">
                    {p.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.stack?.map((s: string) => (
                      <span
                        className="rounded-full border border-white/8 px-3 py-1.5 text-xs text-white/45"
                        key={s}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-8 flex gap-3">
                    {p.liveUrl && (
                      <a
                      target="_blank"
                        data-cursor
                        href={p.liveUrl}
                        className="inline-flex items-center gap-2 rounded-full bg-[#d6ff3f] px-4 py-2.5 text-xs font-bold text-black"
                      >
                        <p className="flex items-center gap-2 text-purple-600">

                           Live <ArrowUpRight size={14} />
                          </p> 
                      </a>
                    )}
                    {p.githubUrl && (
                      <a
                      target="_blank"
                        data-cursor
                        href={p.githubUrl}
                        className="inline-flex items-center gap-2 rounded-full border border-white/8 px-4 py-2.5 text-xs text-white/65"
                      >
                        GitHub <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
