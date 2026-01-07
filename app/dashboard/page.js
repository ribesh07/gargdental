"use client";
import { useState, useEffect, useMemo } from "react";
import GargDental from './GargDental';
import Image from "next/image";





export default function Page() {
  const [showSplash, setShowSplash] = useState(true);
  const [offerImage, setOfferImage] = useState(null);

  useEffect(() => {
    // Fetch offer image from API
    fetch("https://gargdental.omsok.com/api/v1/offers")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.offers?.length > 0) {
          setOfferImage(data.offers[0].offer_image_full_url);
        }
      })
      .catch((err) => console.error(err));

    // Auto close splash after 15 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* MAIN WEBSITE */}
      <main className="p-6">
        <GargDental />
      </main>

      {/* SPLASH OVERLAY */}
      {showSplash && offerImage && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/65">
          <div className="relative rounded-2xl bg-transparent p-2 mx-4 sm:mx-8 md:mx-0">
            {/* Close button */}
            <button
              onClick={() => setShowSplash(false)}
              className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black text-lg text-white transition hover:scale-110"
              aria-label="Close"
            >
              ✕
            </button>

            {/* Offer image */}
            <Image
              src={offerImage}
              alt="Dental Nepal Offer"
              width={1000}
              height={680}
              priority
              className="rounded-xl max-w-[92vw] sm:max-w-full h-auto"
            />
          </div>
        </div>
      )}
    </>
  );
}



