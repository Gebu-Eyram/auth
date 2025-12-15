"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/auth-store";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, accessToken, isLoading: storeLoading } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for store to finish loading before making any decisions
    if (storeLoading) {
      return;
    }

    // Store loading complete, now check authentication
    if (!isAuthenticated || !accessToken) {
      router.push("/signin");
    } else {
      // Auth verified, remove loading
      setIsLoading(false);
    }
  }, [isAuthenticated, accessToken, storeLoading, router]);

  // Show loading state while checking auth
  if (isLoading || storeLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
