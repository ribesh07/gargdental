import useCartStore from "@/stores/cartStore";

const CartPage = () => {
  const cart = useCartStore((state) => state.cart);

  return (
    <div className="p-2 sm:p-4 max-w-4xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-center mb-4 sm:mb-6 tracking-wide text-gray-500 break-words">YOUR SHOPPING CART</h1>
      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div key={item.id} className="bg-gray-50 rounded-xl shadow p-3 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
              <img src={item.image_url} alt={item.product_name} className="object-contain w-full h-full" />
            </div>
            <div className="flex-1 w-full flex flex-col gap-2">
              <h2 className="font-semibold text-base sm:text-lg text-gray-800 break-words">{item.product_name}</h2>
              <p className="text-gray-500 text-xs sm:text-sm break-words">{item.description}</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
                <div className="flex flex-row items-center gap-2 sm:gap-3">
                  <span className="text-gray-500 text-xs sm:text-sm">Rs.</span>
                  <span className="font-bold text-base sm:text-lg">{item.sell_price || item.price}</span>
                </div>
                <div className="flex flex-row items-center gap-2 sm:gap-3">
                  <button className="w-8 h-8 bg-gray-200 rounded text-lg font-bold flex items-center justify-center">-</button>
                  <span className="w-8 text-center text-base sm:text-lg">{item.quantity}</span>
                  <button className="w-8 h-8 bg-gray-200 rounded text-lg font-bold flex items-center justify-center">+</button>
                </div>
                <div className="flex flex-col items-center gap-1 sm:flex-row sm:items-center sm:gap-3 w-full sm:w-auto">
                  <span className="text-green-600 font-bold text-base sm:text-lg">Rs. {(item.sell_price || item.price) * item.quantity}</span>
                  <button className="text-red-500 hover:text-red-700 mt-1 sm:mt-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CartPage;
