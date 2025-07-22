"use client";
import { Suspense } from "react";
import ReturnProduct from "./ReturnProduct";
import { Loader2 } from "lucide-react";

export default function Page() {
  return (
    <Suspense fallback={<Loader2 className="animate-spin" />}>
      <ReturnProduct />
    </Suspense>
  );
}
