"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ClientComponent({ token }) {
  const router = useRouter();
  console.log("Token received in ClientComponent:", token);
  if (token !== null) {
    console.log("Token found in ClientComponent and it is not null");
  } else {
    console.log("Token not found in ClientComponent");
  }

  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("token");
    router.push("/dashboard");
    console.log("Logged out successfully");
  };

  return (
    <div>
      <p>Token received: {token}</p>
      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
