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
  const [ischanged, setIsChanged] = useState(false);

  // Fetch wishlist from API on mount
  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getWishlist();
        console.log(data.wishlist);
        setWishlist(data.wishlist);
      } catch (err) {
        setError("Failed to load wishlist");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [ischanged]);

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
  const handleaddtocart = async (item, e) => {
    e.stopPropagation();

    try {
      const response = await addToCart(
        item.product.product_code,
        1,
        item.product.sell_price
      );
      if (response && response.success) {
        toast.success("Added to cart!");
        setIsChanged(true);
      } else {
        console.log(response);
        toast.error(response?.message || "Failed to add to cart");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to add to cart");
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
      <h2 className="text-2xl font-bold text-blue-900 mb-6">MY WISHLIST</h2>
      {loading ? (
        <div className="text-gray-400 text-lg mt-12">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-lg mt-12">{error}</div>
      ) : wishlist.length === 0 ? (
        <div className="text-gray-400 text-lg mt-12">No items in wishlist.</div>
      ) : (
        <div className="w-full max-w-5xl space-y-6">
          {wishlist.map((item) => {
            return (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-50 shadow rounded-xl p-4 hover:shadow-lg transition cursor-pointer"
              >
                {/* Left: Image + Info */}
                <div
                  onClick={() =>
                    item.product_code &&
                    router.push(`/dashboard/${item.product_code}`)
                  }
                  className="flex items-center gap-4"
                >
                  <div className="w-16 h-16 rounded bg-gray-50 overflow-hidden flex items-center justify-center">
                    <img
                      src={
                        item.product?.image_full_url ||
                        item.product?.main_image_full_url ||
                        item.product?.file_full_url ||
                        "/assets/logo.png"
                      }
                      alt={item.product?.product_name || "Product"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm sm:text-base font-semibold text-gray-900">
                      {item.product?.product_name || item.product_code}
                    </div>
                    {item.product?.brand?.brand_name && (
                      <div className="text-xs text-gray-500">
                        Brand: {item.product.brand.brand_name}
                      </div>
                    )}
                    {/* {item.product_code && (
                    <div className="text-xs text-gray-500">
                      Code: {item.product_code}
                    </div>
                  )} */}
                    {item.product?.sell_price && (
                      <div className="text-green-600 font-bold text-sm mt-1">
                        Rs. {item.product.sell_price}
                      </div>
                    )}
                  </div>
                </div>
                {/* Right: Add to Cart + Remove */}
                <div className="flex items-center gap-4">
                  {item.product?.available_quantity === 0 &&
                    item.product?.stock_quantity === 0 && (
                      <div className="text-red-600 font-bold text-sm">
                        Out of Stock !!!
                      </div>
                    )}
                  {item.product?.available_quantity > 0 &&
                    item.product?.stock_quantity > 0 && (
                      <button
                        onClick={(e) => handleaddtocart(item, e)}
                        className="bg-[#0072bc] text-white px-4 py-2 text-sm rounded transition cursor-pointer hover:bg-[#005f9a]"
                      >
                        Add to Cart
                      </button>
                    )}

                  <button
                    onClick={(e) => handleRemove(item.id, e)}
                    className="text-red-500 hover:text-red-600 cursor-pointer transition"
                    title="Remove"
                    disabled={removingId === item.id}
                  >
                    {removingId === item.id ? "Removing..." : <Trash2 className="w-5 h-5" />}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
