import useCartStore from "@/stores/cartStore";

const CartPage = () => {
  const cart = useCartStore((state) => state.cart);

  return (
    <div>
      {cart.map((item) => (
        <div key={item.id}>
          <img src={item.image_url} className="w-20 h-20" />
          <h2>{item.product_name}</h2>
          <p>{item.description}</p>
          <p>Rs. {item.sell_price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
    </div>
  );
};
export default CartPage;
