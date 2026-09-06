import { signOut } from "@/auth";
import AdminSidebar from "@/app/admin/ui/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-[#09080d] text-white">
      <AdminSidebar signOutAction={handleSignOut} />

      {/* Main Content Area */}
      <div className="pt-16 lg:pl-64 lg:pt-0">
        {children}
      </div>
    </div>
  );
}