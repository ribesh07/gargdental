"use client";
import Image from "next/image";
import { useState } from "react";
// import ProductImageZoomSeparate from "./ProductView";
import ProductImageMagnifier from "@/components/ProductImageMagnifier";

const OverViewProject = ({ product }) => {
  const [isVideo, setIsVideo] = useState(false);
  const [imageToDisplay, setImageToDisplay] = useState(
    product.image_url || product.main_image_full_url
  );
  const [effect, setEffect] = useState("");
  function handleImageClick() {
    // isVideo = !isVideo;
    setIsVideo(!isVideo);
  }

  function handleClick(eff) {
    console.log("Image clicked:", eff);
    setImageToDisplay(eff);
    // isVideo = !isVideo;
    setEffect(eff);
    setIsVideo(false);
  }

  return (
    <div className="w-full flex flex-col sm:flex-row  items-center sm:items-start gap-2 sm:gap-4 p-2 sm:p-4">
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-xs sm:max-w-[80%] flex justify-center aspect-square relative -mt-1 sm:mr-5 mb-4 hover:shadow-md border-2 border-gray-300 rounded">
          {isVideo ? (
            <iframe
              src="https://www.youtube.com/embed/gRF6DdP85IY"
              title="OMS|WEB ERP v25.01"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full rounded"
            ></iframe>
          ) : (
            <>
              {/* Magnifier integration */}
              <ProductImageMagnifier
                imageUrl={imageToDisplay}
                alt={product.product_name || ""}
                boxWidth={320}
                boxHeight={320}
                effect={effect}
              />
            </>
          )}
        </div>

        {product.files_full_url && (
          <div className="w-full sm:w-2/3 flex flex-wrap sm:flex-nowrap gap-2 justify-center">
            {product.files_full_url.map((url, index) => (
              <div key={index}>
                {/* for video */}
                {/* <div className="border border-[#0072bc] hover:border-red-800 hover:scale-105 p-1 sm:p-2 rounded relative w-fit">
                  <Image
                    src={product.image_url}
                    alt={product.product_name || ""}
                    width={38}
                    height={38}
                    className="object-contain rounded"
                  />
                  <button
                    onClick={() => handleImageClick()}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-gray-400 bg-opacity-50 rounded-full p-1 sm:p-2">
                      <svg
                        className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6 4l10 6-10 6V4z" />
                      </svg>
                    </div>
                  </button>
                </div> */}

                <div className="flex justify-center border border-[#0072bc] w-[50px] h-[50px] hover:border-red-800 hover:scale-105 p-1 sm:p-2 rounded">
                  <Image
                    onClick={() => handleClick(url)}
                    key={index}
                    src={url}
                    alt={""}
                    width={38}
                    height={38}
                    className="object-contain rounded"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OverViewProject;
