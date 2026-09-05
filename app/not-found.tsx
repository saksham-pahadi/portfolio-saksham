import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen grid place-items-center bg-[#09080d] px-6 text-white">
      <div className="text-center max-w-xl">
        <p className="mono text-[#9b5cff] tracking-[.25em] text-xs">
          404 / ROUTE NOT FOUND
        </p>
        <h1 className="hand text-8xl mt-4">Oops!</h1>
        <p className="mt-4 text-white/[.55]">
          This page took a wrong turn into the internet void.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#d6ff3f] px-6 py-3 text-sm font-bold text-black"
        >
          Back to home →
        </Link>
      </div>
    </main>
  );
}
