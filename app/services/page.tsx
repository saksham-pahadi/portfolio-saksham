import SiteHeader from "@/app/components/SiteHeader";
import Reveal from "@/app/components/Reveal";
const services = [
  [
    "01",
    "Product Engineering",
    "From wireframe to deploy: architecture, implementation, API design and the little details that keep a product shippable.",
  ],
  [
    "02",
    "Frontend Systems",
    "Responsive React and Next.js interfaces with strong component boundaries, accessibility and purposeful motion.",
  ],
  [
    "03",
    "Backend + Data",
    "Node, Express and MongoDB systems designed for clear contracts, validation, observability and sane maintenance.",
  ],
  [
    "04",
    "Performance + SEO",
    "Technical cleanup that helps the product feel faster and gives search engines a cleaner understanding of what matters.",
  ],
];
export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#09080d]">
      <SiteHeader />
      <div className="mx-auto max-w-6xl px-5 pb-28 pt-25 md:px-8">
        <Reveal>
          <p className="mono text-xs uppercase tracking-[.28em] text-[#9b5cff]">
            services / how I help
          </p>
          <h1 className="mt-3 text-6xl font-black tracking-[-.06em]">
            Less ceremony.
            <br />
            More shipping.
          </h1>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {services.map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 0.05}>
              <div className="rounded-[28px] border border-white/7 bg-[#111017] p-7">
                <p className="mono text-xs text-[#d6ff3f]">{n}</p>
                <h2 className="mt-5 text-2xl font-semibold">{t}</h2>
                <p className="mt-3 text-sm leading-7 text-white/45">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
