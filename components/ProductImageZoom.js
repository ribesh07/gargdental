import React, { useRef, useState } from "react";

export default function ProductImageZoom({ imageUrl, alt, className = "" }) {
  const [isHovering, setIsHovering] = useState(false);
  const [objectPosition, setObjectPosition] = useState("50% 50%");
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    setObjectPosition(`${xPercent}% ${yPercent}%`);
  };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-gray-50 rounded ${className}`}
      style={{ aspectRatio: "1/1" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setObjectPosition("50% 50%");
      }}
      onMouseMove={handleMouseMove}
    >
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-contain transition-transform duration-300"
        style={{
          transform: isHovering ? "scale(1.7)" : "scale(1)",
          objectPosition: isHovering ? objectPosition : "50% 50%",
          zIndex: 1,
        }}
        draggable={false}
      />
    </div>
  );
}
