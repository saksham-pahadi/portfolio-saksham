"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Inbox,
  ExternalLink,
  Menu,
  X,
  LucideIcon,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/admin/projects", icon: FolderKanban },
  { label: "Posts", href: "/admin/posts", icon: FileText },
  { label: "Inbox", href: "/admin/messages", icon: Inbox },
];

export default function AdminSidebar({
  signOutAction,
}: {
  signOutAction: () => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Automatically close mobile sidebar on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Top Navigation Bar */}
      <div className="fixed top-0 z-40 w-screen border-b border-white/10 px-5 py-4 backdrop-blur-2xl lg:hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="text-white/70 hover:text-white"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <Link href="/" className="font-bold">
              Saksham.
            </Link>
          </div>
          <Link href="/admin/dashboard" className="text-xs text-white/50">
            Dashboard
          </Link>
        </div>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Aside Drawer Section */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-white/10 bg-[#0d0b11] p-5 transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="hand text-2xl text-[#d6ff3f]">
            Saksham.
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-white/50 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-10 grid gap-2">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/50 hover:bg-white/5 hover:text-white"
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-5 left-5 right-5">
          <Link
            href="/"
            className="mb-2 flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/35 hover:bg-white/5"
          >
            <ExternalLink size={14} /> View site
          </Link>

          <form action={signOutAction}>
            <button className="w-full rounded-xl border border-white/[.07] px-3 py-2 text-left text-xs text-white/35 hover:bg-white/5">
              Sign out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}