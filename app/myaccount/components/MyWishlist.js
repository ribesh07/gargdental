import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  addToCart,
} from "@/utils/apiHelper";
import toast from "react-hot-toast";

export default function MyWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const router = useRouter();

  // Fetch wishlist from API on mount
  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getWishlist();
        setWishlist(data);
      } catch (err) {
        setError("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  // Remove from wishlist handler
  const handleRemove = async (item_id, e) => {
    e.stopPropagation();
    setRemovingId(item_id);
    try {
      const res = await removeFromWishlist(item_id);
      if (res.success) {
        setWishlist((prev) => prev.filter((item) => item.id !== item_id));
      } else {
        setError(res.message || "Failed to remove item");
      }
    } catch (err) {
      setError("Failed to remove item");
    } finally {
      setRemovingId(null);
    }
  };

  // Optionally, add to wishlist handler (if you want to add from this page)
  // const handleAdd = async (product_code) => {
  //   const res = await addToWishlist(product_code);
  //   if (res.success) {
  //     // Optionally refetch or update state
  //   } else {
  //     setError(res.message || "Failed to add to wishlist");
  //   }
  // };

  return (
    <div className="w-full flex flex-col items-center px-4 py-6">
  <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">MY WISHLIST</h2>

  {loading ? (
    <div className="text-gray-400 text-lg mt-12">Loading...</div>
  ) : error ? (
    <div className="text-red-500 text-lg mt-12">{error}</div>
  ) : wishlist.length === 0 ? (
    <div className="text-gray-400 text-lg mt-12">No items in wishlist.</div>
  ) : (
    <div className="w-full max-w-6xl flex flex-col gap-4">
      {wishlist.map((item) => (
        <div
          key={item.id}
          className="flex flex-col lg:flex-row lg:items-center justify-between bg-white shadow-md rounded-xl p-4 md:p-5 hover:shadow-lg transition"
          onClick={() =>
            item.product_code && router.push(`/dashboard/${item.product_code}`)
          }
        >
          {/* Image + Info */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
            {/* Image */}
            <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
              <img
                src={
                  item.product?.image_full_url ||
                  item.product?.main_image_full_url ||
                  item.product?.file_full_url ||
                  "assets/logo.png"
                }
                alt={item.product?.product_name || "Product"}
                className="w-full h-full object-cover"
                onError={(e) => (e.target.src = "/placeholder.png")}
              />
            </div>

            {/* Text Info + Buttons for md screens */}
            <div className="flex flex-col justify-between flex-grow">
              <div className="text-base md:text-lg font-semibold text-gray-900 leading-tight mt-2 lg:mt-0">
                {item.product?.product_name || item.product_code}
              </div>

              {item.product?.brand?.brand_name && (
                <div className="text-sm text-gray-500 mt-1">
                  Brand: {item.product.brand.brand_name}
                </div>
              )}

              {item.product?.sell_price && (
                <div className="text-green-600 font-semibold text-sm mt-1">
                  Rs. {item.product.sell_price}
                </div>
              )}

              {/* Buttons appear BELOW price for md and below */}
              <div className="flex flex-row gap-3 mt-4 md:flex-wrap lg:hidden">
                {/* Add to Cart */}
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (!item.product) {
                      toast.error("Product details not available");
                      return;
                    }
                    try {
                      const response = await addToCart(
                        item.product.product_code,
                        1,
                        item.product.sell_price
                      );
                      if (response?.success) {
                        toast.success("Added to cart!");
                        setIsChanged(true);
                      } else {
                        toast.error(response?.message || "Failed to add to cart");
                      }
                    } catch (err) {
                      toast.error("Failed to add to cart");
                    }
                  }}
                  className="bg-[#0072bc] text-white px-5 py-2 rounded-md text-sm hover:bg-[#005f9a] transition w-full md:w-auto"
                >
                  Add to Cart
                </button>

                {/* Remove */}
                <button
                  onClick={(e) => handleRemove(item.id, e)}
                  className="text-red-500 hover:text-red-600 transition"
                  title="Remove"
                  disabled={removingId === item.id}
                >
                  {removingId === item.id ? (
                    <span className="text-sm">Removing...</span>
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Right-side buttons for large screens */}
            <div className="hidden lg:flex flex-col items-end gap-3">
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  if (!item.product) {
                    toast.error("Product details not available");
                    return;
                  }
                  try {
                    const response = await addToCart(
                      item.product.product_code,
                      1,
                      item.product.sell_price
                    );
                    if (response?.success) {
                      toast.success("Added to cart!");
                      setIsChanged(true);
                    } else {
                      toast.error(response?.message || "Failed to add to cart");
                    }
                  } catch (err) {
                    toast.error("Failed to add to cart");
                  }
                }}
                className="bg-[#0072bc] text-white px-5 py-2 rounded-md text-sm hover:bg-[#005f9a] transition"
              >
                Add to Cart
              </button>

              <button
                onClick={(e) => handleRemove(item.id, e)}
                className="text-red-500 hover:text-red-600 transition"
                title="Remove"
                disabled={removingId === item.id}
              >
                {removingId === item.id ? (
                  <span className="text-sm">Removing...</span>
                ) : (
                  <Trash2 className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
</div>




  );
}
