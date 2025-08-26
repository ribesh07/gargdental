"use client";
import { Suspense } from "react";
import MobileAppDownload from "./playstore";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MobileAppDownload/>
    </Suspense>
  );
}
