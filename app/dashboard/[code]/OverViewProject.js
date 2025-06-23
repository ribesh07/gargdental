"use client";
import Image from "next/image";
import { useState } from "react";

const OverViewProject = ({ product }) => {
  const [isVideo, setIsVideo] = useState(false);
  const [effect, setEffect] = useState("");
  function handleImageClick() {
    // isVideo = !isVideo;
    setIsVideo(!isVideo);
  }

  function handleClick(eff) {
    // isVideo = !isVideo;
    setEffect(eff);
    setIsVideo(false);
  }

  return (
    <div className="w-full flex">
      <div className="flex flex-col items-center w-full">
        <div className="w-full max-w-[80%] aspect-square relative -mt-1 mr-5 mb-4 hover:shadow-md border-2 border-gray-300 rounded">
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
            <Image
              src={product.image_url}
              alt={product.product_name}
              width={500}
              height={500}
              className={`object-contain rounded w-full h-full ${effect}`}
              priority
            />
          )}
        </div>

        <div className="w-2/3 flex gap-2 ">
          <div className="border border-[#0072bc] hover:border-red-800 hover:scale-105 p-2 rounded">
            <Image
              filter="blur(2px)"
              onClick={() => handleClick("grayscale-25")}
              src={product.image_url}
              alt={product.product_name}
              width={50}
              height={50}
              className="object-contain rounded "
            />
          </div>
          <div className="border border-[#0072bc] hover:border-red-800 hover:scale-105 p-2 rounded">
            <Image
              onClick={() => handleClick("invert")}
              src={product.image_url}
              alt={product.product_name}
              width={45}
              height={45}
              className="object-contain rounded"
            />
          </div>
          <div className="border border-[#0072bc] hover:border-red-800 hover:scale-105 p-2 rounded">
            <Image
              onClick={() => handleClick("sepia")}
              src={product.image_url}
              alt={product.product_name}
              width={45}
              height={45}
              className="object-contain rounded"
            />
          </div>
          <div className="border border-[#0072bc] hover:border-red-800 hover:scale-105 p-2 rounded relative w-fit">
            <Image
              src={product.image_url}
              alt={product.product_name}
              width={45}
              height={45}
              className="object-contain rounded"
            />

            {/* Play Button Overlay */}
            <button
              onClick={() => handleImageClick()}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-gray-400 bg-opacity-50 rounded-full p-2">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6 4l10 6-10 6V4z" />
                </svg>
              </div>
            </button>
          </div>

          <div className="border border-[#0072bc] hover:border-red-800 hover:scale-105 p-2 rounded">
            <Image
              onClick={() => handleClick("saturate-200")}
              src={product.image_url}
              alt={product.product_name}
              width={45}
              height={45}
              className="object-contain rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverViewProject;
