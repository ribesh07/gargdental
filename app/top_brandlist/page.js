"use client";
import { Suspense } from "react";
import TopBrandProductPage from "./TopBrandProductPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TopBrandProductPage />
    </Suspense>
  );
}
