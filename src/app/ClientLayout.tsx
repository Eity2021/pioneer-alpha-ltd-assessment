"use client";

import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import Header from "@/components/shared/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const authRoutes = ["/auth/sign-in", "/auth/sign-up", "/auth/forgot"];
  const isAuthPage = authRoutes.includes(pathname);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-100">
        {/* Desktop Sidebar */}
        {!isAuthPage && (
          <div className="hidden md:flex md:flex-col md:w-80 bg-white border-r border-gray-200">
            <Sidebar />
          </div>
        )}

        {/* Mobile overlay sidebar (only shown on small screens) */}
        {!isAuthPage && sidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div
              className="fixed inset-0 bg-black opacity-50"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main */}
        <main className="flex-1 flex flex-col min-h-screen ">
          {!isAuthPage && (
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          )}

          <div className="flex-1 w-full">{children}</div>
          {/* remove stray "full" text if not needed */}
        </main>
      </div>
    </ProtectedRoute>
  );
}
