"use client";
import { AddtoCartFeatured } from "@/components/addtocartbutton";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";

const ProductCard = ({ product, showDiscount = false }) => {
  const router = useRouter();

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="flex flex-col h-full max-w-[400px] bg-white rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 p-4">
      <div
        className="relative mb-4 cursor-pointer"
        onClick={() => router.push(`/dashboard/${product.product_code}`)}
      >
        <img
          src={product.image_url}
          alt={product.product_name}
          className="w-full h-32 object-contain bg-gray-50 rounded hover:scale-105 transition-transform duration-300"
        />
        {showDiscount && product.actual_price && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            SALE
          </div>
        )}
      </div>
      <div
        className="flex-1 flex flex-col justify-between cursor-pointer"
        onClick={() => router.push(`/dashboard/${product.product_code}`)}
      >
        <div className="space-y-1 hover:underline">
          <p className="text-xs text-gray-500 uppercase">{product.brand}</p>
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
            {product.product_name}
          </h3>
          <div className="flex items-center space-x-1">
            {renderStars(product.rating || 0)}
            <span className="text-xs text-gray-500">
              ({product.reviews || 0})
            </span>
          </div>
        </div>
        <div className="mt-2  justify-center">
          <div className="flex items-center  space-x-2 mb-2">
            {product.actual_price && product.actual_price !== "0.00" && (
              <span className="text-xs text-gray-400 line-through">
                Rs. {product.actual_price}
              </span>
            )}
            <span className="text-base font-bold text-red-600">
              Rs. {product.sell_price}
            </span>
          </div>
        </div>
      </div>
      <div>
        <AddtoCartFeatured product={product} fullWidth />
      </div>
    </div>
  );
};
const ProductSection = ({ title, products, showDiscount = false }) => (
  <div className="mb-2">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {products.map((product, index) => (
        <ProductCard
          key={index}
          product={product}
          showDiscount={showDiscount}
        />
      ))}
    </div>
  </div>
);

export default function RecommendedProducts() {
  const featuredProducts = [
    {
      id: 1,
      product_name: "Articulating Paper 200 strips",
      product_code: "HE00005",
      brand: "Meta",
      category: "category 1",
      item_number: "#HE00005",
      actual_price: "0.00",

      rating: 2,
      reviews: 18,
      sell_price: "600.00",
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/HE00005/articulating_paper_200_strips.jpeg",
      description: "Articulating Paper 200 strips",
      available_quantity: "100.00",
      unit_info: "PCS",
      flash_sale: true,
      delivery_days: null,
    },
    {
      id: 2,
      product_name: "Articulating Paper Forceps",
      product_code: "A300001",
      brand: "No Brand",
      category: "Category 2",
      item_number: "#A300001",
      actual_price: "1000.00",
      sell_price: "900.00",
      rating: 4,
      reviews: 10,
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/A300001/articulating_paper_forceps.jpeg",
      description: "Articulating Paper Forceps",
      available_quantity: "50.00",
      unit_info: null,
      flash_sale: false,
      delivery_days: null,
    },
    {
      id: 3,
      product_name: "Bausch Progress 100",
      product_code: "A500002",
      brand: "No Brand",
      rating: 3,
      reviews: 8,
      category: "category 1",
      item_number: "#A500002",
      actual_price: "1000.00",
      sell_price: "900.00",
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/A500002/bausch_progress_100.jpeg",
      description: "Bausch Progress 100",
      available_quantity: "50.00",
      unit_info: null,
      flash_sale: false,
      delivery_days: null,
    },
    {
      id: 4,
      product_name: "Fleximeter Strips BK 253",
      product_code: "A200001",
      brand: "No Brand",
      category: "category 1",

      rating: 5,
      reviews: 12,
      item_number: "#A200001",
      actual_price: "1000.00",
      sell_price: "900.00",
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/A200001/fleximeter_strips_bk_253.jpeg",
      description: "Fleximeter Strips BK 253",
      available_quantity: "50.00",
      unit_info: null,
      flash_sale: false,
      delivery_days: null,
    },
    {
      id: 5,
      product_name: "Bausch articulating paper BK 81",
      product_code: "A200002",
      brand: "No Brand",
      category: "category 1",

      rating: 1,
      reviews: 5,
      item_number: "#A200002",
      actual_price: "1000.00",
      sell_price: "900.00",
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/A200002/bausch_articulating_paper_bk_81.jpeg",
      description: "Bausch articulating paper BK 81",
      available_quantity: "50.00",
      unit_info: null,
      flash_sale: false,
      delivery_days: null,
    },
    {
      id: 6,
      product_name: "Arti Spot 2",
      product_code: "A500003",
      brand: "No Brand",
      category: "Sub Sub category 1",

      rating: 3,
      reviews: 8,
      item_number: "#A500003",
      actual_price: "1000.00",
      sell_price: "900.00",
      image_url:
        "https://garg.omsok.com/storage/app/public/backend/productimages/A500003/arti_spot_2.jpeg",
      description: "Arti Spot 2",
      available_quantity: "50.00",
      unit_info: null,
      flash_sale: false,
      delivery_days: null,
    },
  ];

  return (
    <div className="min-h-[200px] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            RECOMMENDED PRODUCTS
          </h1>
        </div>

        {/* Featured Products */}
        <ProductSection
          title="Products"
          products={featuredProducts}
          showDiscount={true}
        />
      </div>
    </div>
  );
}
