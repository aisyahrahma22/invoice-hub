"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { initializeInvoices } from "@/lib/localStorage";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    initializeInvoices();
    router.push("/invoices/list");
  }, [router]);

  return null;
}
