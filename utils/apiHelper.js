"use client";
import { useState } from "react";
import { baseUrl } from "./config";
import { apiRequest, apiPostRequest } from "./ApiSafeCalls";
import useCartStore from "@/stores/useCartStore";
import { toast } from "react-hot-toast";

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
      // Update the local store after successful API call
      if (response.cart) {
        const mappedCartItems = response.cart.items.map((item) => ({
          id: item.id,
          product_code: item.product_code,
          quantity: item.quantity,
          price: parseFloat(item.price),
        }));
        useCartStore.getState().setCart({
          id: response.cart.id,
          items: mappedCartItems,
          subtotal: response.cart.subtotal,
        });
      }
      // toast.success(response.message);
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
export const updateCart = async (id, quantity) => {
  try {
    const response = await apiPostRequest("/customer/cart/update", {
      item_id: id,
      quantity: quantity,
    });

    if (response.success) {
      const mappedCartItems = response.cart.items.map((item) => ({
        id: item.id,
        product_code: item.product_code,
        quantity: item.quantity,
        price: parseFloat(item.price),
        // Assuming you store product name/image in frontend, otherwise need to fetch
      }));
      toast.success(response.message);
      useCartStore.getState().setCart({
        id: response.cart.id,
        items: mappedCartItems,
        subtotal: response.cart.subtotal,
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

//remove cart item

export const removeCartItem = async (item_id) => {
  try {
    const response = await apiRequest(`/customer/cart/remove-item`, true, {
      method: "DELETE",
      body: JSON.stringify({ item_id }),
    });
    if (response.success) {
      // Update the local store after successful API call
      if (response.cart) {
        const mappedCartItems = response.cart.items.map((item) => ({
          id: item.id,
          product_code: item.product_code,
          quantity: item.quantity,
          price: parseFloat(item.price),
        }));
        useCartStore.getState().setCart({
          id: response.cart.id,
          items: mappedCartItems,
          subtotal: response.cart.subtotal,
        });
      }
      toast.success(response.message);
      return response;
    } else {
      console.error("Failed to remove cart item:", response.message);
      return response;
    }
  } catch (err) {
    console.error("Error removing cart item:", err);
    return { error: err.message };
  }
};

//clear cart
export const clearCart = async () => {
  try {
    const response = await apiRequest(`/customer/cart/remove`, true, {
      method: "DELETE",
    });
    if (response.success) {
      // Clear the local store after successful API call
      useCartStore.getState().clearCart();
      toast.success(response.message);
      return response;
    } else {
      console.error("Failed to clear cart:", response.message);
      return response;
    }
  } catch (err) {
    console.error("Error clearing cart:", err);
    return { error: err.message };
  }
};

//get address dropdowns
export const getAddressDropdowns = async () => {
  try {
    const response = await apiRequest(
      `/customer/address/load-address-dropdowns`,
      true
    );
    console.log("response from getAddressDropdowns", response);
    return response;
  } catch (err) {
    console.error("Error getting address dropdowns:", err);
    return { error: err.message };
  }
};

//sort address dropdowns
export const sortAddressDropdowns = async () => {
  const response = await getAddressDropdowns();
  console.log("response from fetchAddressDropdowns", response);
  if (response.success && response.data) {
    // Transform the data to get provinces, cities, and zones
    const provinces = response.data.map((province) => ({
      id: province.id,
      name: province.name,
    }));

    const cities = response.data.flatMap((province) =>
      province.cities.map((city) => ({
        id: city.id,
        name: city.name,
        province_id: province.id,
      }))
    );

    const zones = response.data.flatMap((province) =>
      province.cities.flatMap((city) =>
        city.zones.map((zone) => ({
          id: zone.id,
          zone_name: zone.zone_name,
          city_id: city.id,
          province_id: province.id,
        }))
      )
    );

    const transformedData = {
      provinces,
      cities,
      zones,
    };

    console.log("Transformed data:", transformedData);
    // setAddressDropdowns(transformedData);
    return transformedData;
  } else {
    console.error("Failed to fetch address dropdowns:", response.message);
    // setAddressDropdowns({});
    return { error: response.message };
  }
};

export const getFullInfo = async () => {
  try {
    const response = await apiRequest("/customer/info", true);
    if (response.success) {
      // const { id, full_name, phone, email, image_full_url } = response.data;
      const addresses = response.addresses || [];
      if (addresses.length > 0) {
        const homeAddress = addresses.find((addr) => addr.address_type === "H");
        const defaultBillingAddress = addresses.find(
          (addr) => addr.default_billing === "Y"
        );
        const allAddresses = addresses.map((addr) => ({
          id: addr.id,
          full_name: addr.full_name,
          phone: addr.phone,
          address: addr.address,
          landmark: addr.landmark,
          address_type: addr.address_type,
          city_id: addr.city_id,
          province_id: addr.province_id,
          zone_id: addr.zone_id,
          city: addr.city.city,
          default_billing: addr.default_billing,
          default_shipping: addr.default_shipping,
        }));

        console.log(
          "All addresses:",
          allAddresses +
            "home address" +
            homeAddress +
            "default billing address" +
            defaultBillingAddress
        );
      } else {
        return { error: "No addresses found" };
      }
      return {};
    } else {
      return { error: response.message };
    }
  } catch (err) {
    console.error("Error getting full info:", err);
    return { error: err.message };
  }
};
