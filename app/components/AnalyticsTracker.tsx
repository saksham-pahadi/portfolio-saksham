"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export default function AnalyticsTracker() {
  const path = usePathname();
  useEffect(() => {
    void fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
      keepalive: true,
    });
  }, [path]);
  return null;
}
