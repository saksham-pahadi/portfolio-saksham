"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [["Work", "#work"], ["About", "#about"], ["Skills", "#skills"], ["Experience", "#experience"], ["Blog", "/blog"], ["Contact", "#contact"]];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return <header className="mb-10 left-0 right-0 top-0 z-50 border-b border-white/[.06] bg-[#09080d]/75 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
      <Link href="/" className="flex items-center gap-2 text-xl font-black tracking-tight" data-cursor><span className="text-[#d6ff3f]">/</span>Saksham<span className="text-[#9b5cff]">.</span></Link>
      <nav className="hidden items-center gap-7 md:flex">{links.map(([label,href]) => <Link data-cursor key={label} href={href} className="text-[13px] text-white/[.6] transition hover:text-white">{label}</Link>)}<Link data-cursor href="/admin/login" className="rounded-full border border-white/[.1] px-4 py-2 text-[12px] text-white/[.6] hover:border-[#9b5cff]/60 hover:text-white">Admin <ArrowUpRight size={13} className="inline"/></Link></nav>
      <button aria-label="Open menu" onClick={() => setOpen(v=>!v)} className="grid h-10 w-10 place-items-center rounded-full border border-white/[.1] md:hidden">{open ? <X size={18}/> : <Menu size={18}/>}</button>
    </div>
    {open && <nav className="border-t border-white/[.06] bg-[#0c0a10] px-5 py-5 md:hidden">{links.map(([label,href]) => <Link key={label} href={href} onClick={()=>setOpen(false)} className="block py-3 text-white/[.7]">{label}</Link>)}</nav>}
  </header>;
}
