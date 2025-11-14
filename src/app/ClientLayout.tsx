"use client";

import Header from "@/components/shared/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define routes where sidebar should be hidden
  const authRoutes = ["/auth/sign-in", "/auth/sign-up", "/auth/forgot"];

  const isAuthPage = authRoutes.includes(pathname);

  return (
    <div className="flex min-h-screen">
      {!isAuthPage && (
        <aside className="w-[340px] bg-[#0D224A]  ">
          <h2 className="mb-4">
            <Sidebar></Sidebar>
          </h2>
        </aside>
      )}

      <main className="flex-1  bg-gray-100">
        {!isAuthPage && <Header></Header>}
        {children}
      </main>
    </div>
  );
}
