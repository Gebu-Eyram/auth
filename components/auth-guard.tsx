"use client";

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * AuthGuard component to protect routes and components
 * Redirects to signin page if user is not authenticated
 */
export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const router = useRouter();
  const { isAuthenticated, accessToken } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated || !accessToken) {
      router.push("/signin");
    }
  }, [isAuthenticated, accessToken, router]);

  if (!isAuthenticated || !accessToken) {
    return (
      <>
        {fallback || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-muted-foreground">
                Verifying authentication...
              </p>
            </div>
          </div>
        )}
      </>
    );
  }

  return <>{children}</>;
}
