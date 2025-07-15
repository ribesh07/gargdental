"use client";
import { Suspense } from "react";
import TopCategoryProductPage from "./TopCategoryProductPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      < TopCategoryProductPage/>
    </Suspense>
  );
}
