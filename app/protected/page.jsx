"use client"; // Ensure this component runs on the client-side

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

export default function ProtectedPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to home page if not authenticated
      window.location.href = "/"; // For client-side navigation fallback
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return (
      <div>
        <p>Protected content for {session.user.email}</p>
        <Link href="/">
          <p>Go to home page</p>
        </Link>
      </div>
    );
  }

  return null;
}
