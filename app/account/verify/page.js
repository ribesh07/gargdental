"use client";
import { Suspense } from "react";
import VerifyAccountPage from "./VerifyAccount";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyAccountPage />
    </Suspense>
  );
}
//suspense
