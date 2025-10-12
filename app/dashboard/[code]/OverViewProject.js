"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import ProductImageMagnifier from "@/components/ProductImageMagnifier";

const OverViewProject = ({ product }) => {
  const [isVideo, setIsVideo] = useState(false);
  const [imageToDisplay, setImageToDisplay] = useState(
    product.image_url || product.main_image_full_url
  );
  const [effect, setEffect] = useState("");
  const scrollRef = useRef(null);

  // UI state
  const [showButtons, setShowButtons] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const fileUrls = (product.files_full_url || []).filter(Boolean);

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

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    // If content wider than container -> show buttons
    setShowButtons(el.scrollWidth > el.clientWidth + 1);
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;

    // Observe size/contents changes
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);

    // Update on scroll and window resize
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [fileUrls]);

  const scrollLeft = () => {
    const el = scrollRef.current;
    if (!el) return;
    // scroll by one viewport of the thumbnails for nicer UX
    el.scrollBy({ left: -el.clientWidth, behavior: "smooth" });
  };

  const scrollRight = () => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 p-2 sm:p-4">
      <div className="flex flex-col items-center w-full">
        {/* Main Image / Video */}
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

        {/* Thumbnail Gallery */}
        {fileUrls.length > 0 && (
          <div className="relative flex items-center w-full sm:w-2/3">
            {/* Prev Button - only render if overflow and hide on xs screens */}
            {showButtons && (
              <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                aria-hidden={!showButtons}
                className={`absolute left-0 z-10 bg-white shadow-md border border-gray-300 
                            rounded-full p-1 hover:bg-gray-100 transition hidden sm:flex
                            ${!canScrollLeft ? "opacity-40 cursor-not-allowed" : ""}`}
                title="Previous"
              >
                ‹
              </button>
            )}

            {/* Scrollable Thumbnails */}
            <div
              ref={scrollRef}
              className="w-full flex gap-2 justify-start overflow-x-auto 
                         scrollbar-thin scrollbar-thumb-[#0072bc] scrollbar-track-gray-100 
                         px-6 py-3 rounded snap-x snap-mandatory scroll-smooth"
              style={{
                maxWidth: "380px", // target ~6 thumbnails visually
              }}
            >
              {fileUrls.map((url, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex justify-center border border-[#0072bc] 
                             w-[50px] h-[50px] hover:border-red-800 hover:scale-105 
                             p-1 sm:p-2 rounded cursor-pointer snap-start"
                  onClick={() => {
                    // clicking thumbnail should focus it visually and set image
                    if (url.endsWith(".mp4")) handleVideoClick(url);
                    else handleClick(url);
                  }}
                >
                  {url.endsWith(".mp4") ? (
                    <video
                      src={url}
                      width={38}
                      height={38}
                      className="object-contain rounded"
                      muted
                    />
                  ) : (
                    <Image
                      src={url}
                      alt={`thumb-${index}`}
                      width={38}
                      height={38}
                      className="object-contain rounded"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Next Button */}
            {showButtons && (
              <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                aria-hidden={!showButtons}
                className={`absolute right-0 z-10 bg-white shadow-md border border-gray-300 
                            rounded-full p-1 hover:bg-gray-100 transition hidden sm:flex
                            ${!canScrollRight ? "opacity-40 cursor-not-allowed" : ""}`}
                title="Next"
              >
                ›
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OverViewProject;
