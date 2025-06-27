"use client";
import { useState } from "react";
import { baseUrl } from "./config";
import { apiRequest, apiPostRequest } from "./ApiSafeCalls";
import useCartStore from "@/stores/useCartStore";
const API_URL = `${baseUrl}/products/latest`;

const fetchProducts = async (count) => {
  const visibleCount = count;

  var visibleProducts = [];
  //   setLoading(true);
  //   setError(null);

  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    // const limited = data.products?.slice(0, 10) || [];
    // Transform the API data to match the expected format
    const transformedProducts =
      data.products?.map((product) => ({
        id: product.id,
        product_name: product.product_name,
        product_code: product.product_code,
        brand: product.brand?.brand_name || "No Brand",
        category: product.category?.category_name || "Uncategorized",
        item_number: `#${product.product_code}`,
        actual_price: product.actual_price,
        sell_price: product.sell_price,
        image_url:
          product.image_full_url ||
          "https://garg.omsok.com/storage/app/public/backend/productimages/werfas/2025_04_09_67f642c43e68d_removebg_preview_1.png",
        description: product.product_description,
        available_quantity: product.available_quantity,
        unit_info: product.unit_info,
        flash_sale: product.flash_sale === "1",
        delivery_days: product.delivery_target_days,
      })) || [];

    visibleProducts = transformedProducts.slice(0, visibleCount);
    // setProducts(visibleProducts);

    console.warn(
      `Transformed products: ${JSON.stringify(transformedProducts)}`
    );
    return visibleProducts;
  } catch (err) {
    return [{ error: err.message }];
  } finally {
    console.warn(`Visible products: ${JSON.stringify(visibleProducts)}`);
  }
};

export default fetchProducts;

export const userDetails = async () => {
  try {
    const response = await apiRequest("/customer/info");
    if (response && response.data) {
      const { id, full_name, phone, email, image_full_url, created_at } =
        response.data;

      return {
        id,
        full_name,
        phone,
        email,
        image_full_url: image_full_url || "",
        created_at,
      };
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    alert("Something went wrong. Please try again. Error: " + err.message);
  }
};

//  const test = await userDetails();
//     console.log(test.phone + "test");

//for related products
export const fetchRelatedProducts = async (product_code) => {
  try {
    const response = await apiRequest(
      `/products/related-products/${product_code}`,
      false
    );
    if (
      response &&
      response.related_products &&
      Array.isArray(response.related_products)
    ) {
      return response.related_products.map((product) => ({
        id: product.id,
        code: product.product_code,
        brand: product.brand_id, // brand_id is present, actual brand name may need another lookup
        category: product.category_id, // category_id is present, actual category name may need another lookup
        image: product.image_full_url,
        actualprice: product.actual_price,
        sellprice: product.sell_price,
      }));
    } else {
      return [];
    }
  } catch (err) {
    console.error("Error fetching related products:", err);
    return [{ error: err.message }];
  }
};

//Add to cart
export const getCartSummary = (cartResponse) => {
  if (
    !cartResponse ||
    !cartResponse.cart ||
    !Array.isArray(cartResponse.cart.items)
  ) {
    return { subtotal: 0, totalItems: 0 };
  }

  const subtotal = cartResponse.cart.subtotal;
  const totalItems = cartResponse.cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  console.log(subtotal, totalItems);
  return { subtotal, totalItems }; //return subtotal and total items
};

export const addToCart = async (product_code, quantity, price) => {
  try {
    console.log(product_code, quantity, price);
    const response = await apiPostRequest("/customer/cart/add", {
      product_code: product_code,
      price: price,
      quantity: quantity,
    });
    if (response.success) {
      const cartResponse = await getCart();
      const { subtotal, totalItems } = getCartSummary(cartResponse);
      console.log(subtotal, totalItems);

      return response;
    } else {
      alert(response.message);
    }
  } catch (err) {
    console.error("Error adding to cart:", err);
    return [{ error: err.message }];
  }
};

//Get cart
export const getCart = async () => {
  try {
    const response = await apiRequest(`/customer/cart/list`, true);
    const cartResponse = getCartSummary(response);
    console.log(cartResponse);
    return cartResponse;
  } catch (err) {
    console.error("Error getting cart:", err);
    return [{ error: err.message }];
  }
};

//update cart
export const updateCart = async (items) => {
  try {
    const response = await apiPostRequest("/customer/cart/update", { items });

    if (response.success) {
      const state = useCartStore.getState();
      const existingCart = state.cart;

      // Merge updated items into existing cart
      const updatedItems = existingCart.items.map((item) => {
        const updated = response.cart.items.find(
          (u) => u.product_code === item.product_code
        );
        if (updated) {
          return { ...item, quantity: updated.quantity };
        }
        return item;
      });

      useCartStore.setState({
        cart: {
          ...existingCart,
          items: updatedItems,
          subtotal: response.cart.subtotal || existingCart.subtotal,
        },
      });

      return response;
    } else {
      console.error("Failed to update cart:", response.message);
      return response;
    }
  } catch (err) {
    console.error("Error updating cart:", err);
    return { error: err.message };
  }
};
