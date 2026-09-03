import type { Metadata } from "next";
import "./globals.css";
import { CursorFX, PageTransition, Noise } from "@/app/components/ClientFX";
import AnalyticsTracker from "@/app/components/AnalyticsTracker";

export const metadata: Metadata = {
  title: "Saksham — Full-Stack Developer",
  description: "Transforming bold ideas into scalable, production-ready software.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: { title: "Saksham — Full-Stack Developer", description: "Modern web products, thoughtfully engineered.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><Noise /><CursorFX /><AnalyticsTracker /><PageTransition>{children}</PageTransition></body></html>;
}
