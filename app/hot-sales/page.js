"use client";
import { Suspense } from "react";
import FlashSaleProductPage from "./FlashSaleProductPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FlashSaleProductPage />
    </Suspense>
  );
}
