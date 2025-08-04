import React, { useRef, useState } from "react";

export default function ProductImageMagnifier({
  imageUrl,
  alt,
  boxWidth = 320,
  boxHeight = 320,
  zoomBoxWidth = 700,
  zoomBoxHeight = 400,
  zoomScale = 2, // how much to zoom
  effect = "",
}) {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPercent = Math.max(0, Math.min(1, x / rect.width));
    const yPercent = Math.max(0, Math.min(1, y / rect.height));
    setMousePosition({ x: xPercent, y: yPercent });
  };

  const getZoomImageStyle = () => {
    const offsetX = mousePosition.x * zoomBoxWidth * zoomScale * -1 + zoomBoxWidth / 2;
    const offsetY = mousePosition.y * zoomBoxHeight * zoomScale * -1 + zoomBoxHeight / 2;
    return {
      width: `${zoomBoxWidth * zoomScale}px`,
      height: `${zoomBoxHeight * zoomScale}px`,
      transform: `translate(${offsetX}px, ${offsetY}px)`,
    };
  };

  return (
    <div className="relative flex items-center justify-center">
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

        {/* Lens overlay */}
        {isHovering && (
          <div
            className="absolute border-2 border-orange-400 bg-transparent bg-opacity-20 rounded-full pointer-events-none"
            style={{
              width: 60,
              height: 60,
              left: `calc(${mousePosition.x * 100}% - 30px)`,
              top: `calc(${mousePosition.y * 100}% - 30px)`,
            }}
          />
        )}
      </div>

      {/* Real Zoomed View */}
      {isHovering && (
        <div
          className="absolute z-30 border border-gray-300 rounded-lg overflow-hidden bg-gray-50 shadow-2xl ml-4 hidden md:block"
          style={{
            width: zoomBoxWidth,
            height: zoomBoxHeight,
            left: `calc(100% + 1rem)`,
            top: 0,
          }}
        >
          <div
            className="relative w-full h-full overflow-hidden"
            style={{ position: "relative" }}
          >
            <img
              src={imageUrl}
              alt={alt}
              className="absolute top-0 left-0 object-cover select-none pointer-events-none"
              style={getZoomImageStyle()}
              draggable={false}
            />
          </div>
        </div>
      )}
    </div>
  );
}
