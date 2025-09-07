"use client"

import { Suspense } from "react";
import FailurePage from "./FailurePage";


export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FailurePage />
    </Suspense>
  );
}


