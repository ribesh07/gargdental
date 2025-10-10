"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import ProductImageMagnifier from "@/components/ProductImageMagnifier";

const OverViewProject = ({ product }) => {
  const [isVideo, setIsVideo] = useState(false);
  const [imageToDisplay, setImageToDisplay] = useState(
    product.image_url || product.main_image_full_url
  );
  const [effect, setEffect] = useState("");
  const scrollRef = useRef(null); // 👈 for controlling horizontal scroll

  function handleClick(url) {
    if (!url) return;
    setImageToDisplay(url);
    setEffect(url);
    setIsVideo(false);
  }

  function handleVideoClick(url) {
    if (!url) return;
    setImageToDisplay(url);
    setIsVideo(true);
  }

  // 👇 Button controls
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 p-2 sm:p-4">
      <div className="flex flex-col items-center w-full">
        {/* 🖼️ Main Image / Video */}
        <div className="w-full max-w-xs sm:max-w-[80%] flex justify-center aspect-square relative -mt-1 sm:mr-5 mb-4 hover:shadow-md border-2 border-gray-300 rounded">
          {isVideo && imageToDisplay?.endsWith(".mp4") ? (
            <video
              key={imageToDisplay}
              src={imageToDisplay}
              width="100%"
              height="100%"
              className="object-contain rounded"
              controls
            />
          ) : (
            <ProductImageMagnifier
              imageUrl={imageToDisplay}
              alt={product.product_name || ""}
              boxWidth={320}
              boxHeight={320}
              effect={effect}
            />
          )}
        </div>

        {/* Thumbnail Gallery with Scroll Buttons */}
        {product.files_full_url && (
          <div className="relative flex items-center w-full sm:w-2/3">
            {/* Prev Button */}
            <button
              onClick={scrollLeft}
              className="absolute left-0 z-10 bg-white shadow-md border border-gray-400 
                         rounded-full p-1 hover:bg-gray-100 transition hidden sm:flex"
            >
              ‹
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollRef}
              className="w-full flex gap-2 justify-start overflow-x-auto 
                         scrollbar-thin scrollbar-thumb-[#0072bc] scrollbar-track-gray-100 
                         px-8 py-3 rounded snap-x snap-mandatory scroll-smooth"
              style={{
                maxWidth: "380px", //
              }}
            >
              {product.files_full_url.map(
                (url, index) =>
                  url && (
                    <div
                      key={index}
                      className="flex-shrink-0 flex justify-center border border-[#0072bc] 
                                 w-[50px] h-[50px] hover:border-red-800 hover:scale-105 
                                 p-1 sm:p-2 rounded cursor-pointer snap-start"
                    >
                      {url.endsWith(".mp4") ? (
                        <video
                          onClick={() => handleVideoClick(url)}
                          src={url}
                          width={38}
                          height={38}
                          className="object-contain rounded"
                          muted
                        />
                      ) : (
                        <Image
                          onClick={() => handleClick(url)}
                          src={url}
                          alt=""
                          width={38}
                          height={38}
                          className="object-contain rounded"
                        />
                      )}
                    </div>
                  )
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={scrollRight}
              className="absolute right-0 z-10 bg-white shadow-md border border-gray-400 
                         rounded-full p-1 hover:bg-gray-100 transition hidden sm:flex"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverViewProject;
