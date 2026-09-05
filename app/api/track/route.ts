import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import PageView from "@/models/PageView";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const path =
      typeof body.path === "string" && body.path.startsWith("/")
        ? body.path.slice(0, 180)
        : "/";
    const dateKey = new Date().toISOString().slice(0, 10);
    await connectDB();
    await PageView.findOneAndUpdate(
      { path, dateKey },
      { $inc: { count: 1 } },
      { upsert: true, new: true },
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
