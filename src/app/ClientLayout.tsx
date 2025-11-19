"use client";

import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import Header from "@/components/shared/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { usePathname } from "next/navigation";

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
          <div>
            <Sidebar />
          </div>
        )}

        <main
          className={`flex-1 bg-gray-100 min-h-screen ${!isAuthPage ? "ml-[340px]" : ""
            }`}
        >
          {!isAuthPage && <Header />}
          <div>{children}</div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
