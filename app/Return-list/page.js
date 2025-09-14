
"use client";
import { Suspense } from "react";
import Returnlist from "./Returnlist";
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Returnlist/>
    </Suspense>
  );
}
