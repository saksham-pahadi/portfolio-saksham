import { NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";
import { sendContactNotification } from "@/lib/email";

const schema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(4000),
});

export async function POST(req: Request) {
  try {
    const parsed = schema.safeParse(await req.json());
    if (!parsed.success)
      return NextResponse.json(
        { error: "Please check the form fields." },
        { status: 400 },
      );
    await connectDB();
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const ipHash = crypto
      .createHash("sha256")
      .update(`${ip}:${process.env.AUTH_SECRET || "salt"}`)
      .digest("hex");
    const message = await Message.create({ ...parsed.data, ipHash });
    try {
      await sendContactNotification(parsed.data);
    } catch (error) {
      console.error("email notification failed", error);
    }
    return NextResponse.json({ ok: true, id: String(message._id) });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to send your message right now." },
      { status: 500 },
    );
  }
}
