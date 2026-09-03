import SiteHeader from "@/app/components/SiteHeader";
import Reveal from "@/app/components/Reveal";
import { skills } from "@/lib/site-data";
export default function SkillsPage() {
  return (
    <main className="min-h-screen bg-[#09080d]">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 pb-28 pt-5 md:px-8">
        <Reveal>
          <p className="mono text-xs uppercase tracking-[.28em] text-[#9b5cff]">
            skills / toolbox
          </p>
          <h1 className="mt-3 text-6xl font-black tracking-[-.06em]">
            Tools I trust.
          </h1>
        </Reveal>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {Object.entries(skills).map(([g, list], i) => (
            <Reveal key={g} delay={i * 0.05}>
              <div className="rounded-[28px] border border-white/[.07] bg-[#111017] p-7">
                <p className="mono text-xs text-[#d6ff3f]">{g}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {list.map((x) => (
                    <span
                      className="rounded-2xl border border-white/[.08] px-4 py-2.5 text-sm text-white/[.55] hover:border-[#9b5cff]/35 hover:text-white"
                      key={x}
                    >
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
