"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { toast } from "react-hot-toast";

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
    Cookies.set(COOKIE_NAME, "accepted", { expires: 7 });
    // toast.error("Cookie consent denied !");
    setVisible(false);
  };

  const handleReject = () => {
    // Cookies.set(COOKIE_NAME, "rejected", { expires: 7 });
    toast.error("Cookie consent denied !");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed w-full sm:w-[75%] bottom-5 rounded-2xl left-1/2 h-auto transform -translate-x-1/2  z-50 bg-gray-600 text-white px-4 py-3 flex flex-col sm:flex-col items-center justify-center shadow-lg animate-fade-in">
      <span className="self-center text-sm sm:text-base mb-2 sm:mb-0 py-2">
        We use cookies to enhance your experience and for analytics. By
        continuing to use our site, you agree to our use of cookies. See our
        {"  "}
        <Link
          href="/PrivacyPolicy"
          className="underline text-blue-300 hover:text-blue-400"
          target="_blank"
        >
          Privacy Policy
        </Link>
        .
      </span>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <button
          onClick={handleAccept}
          className="self-start mt-2 sm:mt-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
          aria-label="Accept cookies"
        >
          Accept
        </button>
        <button
          onClick={handleReject}
          className="self-start mt-2 sm:mt-1 bg-gray-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow"
          aria-label="Accept cookies"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
