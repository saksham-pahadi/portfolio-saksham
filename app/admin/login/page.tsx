"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function LoginPage(){
 const [error,setError]=useState(""); const [loading,setLoading]=useState(false);
 async function onSubmit(e:FormEvent<HTMLFormElement>){ e.preventDefault(); setLoading(true);setError(""); const fd=new FormData(e.currentTarget); const res=await signIn("credentials",{email:fd.get("email"),password:fd.get("password"),redirect:false}); if(res?.error){setError("Invalid credentials.");setLoading(false);return;} window.location.href="/admin/dashboard"; }
 return <main className="min-h-screen grid place-items-center bg-[#09080d] px-5"><div className="w-full max-w-md"><Link href="/" className="mb-10 inline-flex items-center gap-2 text-xs text-white/[.35]"><ArrowLeft size={14}/> back to site</Link><div className="rounded-[30px] border border-white/[.08] bg-[#111017] p-7 shadow-glow"><p className="mono text-xs uppercase tracking-[.25em] text-[#9b5cff]">restricted area</p><h1 className="mt-3 text-3xl font-bold">Welcome back.</h1><p className="mt-2 text-sm text-white/[.4]">Sign in to manage your portfolio.</p><form onSubmit={onSubmit} className="mt-8 grid gap-4"><input name="email" type="email" required defaultValue="admin@example.com" className="field" placeholder="Admin email"/><input name="password" type="password" required className="field" placeholder="Password"/><button disabled={loading} className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#d6ff3f] px-5 py-3 text-sm font-bold text-black">{loading?<><Loader2 size={16} className="animate-spin"/>Checking</>:"Enter dashboard"}</button>{error&&<p className="text-sm text-rose-400">{error}</p>}</form><p className="mt-6 text-[11px] leading-5 text-white/[.25]">First login can use the ADMIN_EMAIL and ADMIN_PASSWORD environment values; the admin account is then persisted in MongoDB as a bcrypt hash.</p></div></div></main>
}
