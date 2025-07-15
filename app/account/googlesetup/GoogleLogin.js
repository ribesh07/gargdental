// components/GoogleLoginButton.tsx
"use client";

import { useEffect } from "react";
import Script from "next/script";

const GoogleLoginButton = () => {
  useEffect(() => {
    if (window.google && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-button"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  const handleCredentialResponse = async (response) => {
    const id_token = response.credential;

    const res = await fetch("/api/google-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: id_token }),
    });

    const data = await res.json();
    console.log("API Response:", data);
  };

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="beforeInteractive"
      />
      <div id="google-button"></div>
    </>
  );
};

export default GoogleLoginButton;
