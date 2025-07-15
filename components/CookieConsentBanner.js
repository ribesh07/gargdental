"use client"
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";

const COOKIE_NAME = "cookie_consent";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get(COOKIE_NAME);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set(COOKIE_NAME, "accepted", { expires: 365 });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-gray-900 text-white px-4 py-3 flex flex-col sm:flex-row items-center justify-between shadow-lg animate-fade-in">
      <span className="text-sm sm:text-base mb-2 sm:mb-0">
        We use cookies to enhance your experience and for analytics. By continuing to use our site, you agree to our use of cookies. See our {" "}
        <Link href="/PrivacyPolicy" className="underline text-blue-300 hover:text-blue-400" target="_blank">Privacy Policy</Link>.
      </span>
      <button
        onClick={handleAccept}
        className="ml-0 sm:ml-4 mt-2 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
        aria-label="Accept cookies"
      >
        Accept
      </button>
    </div>
  );
} 