"use client";
import React, { useState, useRef } from "react";

const ProductImageZoomSeparate = ({ product }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const productImage = product.image_url;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    setMousePosition({ x: xPercent, y: yPercent });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Original Image */}
      <div
        ref={containerRef}
        className="relative overflow-hidden border border-gray-200 rounded-lg cursor-crosshair"
        style={{ aspectRatio: "1/1" }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img
          src={productImage}
          alt="Product"
          className="w-full h-full object-cover centre"
        />

        {/* Lens overlay */}
        {isHovering && (
          <div
            className="absolute w-full h-full border rounded-2xl border-gray-100 bg-transparent bg-opacity-20 pointer-events-none"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </div>

      {/* Zoomed View */}
      <div
        className={`border border-gray-200 rounded-lg overflow-hidden transition-opacity duration-200 ${
          isHovering ? "opacity-100" : "opacity-0"
        }`}
        style={{ aspectRatio: "1/1" }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `url(${productImage})`,
            backgroundSize: "300%",
            backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
            backgroundRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  );
};

export default ProductImageZoomSeparate;
