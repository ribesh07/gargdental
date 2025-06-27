"use client"
// app/cart/page.jsx

async function getCartData() {
    const res = await fetch("https://garg.omsok.com/api/v1/customer/cart/list", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzhkZjE5NDhiOTRjMTVhYjU4MzIzYTE1YTk1YWZjOGMxOGMwMDQzMmVkYzMyZmFhN2RiNzZkYTcxMmU1MzUyNDIyMzdlNTE3NDFlNDRmODgiLCJpYXQiOjE3NTA2NzY0MDQuNTgxMzcyMDIyNjI4Nzg0MTc5Njg3NSwibmJmIjoxNzUwNjc2NDA0LjU4MTM3MzkyOTk3NzQxNjk5MjE4NzUsImV4cCI6MTc4MjIxMjQwNC41Njg1Mjg4OTA2MDk3NDEyMTA5Mzc1LCJzdWIiOiIyNyIsInNjb3BlcyI6W119.rQXdJOZ9ECBEt2EZF49Bht6j69mKrKxImwdsynodELRrFAnKd0mxZI5HfwUSYdxzAhJKeuWSeSAH2v2QbS7p3HuDjlSveXf9fUq0PjbeLnnEaEaqqY8LDc0FB6V6Yx07TuHJSqhUc2wEAUuDfe_N9qrf3Vrk1V4WBn52T63gjQAkuYIHiz1HPnOl9Oe8gxaYu6-j1viseE3EHAHLlYvfuCIm0BHWIvyD0tge0pUAAW0mrzQPC-RiwazA62J8iNUvEIvGk8OmObsGKhDFg4RWHlm6mYPU9jqIU_YWJU3qxJz-wqHg4_HP5OUtAW12em4gNFAQnuO-luDDVl76vTaG4M0YlZGUdcHEIWpGpOBoGMnZWjr0We8IrYcJrKQaSfRRY87S9XPhlP-_8JNWBUaQu-l-xo9uBMovO2WYgKcitwyCMsnT4oQs7wpVbT2rCq2__WKPcgChrBjUOOSidPij8l0NWHy_N1bQRTxu0dycUJ8uqIK_aYI1tI1YTKVMI0iPYIg2IWD7JA8rVN0sr-l9Ewnkvs_BwcJXij15b8hO642aEWKW7T3xl-SMeTCaZxbS-RtZEioPzsMsL57tWEg8fAS1ZD9_9EedqnXSiRiy4QQB60RUcZf7W6a0UmlEjKs1GgRyA3ft0Oe7pZoxGIIQehm8VfSQSjLIymgJcl6nRYg"
      },
      cache: "no-store"
    });
  
    if (!res.ok) throw new Error("Failed to fetch cart");
  
    const data = await res.json();
    return data.cart;
  }
  
  export default async function CartPage() {
    const cart = await getCartData();
  
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>
        <p className="text-sm text-gray-500 mb-6">Subtotal: NPR {cart.subtotal}</p>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cart.items.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center border rounded-lg p-4 shadow-md"
            >
              <img
                src={item.product.image_full_url}
                alt={item.product.product_name}
                className="w-40 h-auto mb-2"
              />
              <h2 className="font-semibold text-lg text-center">
                {item.product.product_name}
              </h2>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-green-700 font-medium">Price: NPR {item.price}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  