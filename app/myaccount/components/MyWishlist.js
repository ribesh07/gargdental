import useCartStore from "@/stores/useCartStore";
import { useRouter } from "next/navigation";

export default function MyWishlist() {
  const wishlist = useCartStore((state) => state.wishlist) || [];
  const setWishlist = useCartStore((state) => state.setWishlist);
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-900 mb-4">
        MY WISHLIST
      </h2>
      {wishlist.length > 0 && (
        <button
          className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => setWishlist([])}
        >
          Clear Wishlist
        </button>
      )}
      {wishlist.length === 0 ? (
        <div className="text-gray-400 text-lg mt-12">No items in wishlist.</div>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center cursor-pointer hover:shadow-xl hover:ring-2 hover:ring-blue-400 transition"
              onClick={() => {
                if (item.product_code) {
                  router.push(`/dashboard/${item.product_code}`);
                }
              }}
              title="View Product"
            >
              <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center overflow-hidden mb-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    e.target.src = "/placeholder.png";
                  }}
                />
              </div>
              <div className="font-semibold text-gray-800 text-center text-lg mb-1">
                {item.name}
              </div>
              {item.brand && (
                <div className="text-xs text-gray-500 mb-1">
                  Brand: {item.brand}
                </div>
              )}
              {item.product_code && (
                <div className="text-xs text-gray-500 mb-1">
                  Code: {item.product_code}
                </div>
              )}
              {item.description && (
                <div className="text-xs text-gray-600 mb-2 text-center">
                  {item.description}
                </div>
              )}
              <div className="text-green-700 font-bold mt-1 text-lg">
                Rs. {item.price}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
