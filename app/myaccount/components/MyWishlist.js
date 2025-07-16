import useCartStore from "@/stores/useCartStore";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function MyWishlist() {
  const wishlist = useCartStore((state) => state.wishlist) || [];
  const setWishlist = useCartStore((state) => state.setWishlist);
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
  };

  const handleAddToCart = (item, e) => {
    e.stopPropagation();
    addToCart({ ...item, quantity: 1 }); // assuming addToCart expects a full item with quantity
    removeFromWishlist(item.id); // optional: remove from wishlist after adding to cart
  };

  return (
    <div className="w-full flex flex-col items-center px-4 py-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">MY WISHLIST</h2>

      {wishlist.length === 0 ? (
        <div className="text-gray-400 text-lg mt-12">No items in wishlist.</div>
      ) : (
        <div className="w-full max-w-5xl space-y-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow rounded-xl p-4 hover:shadow-lg transition cursor-pointer"
              onClick={() =>
                item.product_code && router.push(`/dashboard/${item.product_code}`)
              }
            >
              {/* Left: Image + Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded bg-gray-100 overflow-hidden flex items-center justify-center">
                  <img
                    src={item.image || "/placeholder.png"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder.png";
                    }}
                  />
                </div>

                <div className="flex flex-col">
                  <div className="text-sm sm:text-base font-semibold text-gray-900">
                    {item.name}
                  </div>
                  {item.brand && (
                    <div className="text-xs text-gray-500">
                      Brand: {item.brand}
                    </div>
                  )}
                  {item.product_code && (
                    <div className="text-xs text-gray-500">
                      Code: {item.product_code}
                    </div>
                  )}
                  <div className="text-green-600 font-bold text-sm mt-1">
                    Rs. {item.price}
                  </div>
                </div>
              </div>

              {/* Right: Add to Cart + Remove */}
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => handleAddToCart(item, e)}
                  className="bg-[#0072bc] text-white px-4 py-2 text-sm rounded  transition cursor-pointer hover:bg-[#005f9a]"
                >
                  Add to Cart
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(item.id);
                  }}
                  className="text-red-500 hover:text-red-600 cursor-pointer transition"
                  title="Remove"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
