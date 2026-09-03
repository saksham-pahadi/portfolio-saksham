import Link from "next/link";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Terminal,
  Code2,
  Database,
  Server,
} from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import Post from "@/models/Post";
import { demoProjects, demoPosts, skills } from "@/lib/site-data";
import SiteHeader from "@/app/components/SiteHeader";
import Reveal from "@/app/components/Reveal";
import ContactForm from "@/app/components/ContactForm";

export const dynamic = "force-dynamic";

async function getContent() {
  try {
    await connectDB();
    const [projects, posts] = await Promise.all([
      Project.find({ featured: true })
        .sort({ order: 1, createdAt: -1 })
        .limit(4)
        .lean(),
      Post.find({ published: true }).sort({ publishedAt: -1 }).limit(3).lean(),
    ]);
    return {
      projects: projects.length
        ? projects.map((p) => ({ ...p, _id: String(p._id) }))
        : demoProjects,
      posts: posts.length
        ? posts.map((p) => ({ ...p, _id: String(p._id) }))
        : demoPosts,
    };
  } catch {
    return { projects: demoProjects, posts: demoPosts };
  }
}

const timeline = [
  {
    year: "2024 — Present",
    role: "Full-Stack Developer",
    company: "Independent / Product Builds",
    desc: "Building production-minded web applications with Next.js, TypeScript, MongoDB and thoughtful UX systems.",
  },
  {
    year: "2023 — 2024",
    role: "Developer / BPO → Engineering",
    company: "Cognizant",
    desc: "Started professionally in BPO and deliberately pivoted toward software engineering through hands-on product development.",
  },
];

