import React, { useRef, useState } from "react";

export default function ProductImageMagnifier({ imageUrl, alt, boxWidth = 320, boxHeight = 320, effect = "" }) {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [containerRect, setContainerRect] = useState(null);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setContainerRect(rect);
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));
    setMousePosition({ x: xPercent, y: yPercent });
  };

  return (
    <div className="relative flex items-start">
      {/* Main Image */}
      <div
        ref={containerRef}
        className="relative overflow-hidden bg-gray-50 rounded cursor-crosshair"
        style={{ width: boxWidth, height: boxHeight }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onMouseMove={handleMouseMove}
      >
        <img
          src={imageUrl}
          alt={alt}
          className={`w-full h-full object-contain select-none ${effect}`}
          draggable={false}
        />
        {/* Optional: lens overlay */}
        {isHovering && (
          <div
            className="absolute border-2 border-orange-400 bg-orange-200 bg-opacity-20 rounded-full pointer-events-none"
            style={{
              width: 60,
              height: 60,
              left: `calc(${mousePosition.x}% - 30px)`,
              top: `calc(${mousePosition.y}% - 30px)`,
            }}
          />
        )}
      </div>
      {/* Zoomed Image Box */}
      {isHovering && (
        <div
          className="absolute z-30 border border-gray-300 rounded-lg overflow-hidden bg-white shadow-2xl ml-4 hidden md:block"
          style={{
            width: 620,
            height: 442,
            left: `calc(100% + 1rem)`, // 1rem = ml-4
            top: 0,
          }}
        >
          <div
            className={`w-full h-full ${effect}`}
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: "200% 140%",
              backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
      )}
    </div>
  );
} 