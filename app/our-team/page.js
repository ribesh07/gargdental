"use client";
import { Suspense } from "react";
import TeamSection from "./team-profile";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TeamSection/>
    </Suspense>
  );
}
