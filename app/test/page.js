"use client";
import React, { useState, useRef } from "react";
import { ShoppingCart, Download, Minus, Plus } from "lucide-react";
import CatalogButton from "../dashboard/[code]/Catalog";
import { AddToCart } from "@/components/addtocartbutton";

// Main Product Page Component
const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  // Sample product data - replace with your actual product prop
  const product = {
    product_name: "Fleximeter Strips BK 253",
    sell_price: "900.00",
    original_price: "1000.00",
    discount: "10% OFF",
    images: [
      "https://images1.dentalkart.com/media/catalog/product/v/a/vayu_regular.jpg",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
    ],
  };

  return (
    <div className="max-w-7xl mx-auto p-6 relative">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-blue-600">Product Details</h2>
      </div>

      {/* Floating Zoom Display */}
      <FloatingZoomDisplay />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Side - Product Images */}
        <ProductImageZoom product={product} />

        {/* Right Side - Product Details */}
        <div className="space-y-6">
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>
            <div className="flex items-baseline space-x-4 mb-2">
              <span className="text-3xl font-semibold text-red-600">
                ₹{product.sell_price}
              </span>
              <span className="text-xl text-gray-500 line-through">
                ₹{product.original_price}
              </span>
              <span className="text-sm text-green-600 font-medium bg-green-100 px-2 py-1 rounded">
                {product.discount}
              </span>
            </div>
            <div className="text-lg font-medium text-green-600 mb-6">
              ₹50.00
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="text-xl font-medium w-12 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-3">Size:</h3>
            <div className="flex space-x-3">
              {["XL", "L", "LX", "LXX"].map((size) => (
                <label key={size} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={selectedSize === size}
                    onChange={(e) => setSelectedSize(e.target.value)}
                    className="w-4 h-4 mr-2 text-blue-600"
                  />
                  <span className="text-lg">{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Catalog Download */}
          <CatalogButton />

          {/* Add to Cart */}
          <AddToCart product={product} />

          {/* Tabs */}
        </div>
      </div>
    </div>
  );
};

// Floating Zoom Display Component
const FloatingZoomDisplay = () => {
  const [zoomData, setZoomData] = useState(null);

  React.useEffect(() => {
    const handleZoomUpdate = (event) => {
      setZoomData(event.detail);
    };

    window.addEventListener("productZoomUpdate", handleZoomUpdate);
    return () =>
      window.removeEventListener("productZoomUpdate", handleZoomUpdate);
  }, []);

  if (!zoomData || !zoomData.isZooming) {
    return null;
  }

  return (
    <div
      className="fixed z-auto pointer-events-none border border-gray-300 rounded-lg overflow-hidden bg-white shadow-2xl"
      style={{
        width: "500px",
        height: "500px",
        left: `${zoomData.containerPosition.right + 20}px`,
        top: `${zoomData.containerPosition.top}px`,
        transform:
          zoomData.containerPosition.right + 420 > window.innerWidth
            ? `translateX(-${
                420 +
                (zoomData.containerPosition.right -
                  zoomData.containerPosition.left)
              }px)`
            : "none",
      }}
    >
      <div
        className="w-full h-full"
        style={{
          backgroundImage: `url(${zoomData.imageUrl})`,
          backgroundSize: "300%",
          backgroundPosition: `${zoomData.mousePosition.x}% ${zoomData.mousePosition.y}%`,
          backgroundRepeat: "no-repeat",
        }}
      />
    </div>
  );
};

// Product Image Component with Zoom
const ProductImageZoom = ({ product }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    const newMousePosition = { x: xPercent, y: yPercent };
    setMousePosition(newMousePosition);

    // Dispatch custom event to update zoom display
    window.dispatchEvent(
      new CustomEvent("productZoomUpdate", {
        detail: {
          isZooming: true,
          imageUrl: product.images[selectedImage],
          mousePosition: newMousePosition,
          containerPosition: {
            top: rect.top,
            left: rect.left,
            right: rect.right,
            bottom: rect.bottom,
          },
        },
      })
    );
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Dispatch event to hide zoom
    window.dispatchEvent(
      new CustomEvent("productZoomUpdate", {
        detail: { isZooming: false },
      })
    );
  };

  return (
    <div className="space-y-4">
      {/* Main Image Container */}
      <div className="border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
        <div
          ref={containerRef}
          className="relative cursor-crosshair bg-gray-50"
          style={{ aspectRatio: "1/1" }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={product.images[selectedImage]}
            alt={product.product_name}
            className="w-full h-full object-contain p-6"
          />

          {/* Lens overlay with grid pattern like in the original */}
          {isHovering && (
            <div
              className="absolute border-1 rounded-2xl border-orange-400 bg-transparent bg-opacity-30 pointer-events-none"
              style={{
                width: "60px",
                height: "60px",
                left: `${mousePosition.x}%`,
                top: `${mousePosition.y}%`,
                transform: "translate(-50%, -50%)",
                backgroundImage: `
                  linear-gradient(to right, rgba(255,165,0,0.3) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,165,0,0.3) 1px, transparent 1px)
                `,
                backgroundSize: "8px 8px",
              }}
            />
          )}
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="flex space-x-3">
        {product.images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`w-20 h-20 border-2 rounded-lg overflow-hidden transition-all duration-200 ${
              selectedImage === index
                ? "border-red-600 shadow-md"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <img
              src={image}
              alt={`${product.product_name} ${index + 1}`}
              className="w-full h-full object-contain p-1 bg-gray-50"
            />
          </button>
        ))}
      </div>

      {/* Navigation arrows for main image */}
      <div className="flex justify-between items-center">
        <button
          onClick={() =>
            setSelectedImage(
              selectedImage > 0 ? selectedImage - 1 : product.images.length - 1
            )
          }
          className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          ←
        </button>
        <div className="flex space-x-2">
          {product.images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                selectedImage === index ? "bg-orange-400" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() =>
            setSelectedImage(
              selectedImage < product.images.length - 1 ? selectedImage + 1 : 0
            )
          }
          className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
