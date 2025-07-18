// components/GoogleLoginButton.tsx
"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { getFullInfo } from "@/utils/apiHelper";
import { toast } from "react-hot-toast";
import useWarningModalStore from "@/stores/warningModalStore";
import useCartStore from "@/stores/useCartStore";
import { PathnameContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
// import RefreshOnFirstLoad from "./RefreshOnFirstLoad";
// import { Loader2 } from "lucide-react";

const GoogleLoginButton = () => {
  const { userProfile, setUserProfile } = useCartStore();
  const router = useRouter();

  // useEffect(() => {
  //   const hasReloaded = localStorage.getItem("hasReloadedd");

  //   if (!hasReloaded) {
  //     localStorage.setItem("hasReloadedd", "true");
  //     window.location.reload();
  //   }
  // }, []);
  useEffect(() => {
    if (window.google && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-button"),
        { theme: "outline", size: "large", text: "continue_with" }
      );
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && document.getElementById("google-button")) {
        router.refresh();
        window.google.accounts.id.renderButton(
          document.getElementById("google-button"),
          { theme: "outline", size: "large", text: "continue_with" }
        );
        clearInterval(interval);
      }
    }, 100); // Retry every 100ms until available

    return () => clearInterval(interval); // Clean up
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
    if (data.success) {
      console.log("Login successful:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        await fetch("/api/auth/set-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: data.token }),
        });
        const result = await getFullInfo();
        setUserProfile(result.data);
        toast.success("Login successful !");

        console.log("Token saved:", data.token);
      }

      // success
      router.push("/dashboard");
    } else {
      console.warn("Login failed:", data);
      useWarningModalStore.getState().open({
        title: "Error",
        message: data?.errors[0]?.message || "Server Error !",
      });
    }
  };

  return (
    <>
      {/* <RefreshOnFirstLoad /> */}
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="beforeInteractive"
      />

      <div id="google-button"></div>
    </>
  );
};

export default GoogleLoginButton;
