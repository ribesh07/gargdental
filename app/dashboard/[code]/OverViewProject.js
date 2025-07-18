"use client";
import Image from "next/image";
import { useState } from "react";
import ProductImageMagnifier from "@/components/ProductImageMagnifier";

const OverViewProject = ({ product }) => {
  const [isVideo, setIsVideo] = useState(false);
  const [imageToDisplay, setImageToDisplay] = useState(
    product.image_url || product.main_image_full_url
  );
  const [effect, setEffect] = useState("");

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

  return (
    <div className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-4 p-2 sm:p-4">
      <div className="flex flex-col items-center w-full">
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

        {product.files_full_url && (
          <div className="w-full sm:w-2/3 flex flex-wrap sm:flex-nowrap gap-2 justify-center">
            {product.files_full_url.map(
              (url, index) =>
                url && (
                  <div
                    key={index}
                    className="flex justify-center border border-[#0072bc] w-[50px] h-[50px] hover:border-red-800 hover:scale-105 p-1 sm:p-2 rounded"
                  >
                    {url.endsWith(".mp4") ? (
                      <video
                        onClick={() => handleVideoClick(url)}
                        src={url}
                        width={38}
                        height={38}
                        className="object-contain rounded cursor-pointer"
                        muted
                      />
                    ) : (
                      <Image
                        onClick={() => handleClick(url)}
                        src={url}
                        alt=""
                        width={38}
                        height={38}
                        className="object-contain rounded cursor-pointer"
                      />
                    )}
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OverViewProject;
