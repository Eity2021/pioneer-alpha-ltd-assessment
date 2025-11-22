"use client";

import Cookies from "js-cookie";
import { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const authPages = ["/auth/sign-in", "/auth/sign-up"];
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    // skip auth pages
    if (authPages.includes(pathname)) {
      setIsVerified(true);
      return;
    }

    const token = Cookies.get("access");
    const refresh = Cookies.get("refresh");

    if (!token && !refresh) {
      router.replace("/auth/sign-in");
      setIsVerified(false);
    } else {
      setIsVerified(true);
    }
  }, [pathname, router]);

  if (isVerified === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Checking authentication...</p>
      </div>
    );
  }

  if (isVerified === false) return null;

  return <>{children}</>;
}
