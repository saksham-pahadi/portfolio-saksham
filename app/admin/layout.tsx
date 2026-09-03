import Link from "next/link";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Inbox,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { signOut } from "@/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#09080d] text-white">
      {/* Hidden checkbox for CSS-only state toggle */}
      <input type="checkbox" id="mobile-sidebar" className="peer hidden" />

      {/* Darkened backdrop overlay for mobile */}
      <label
        htmlFor="mobile-sidebar"
        className="fixed inset-0 z-40 hidden bg-black/60 backdrop-blur-sm peer-checked:block lg:hidden"
      />

      {/* Aside Section */}
      <aside className="fixed inset-y-0 left-0 z-50 w-64 -translate-x-full border-r border-white/[.06] bg-[#0d0b11] p-5 transition-transform duration-200 peer-checked:translate-x-0 lg:translate-x-0">
        <div className="flex items-center justify-between">
          <Link href="/" className="hand text-2xl text-[#d6ff3f]">
            Saksham.
          </Link>
          <label
            htmlFor="mobile-sidebar"
            className="cursor-pointer text-white/50 hover:text-white lg:hidden"
          >
            <X size={20} />
          </label>
        </div>

        <nav className="mt-10 grid gap-2">
          {[
            ["Overview", "/admin/dashboard", LayoutDashboard],
            ["Projects", "/admin/projects", FolderKanban],
            ["Posts", "/admin/posts", FileText],
            ["Inbox", "/admin/messages", Inbox],
          ].map(([label, href, Icon]: any) => (
            <label htmlFor="mobile-sidebar" key={label} className="block cursor-pointer">
              <Link
                href={href}
                className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/[.5] hover:bg-white/[.05] hover:text-white"
              >
                <Icon size={16} />
                {label}
              </Link>
            </label>
          ))}
        </nav>

        <div className="absolute bottom-5 left-5 right-5">
          <label htmlFor="mobile-sidebar" className="block cursor-pointer">
            <Link
              href="/"
              className="mb-2 flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white/[.35] hover:bg-white/[.05]"
            >
              <ExternalLink size={14} /> View site
            </Link>
          </label>

          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <button className="w-full rounded-xl border border-white/[.07] px-3 py-2 text-left text-xs text-white/[.35] hover:bg-white/[.05]">
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-64">
        <div className="fixed top-0 z-45 w-screen border-b border-white/[.06] px-5 py-4 lg:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <label
                htmlFor="mobile-sidebar"
                className="cursor-pointer text-white/70 hover:text-white"
              >
                <Menu size={20} />
              </label>
              <Link href="/" className="font-bold">
                Saksham.
              </Link>
            </div>
            <Link href="/admin/dashboard" className="text-xs text-white/[.5]">
              Dashboard
            </Link>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}