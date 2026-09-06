"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  ["Work", "/#work"],
  ["About", "/#about"],
  ["Skills", "/#skills"],
  ["Experience", "/#experience"],
  ["Notes", "/#notes"],
  ["Contact", "/#contact"],
  ["Blog", "/blog"],
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed w-full top-0 z-50 border-b border-white/6 bg-[#09080d]/80 backdrop-blur-xl transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8 ">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-black tracking-tight"
          data-cursor
        >
          <span className="text-[#d6ff3f]">/</span>Saksham
          <span className="text-[#9b5cff]">.</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex ">
          {links.map(([label, href]) => (
            <Link
              data-cursor
              key={label}
              href={href}
              className="text-xs font-medium text-white/60 transition hover:text-white"
            >
              {label}
            </Link>
          ))}
          <Link
            data-cursor
            href="/admin/login"
            className="inline-flex items-center gap-1 rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-white/60 transition hover:border-[#9b5cff]/60 hover:text-white"
          >
            Admin <ArrowUpRight size={13} />
          </Link>
        </nav>

        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-white transition hover:bg-white/5 md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/6 bg-[#0c0a10] px-6 py-6 md:hidden">
          <div className="flex flex-col gap-4">
            {links.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-white/70 transition hover:text-white"
              >
                {label}
              </Link>
            ))}
            <Link
              target="_blank"
              href="/admin/login"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit items-center gap-1 rounded-full border border-white/10 px-5 py-2.5 text-xs font-medium text-white"
            >
              Admin <ArrowUpRight size={13} />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
