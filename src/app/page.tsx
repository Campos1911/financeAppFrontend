"use client";

import { Loader } from "@/components/Layout";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      router.push("/dashboard");
    } else if (localStorage.getItem("token") === null) {
      router.push("/auth/login");
    }
  }, [router]);
  return (
    <div className="h-screen flex items-center justify-center bg-zinc-900">
      <Loader />
    </div>
  );
}
