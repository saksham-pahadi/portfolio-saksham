import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SiteHeader from "@/app/components/SiteHeader";
import Reveal from "@/app/components/Reveal";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { demoPosts } from "@/lib/site-data";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  let posts:any[] = demoPosts;
  try { await connectDB(); const found = await Post.find({ published:true }).sort({ publishedAt:-1 }).lean(); if (found.length) posts = found.map(p=>({...p,_id:String(p._id)})); } catch {}
  return <main className="min-h-screen bg-[#09080d]"><SiteHeader/><div className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-8"><Link href="/" className="inline-flex items-center gap-2 text-xs text-white/[.35] hover:text-white"><ArrowLeft size={14}/> back home</Link><Reveal><p className="mono mt-12 text-xs uppercase tracking-[.28em] text-[#9b5cff]">Notebook / ideas / experiments</p><h1 className="mt-3 text-6xl font-black tracking-[-.06em] md:text-8xl">The notebook.</h1><p className="mt-6 max-w-2xl text-base leading-7 text-white/[.45]">Notes on software, product thinking, design systems, debugging, and whatever I’m currently trying to understand.</p></Reveal><div className="mt-16 grid gap-5">{posts.map((post,i)=><Reveal key={post._id} delay={i*.05}><Link data-cursor href={`/blog/${post.slug}`} className="group grid gap-6 rounded-[30px] border border-white/[.07] bg-[#111017] p-7 md:grid-cols-[140px_1fr_auto] md:items-start"><div><p className="mono text-xs text-[#9b5cff]">0{i+1}</p><p className="mt-2 text-xs text-white/[.25]">{formatDate(post.publishedAt)}</p></div><div><div className="flex flex-wrap gap-2">{post.tags?.map((tag:string)=><span key={tag} className="rounded-full border border-white/[.07] px-2.5 py-1 text-[10px] uppercase tracking-[.12em] text-white/[.35]">#{tag}</span>)}</div><h2 className="mt-4 text-2xl font-semibold group-hover:text-[#d6ff3f] md:text-3xl">{post.title}</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-white/[.4]">{post.excerpt}</p></div><ArrowUpRight className="text-white/[.25] transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"/></Link></Reveal>)}</div></div></main>;
}
