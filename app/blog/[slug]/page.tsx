import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SiteHeader from "@/app/components/SiteHeader";
import { connectDB } from "@/lib/mongodb";
import Post from "@/models/Post";
import { demoPosts } from "@/lib/site-data";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params; const p = demoPosts.find(x=>x.slug===slug); return { title: p ? `${p.title} — Saksham` : "Notebook — Saksham" };
}

export default async function PostPage({ params }: { params: Promise<{slug:string}> }) {
  const { slug } = await params;
  let post:any = demoPosts.find(p=>p.slug===slug);
  try { await connectDB(); const found = await Post.findOne({ slug, published:true }).lean(); if (found) post={...found,_id:String(found._id)}; } catch {}
  if (!post) notFound();
  const paragraphs = String(post.content).split(/\n\n+/).filter(Boolean);
  return <main className="min-h-screen bg-[#09080d]"><SiteHeader/><article className="mx-auto max-w-4xl px-5 pb-28 pt-32 md:px-8"><Link href="/blog" className="inline-flex items-center gap-2 text-xs text-white/[.35] hover:text-white"><ArrowLeft size={14}/> all notes</Link><p className="mono mt-12 text-xs uppercase tracking-[.28em] text-[#9b5cff]">{formatDate(post.publishedAt)} · {post.tags?.join(" · ")}</p><h1 className="mt-4 text-5xl font-black leading-[.98] tracking-[-.05em] md:text-7xl">{post.title}</h1><p className="mt-7 text-lg leading-8 text-white/[.5]">{post.excerpt}</p><div className="mt-12 h-px bg-white/[.08]"/><div className="prose prose-invert prose-lg mt-12 max-w-none prose-p:text-white/[.6] prose-p:leading-8">{paragraphs.map((paragraph:string,i:number)=><p key={i}>{paragraph}</p>)}</div></article></main>;
}
