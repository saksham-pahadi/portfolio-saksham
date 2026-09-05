import SiteHeader from "@/app/components/SiteHeader";
export default function Privacy() {
  return (
    <main className="min-h-screen bg-[#09080d]">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-5 pb-28 pt-25 md:px-8">
        <p className="mono text-xs uppercase tracking-[.28em] text-[#9b5cff]">
          privacy
        </p>
        <h1 className="mt-3 text-5xl font-black">A small privacy note.</h1>
        <p className="mt-7 text-sm leading-7 text-white/45">
          This demo portfolio stores contact form submissions and aggregate
          page-view counters in MongoDB. It does not intentionally store raw
          browsing sessions. Configure your deployment privacy policy and
          retention rules for production use.
        </p>
      </div>
    </main>
  );
}