export default async function Home() {
  const { projects, posts } = await getContent();

  return (
    <main className="min-h-screen bg-[#09080d] text-white">
      <SiteHeader />

      {/* HERO SECTION */}
      <section className="relative flex min-h-[calc(100vh-80px)] w-full items-center px-5 py-12 md:px-8 lg:py-20">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.2fr_.8fr]">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#9b5cff]/30 bg-[#9b5cff]/10 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[.22em] text-[#ceb6ff]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#d6ff3f]" />
              available for select builds
            </div>
            <p className="hand mb-3 rotate-[-2deg] text-xl text-[#d6ff3f] sm:text-2xl">
              Hey, I'm Saksham.
            </p>
            <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-[-.05em] text-gradient sm:text-6xl md:text-7xl lg:text-8xl">
              I build <br className="hidden sm:inline" />
              <span className="underline-acid">modern</span>{" "}
              <br className="hidden sm:inline" />
              web experiences.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/[.6] sm:text-lg">
              Transforming bold ideas into scalable, production-ready software.
              Full-stack developer specializing in building fast, scalable, and
              intuitive web applications — bridging robust backend architecture
              with modern frontend design.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                data-cursor
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-[#d6ff3f] px-6 py-3.5 text-sm font-bold text-black transition hover:bg-[#c3f02b]"
              >
                See the work{" "}
                <ArrowUpRight
                  size={16}
                  className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
              <a
                data-cursor
                href="/resume-demo.txt"
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/[.15] px-6 py-3.5 text-sm font-medium text-white/[.8] transition hover:border-white/[.3] hover:bg-white/[.05]"
              >
                Download résumé
              </a>
            </div>

            <div className="mt-8 flex items-center gap-5 text-white/[.4]">
              <a
                data-cursor
                href="https://github.com/saksham-pahadi"
                aria-label="GitHub"
                className="transition hover:text-white"
              >
                <Github size={20} />
              </a>
              <a
                data-cursor
                href="https://linkedin.com/in/saksham-demo"
                aria-label="LinkedIn"
                className="transition hover:text-white"
              >
                <Linkedin size={20} />
              </a>
              <a
                data-cursor
                href="mailto:hello@saksham.dev"
                aria-label="Email"
                className="transition hover:text-white"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="relative mx-auto h-[380px] w-full max-w-[420px] sm:h-[480px] lg:h-[560px]">
            {/* Embedded CSS for uneven, organic floating keyframe animations */}
            <style>{`
    @keyframes floatMainBlob {
      0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
      50% { transform: translate(-50%, calc(-50% - 14px)) rotate(1.2deg); }
    }
    @keyframes floatStackBadge {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(-1.5deg); }
    }
    @keyframes floatStatusBadge {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-13px) rotate(1.8deg); }
    }
    @keyframes floatSparklesIcon {
      0%, 100% { transform: translateY(0px) rotate(-12deg) scale(1); }
      50% { transform: translateY(-15px) rotate(-3deg) scale(1.06); }
    }
    @keyframes floatTerminalIcon {
      0%, 100% { transform: translateY(0px) rotate(12deg) scale(1); }
      50% { transform: translateY(-12px) rotate(22deg) scale(1.04); }
    }
    @keyframes pulseGlow {
      0%, 100% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.08); opacity: 1; }
    }
  `}</style>

            {/* Glow effect behind */}
            <div
              className="absolute inset-8 rounded-[44%_56%_42%_58%/45%_44%_56%_55%] bg-[#6d2bff]/20 blur-3xl"
              style={{ animation: "pulseGlow 8.5s ease-in-out infinite" }}
            />

            {/* Main Centered Blob Card */}
            <div
              className="absolute left-1/2 top-1/2 h-[320px] w-[260px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[44%_56%_42%_58%/45%_44%_56%_55%] border border-white/10 bg-gradient-to-br from-[#1a1325] via-[#17111f] to-[#0d0b11] shadow-[0_40px_100px_rgba(0,0,0,.55)] sm:h-[420px] sm:w-[340px]"
              style={{
                animation:
                  "floatMainBlob 7.2s cubic-bezier(0.45, 0, 0.55, 1) infinite",
              }}
            >
              {/* Background 3D Character Layer */}
              <div
                className="pointer-events-none absolute inset-0 z-0 bg-contain bg-center bg-no-repeat p-4"
                style={{ backgroundImage: "url('/developer-3d.png')" }}
                aria-hidden="true"
              />

              {/* Foreground Content Layer */}
              <div className="relative z-10 flex h-full flex-col justify-between p-6">
                {/* Card overlay content */}
              </div>
            </div>

            {/* Floating Stack Badge */}
            <div
              className="absolute right-0 top-4 z-10 rounded-2xl border border-white/[.1] bg-white/[.03] px-4 py-2.5 shadow-glow backdrop-blur"
              style={{
                animation:
                  "floatStackBadge 5.8s cubic-bezier(0.4, 0, 0.6, 1) 0.4s infinite",
              }}
            >
              <p className="mono text-[10px] uppercase tracking-[.25em] text-white/[.4]">
                stack.txt
              </p>
              <p className="mt-1 text-xs font-medium sm:text-sm">
                Next.js · TypeScript · MongoDB
              </p>
            </div>

            {/* Floating Status Badge */}
            <div
              className="absolute bottom-8 left-0 z-10 rounded-2xl border border-white/[.1] bg-[#111017]/90 px-4 py-2.5 shadow-glow backdrop-blur"
              style={{
                animation:
                  "floatStatusBadge 6.6s cubic-bezier(0.37, 0, 0.63, 1) 1.2s infinite",
              }}
            >
              <p className="mono text-[10px] uppercase tracking-[.25em] text-white/[.4]">
                status
              </p>
              <p className="mt-1 flex items-center gap-2 text-xs font-medium sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-[#d6ff3f]" /> shipping
                ideas
              </p>
            </div>

            {/* Decorative Icons with mismatched float timings */}
            <div
              className="absolute left-2 top-1/3 -rotate-12 text-[#9b5cff]"
              style={{
                animation:
                  "floatSparklesIcon 4.9s cubic-bezier(0.42, 0, 0.58, 1) 0.2s infinite",
              }}
            >
              <Sparkles size={44} />
            </div>

            <div
              className="absolute bottom-2 right-2 rotate-12 text-[#d6ff3f]"
              style={{
                animation:
                  "floatTerminalIcon 6.1s cubic-bezier(0.45, 0, 0.55, 1) 1.5s infinite",
              }}
            >
              <Terminal size={44} />
            </div>
          </div>
        </div>

        <div className="grid-bg absolute inset-0 -z-10" />
        <div className="pointer-events-none absolute left-[-10%] top-[-15%] h-[420px] w-[420px] rounded-full bg-[#6d2bff]/15 blur-3xl" />
        <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[420px] w-[420px] rounded-full bg-[#9b5cff]/10 blur-3xl" />
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden border-y border-white/[.06] bg-white/[.015] py-4">
        <div className="flex w-fit animate-marquee gap-0 whitespace-nowrap text-xs uppercase tracking-[.35em] text-white/[.3]">
          {Array.from({ length: 8 }, (_, i) => (
            <span key={i}>
              {" "}
              Next.js ✦ TypeScript ✦ MongoDB ✦ Product thinking ✦ Clean APIs ✦
              UI systems ✦
            </span>
          ))}
        </div>
      </div>

      {/* SELECTED WORK */}
      <section
        id="work"
        className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28"
      >
        <Reveal>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mono text-xs uppercase tracking-[.28em] text-[#9b5cff]">
                01 / selected work
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Things I've shipped.
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[.1] px-5 py-2.5 text-xs text-white/[.65] transition hover:bg-white/[.05]"
            >
              All projects <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p: any, index: number) => (
            <Reveal key={p._id} delay={index * 0.06}>
              <article className="group overflow-hidden rounded-[28px] border border-white/[.07] bg-[#111017] transition hover:-translate-y-1 hover:border-[#9b5cff]/35 hover:shadow-glow">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0c0b10]">
                  <img
                    src={p.image || `/project-${(index % 4) + 1}.svg`}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111017] via-transparent to-transparent opacity-80" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/[.1] bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[.18em] backdrop-blur">
                    0{index + 1}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-semibold tracking-tight">
                      {p.title}
                    </h3>
                    <ArrowUpRight
                      size={20}
                      className="text-white/[.3] transition group-hover:text-white"
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/[.5]">
                    {p.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack?.map((s: string) => (
                      <span
                        key={s}
                        className="rounded-full border border-white/[.08] px-3 py-1 text-[11px] text-white/[.5]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28"
      >
        <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <div className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-[34px] border border-white/[.07] bg-[#111017] p-7 md:p-9">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full border border-[#9b5cff]/20" />
              <div className="absolute -bottom-20 -left-10 h-44 w-44 rounded-full border border-[#d6ff3f]/20" />
              <div>
                <p className="mono text-xs text-white/[.3]">ABOUT_ME.md</p>
                <div className="mt-6 text-6xl font-black leading-none tracking-[-.08em] text-[#9b5cff] sm:text-[70px]">
                  10×
                </div>
                <p className="mt-4 text-xl font-semibold">
                  curiosity over comfort.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/[.5]">
                  I like products that feel simple on the surface but are
                  thoughtfully engineered underneath.
                </p>
              </div>
              <div className="mt-8 w-fit -rotate-3 rounded-2xl border border-[#d6ff3f]/25 bg-[#d6ff3f]/10 px-4 py-2.5 font-mono text-xs text-[#e9ff9a]">
                ship → learn → iterate
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="rounded-[34px] border border-white/[.07] bg-[#111017] p-7 md:p-9">
              <p className="mono text-xs uppercase tracking-[.24em] text-[#d6ff3f]">
                the human behind the stack
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-snug sm:text-3xl md:text-4xl">
                I bridge robust backend architecture with interfaces that feel
                effortless.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-white/[.55] sm:text-base">
                I'm Saksham, a full-stack developer focused on modern web
                products. My sweet spot is the space between system design and
                polish: clean APIs, durable data models, responsive UI, and
                enough motion to make the product feel alive without getting in
                the user's way.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/[.07] bg-black/20 p-4">
                  <Code2 className="text-[#9b5cff]" size={22} />
                  <p className="mt-3 text-sm font-semibold">Product UI</p>
                  <p className="mt-1 text-xs text-white/[.4]">
                    React · Next.js · Tailwind
                  </p>
                </div>
                <div className="rounded-2xl border border-white/[.07] bg-black/20 p-4">
                  <Server className="text-[#d6ff3f]" size={22} />
                  <p className="mt-3 text-sm font-semibold">Backend</p>
                  <p className="mt-1 text-xs text-white/[.4]">
                    Node · Express · APIs
                  </p>
                </div>
                <div className="rounded-2xl border border-white/[.07] bg-black/20 p-4">
                  <Database className="text-[#9b5cff]" size={22} />
                  <p className="mt-3 text-sm font-semibold">Data</p>
                  <p className="mt-1 text-xs text-white/[.4]">
                    MongoDB · MySQL
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        className="border-y border-white/[.06] bg-white/[.015]"
      >
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <p className="mono text-xs uppercase tracking-[.28em] text-[#9b5cff]">
              02 / skills
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-5xl md:text-6xl">
              My toolbox.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(skills).map(([group, list], i) => (
              <Reveal delay={i * 0.05} key={group}>
                <div className="rounded-[28px] border border-white/[.07] bg-[#0e0c13] p-6">
                  <p className="text-sm font-semibold">{group}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {list.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-xl border border-white/[.07] bg-white/[.02] px-3 py-1.5 text-xs text-white/[.6] transition hover:border-[#9b5cff]/40 hover:text-white"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28"
      >
        <Reveal>
          <p className="mono text-xs uppercase tracking-[.28em] text-[#d6ff3f]">
            03 / experience
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-5xl md:text-6xl">
            A timeline, not a résumé dump.
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4">
          {timeline.map((item, i) => (
            <Reveal key={item.year} delay={i * 0.06}>
              <div className="grid gap-4 rounded-[26px] border border-white/[.07] bg-[#111017] p-6 md:grid-cols-[180px_1fr_auto] md:items-center">
                <p className="mono text-xs text-white/[.4]">{item.year}</p>
                <div>
                  <p className="text-lg font-semibold">{item.role}</p>
                  <p className="mt-1 text-sm font-medium text-[#9b5cff]">
                    {item.company}
                  </p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/[.5]">
                    {item.desc}
                  </p>
                </div>
                <span className="w-fit rounded-full border border-[#d6ff3f]/20 bg-[#d6ff3f]/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[.14em] text-[#dfff80]">
                  building
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-28">
        <Reveal>
          <div className="overflow-hidden rounded-[36px] border border-[#9b5cff]/25 bg-gradient-to-br from-[#171022] to-[#0f0c13] p-7 md:p-12">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="mono text-xs uppercase tracking-[.28em] text-white/[.4]">
                  04 / services
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl md:text-5xl">
                  Good software is a conversation between product, code and
                  people.
                </h2>
              </div>
              <Link
                href="#contact"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[#d6ff3f] px-6 py-3.5 text-sm font-bold text-black transition hover:bg-[#c3f02b]"
              >
                Let's talk <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-2xl bg-white/[.03] p-6">
                <p className="font-semibold">01 / Build</p>
                <p className="mt-2 text-sm leading-relaxed text-white/[.5]">
                  Full-stack web apps with a production-ready foundation.
                </p>
              </div>
              <div className="rounded-2xl bg-white/[.03] p-6">
                <p className="font-semibold">02 / Refine</p>
                <p className="mt-2 text-sm leading-relaxed text-white/[.5]">
                  Turn rough product ideas into calm, expressive experiences.
                </p>
              </div>
              <div className="rounded-2xl bg-white/[.03] p-6 sm:col-span-2 md:col-span-1">
                <p className="font-semibold">03 / Scale</p>
                <p className="mt-2 text-sm leading-relaxed text-white/[.5]">
                  Architecture, performance and data patterns that age well.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* NOTES */}
      <section id="notes" className="border-t border-white/[.06] bg-[#0c0a10]">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <Reveal>
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="mono text-xs uppercase tracking-[.28em] text-[#9b5cff]">
                  05 / notes
                </p>
                <h2 className="mt-3 text-3xl font-bold sm:text-5xl md:text-6xl">
                  From the notebook.
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/[.1] px-5 py-2.5 text-xs text-white/[.65] transition hover:bg-white/[.05]"
              >
                Read all notes <ArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-4">
            {posts.map((post: any, i: number) => (
              <Reveal key={post._id} delay={i * 0.05}>
                <Link
                  data-cursor
                  href={`/blog/${post.slug}`}
                  className="group grid gap-4 rounded-[25px] border border-white/[.07] bg-[#111017] p-6 transition hover:border-[#9b5cff]/35 md:grid-cols-[110px_1fr_auto] md:items-center"
                >
                  <p className="mono text-xs text-white/[.3]">0{i + 1}</p>
                  <div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags?.slice(0, 3).map((t: string) => (
                        <span
                          key={t}
                          className="text-[10px] font-medium uppercase tracking-[.14em] text-[#9b5cff]"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold transition group-hover:text-[#d6ff3f]">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/[.5]">
                      {post.excerpt}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-white/[.3] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white"
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28"
      >
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="mono text-xs uppercase tracking-[.28em] text-[#d6ff3f]">
                06 / contact
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-.04em] sm:text-6xl md:text-7xl">
                Have a bold idea?
                <br />
                <span className="text-[#9b5cff]">Let's make it real.</span>
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/[.5] sm:text-base">
                Whether it's a new product, a redesign, or a tricky engineering
                problem, send the brief. No corporate fog machine required.
              </p>
              <div className="mt-8 space-y-4 text-sm text-white/[.6]">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-[#9b5cff]" />{" "}
                  hello@saksham.dev
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-[#d6ff3f]" /> India / Remote
                </div>
                <div className="flex items-center gap-3">
                  <ArrowUpRight size={18} className="text-[#9b5cff]" />{" "}
                  linkedin.com/in/saksham-demo
                </div>
              </div>
            </div>
            <div className="rounded-[32px] border border-white/[.07] bg-[#111017] p-6 md:p-8">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[.06] bg-[#07060a]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-xs text-white/[.4] sm:flex-row md:px-8">
          <p>© {new Date().getFullYear()} Saksham. Built with intent.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/admin/login" className="hover:text-white">
              Admin
            </Link>
            <span className="mono">v1.0</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
