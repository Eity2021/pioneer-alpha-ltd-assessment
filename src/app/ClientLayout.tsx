"use client";

import Header from "@/components/shared/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import AuthProvider from "@/components/auth/AuthProvider";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const authRoutes = ["/auth/sign-in", "/auth/sign-up", "/auth/forgot"];
  const isAuthPage = authRoutes.includes(pathname);
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        {!isAuthPage && (
          <aside className="w-[340px] bg-[#0D224A] h-screen fixed left-0 top-0">
            <div className="relative h-full">
              <h2 className="mb-4">
                <Sidebar />
              </h2>
              <div className="flex gap-1 pl-8 absolute bottom-10">
                <LogOut color="#8CA3CD" />
                <p className="font-medium font-inter text-[16px] text-[#8CA3CD]">
                  Logout
                </p>
              </div>
            </div>
          </aside>
        )}

        <main
          className={`flex-1 bg-gray-100 min-h-screen ${
            !isAuthPage ? "ml-[340px]" : ""
          }`}
        >
          {!isAuthPage && <Header />}
          <AuthProvider>{children}</AuthProvider>
        </main>
      </div>
    </ProtectedRoute>
  );
}
