"use client";
import { useState } from "react";
import { baseUrl } from "./config";
import { apiRequest, apiPostRequest } from "./ApiSafeCalls";
import { getCustomerInfo } from "./customerApi";
import useCartStore from "@/stores/useCartStore";
import { toast } from "react-hot-toast";
import useInfoModalStore from "@/stores/infoModalStore";
import useWarningModalStore from "@/stores/warningModalStore";

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
    const response = await getCustomerInfo();
    if (response.success && response.data) {
      const { id, full_name, phone, email, image_full_url, created_at } =
        response.data;

      return {
        id,
        full_name,
        phone,
        email,
        image_full_url: image_full_url || null,
        created_at,
      };
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    console.log(
      "Something went wrong. Please try again. Error: " + err.message
    );
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
      quantity: quantity,
      price: price,
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
      console.log(response.message);
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

//handle order buy now
export const handleOrderBuyNow = async (orderData) => {
  try {
    const response = await apiRequest("/customer/order/buy-now", true, {
      method: "POST",
      body: JSON.stringify(orderData),
    });
    // console.log("response from handleOrderBuyNow", orderData);
    // console.log("response from handleOrderBuyNow", response);
    if (response.success) {
      // useInfoModalStore.getState().open({
      //   title: "Info",
      //   message: response.message || "Order placed successfully",
      // });
      return response;
    } else {
      useWarningModalStore.getState().open({
        title: "Error",
        message: response.message || "Something went wrong. Please try again.",
      });
      return {
        success: false,
        message: response.message || "Something went wrong. Please try again.",
      };
    }
  } catch (err) {
    console.error("Error handling order buy now:", err);
    useWarningModalStore.getState().open({
      title: "Error",
      message: err.message || "Something went wrong. Please try again.",
    });
    return {
      success: false,
      message: err.message || "Something went wrong. Please try again.",
    };
  }
};

//handle order
export const handleOrder = async (orderData) => {
  try {
    const response = await apiRequest("/customer/order/add", true, {
      method: "POST",
      body: JSON.stringify(orderData),
    });
    console.log("Order data in api :", orderData);
    console.log("response from handleOrder", response);
    if (response.success) {
      useInfoModalStore.getState().open({
        title: "Info",
        message: response.message || "Order placed successfully",
      });
      return response;
    } else {
      useWarningModalStore.getState().open({
        title: "Error",
        message: response.message || "Something went wrong. Please try again.",
      });
      return {
        success: false,
        message: response.message || "Something went wrong. Please try again.",
      };
    }
  } catch (err) {
    console.error("Error handling order:", err);
    useWarningModalStore.getState().open({
      title: "Error",
      message: err.message || "Something went wrong. Please try again.",
    });
    return {
      success: false,
      message: err.message || "Something went wrong. Please try again.",
    };
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
        id: city.id || "N/A",
        name: city.city || "N/A",
        province_id: province.id,
      }))
    );

    const zones = response.data.flatMap((province) =>
      province.cities.flatMap((city) =>
        city.zones.map((zone) => ({
          id: zone.id || "N/A",
          zone_name: zone.zone_name || "N/A",
          city_id: city.id || "N/A",
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

//get full info
export const getFullInfo = async () => {
  try {
    const response = await apiRequest("/customer/info", true);
    if (response.success) {
      const details = response.data;
      const addresses = response.addresses || [];

      const homeAddress =
        addresses.find((addr) => addr.address_type === "H") || null;
      const officeAddress =
        addresses.find((addr) => addr.address_type === "O") || null;
      const defaultBillingAddress =
        addresses.find((addr) => addr.default_billing === "Y") || null;

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
        city: addr.city?.city || "N/A",
        default_billing: addr.default_billing,
        default_shipping: addr.default_shipping,
      }));

      console.log("All addresses:", allAddresses);
      console.log("\nhome address", homeAddress);
      console.log("\noffice address", officeAddress);
      console.log("\ndefault billing address", defaultBillingAddress);

      return {
        success: true,
        data: details,
        allAddresses,
        homeAddress,
        defaultBillingAddress,
        officeAddress,
      };
    } else {
      return { error: response.message };
    }
  } catch (err) {
    console.error("Error getting full info:", err);
    return { error: err.message };
  }
};

//delete address
export const deleteCustomerAddress = async (addressId) => {
  try {
    const response = await apiRequest(
      `/customer/address/remove/${addressId}`,
      true,
      {
        method: "DELETE",
      }
    );
    console.log("response from deleteCustomerAddress", response);
    if (response.success) {
      return {
        success: true,
        message: response.message || "Address deleted successfully",
      };
    } else {
      return {
        success: false,
        message: response.message || "Failed to delete address",
      };
    }
  } catch (err) {
    console.error("Error deleting address:", err);
    return { success: false, message: "An unexpected error occurred" };
  }
};

//update address
export const updateCustomerAddress = async (addressId, addressData) => {
  try {
    // Map the incoming addressData to the API's expected payload
    const payload = {
      full_name: addressData.full_name,
      phone: addressData.phone,
      province: addressData.province_id,
      city: addressData.city_id,
      zone: addressData.zone_id,
      address: addressData.address,
      address_type: addressData.address_type || "H",
      default_shipping: addressData.default_shipping || "N",
      default_billing: addressData.default_billing || "N",
      landmark: addressData.landmark,
    };

    const response = await apiRequest(
      `/customer/address/update/${addressId}`,
      true,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
    console.log("response from updateCustomerAddress", response);
    if (response.success) {
      toast.success(response.message);
      return {
        success: true,
        message: response.message || "Address updated successfully",
      };
    } else {
      toast.error(response.message);
      return {
        success: false,
        message: response.message || "Failed to update address",
      };
    }
  } catch (err) {
    console.error("Error updating address:", err);
    return { success: false, message: "An unexpected error occurred" };
  }
};

//add address
export const addCustomerAddress = async (addressData) => {
  try {
    const payload = {
      full_name: addressData.full_name,
      phone: addressData.phone,
      province: addressData.province_id,
      city: addressData.city_id,
      zone: addressData.zone_id,
      address: addressData.address,
      address_type: addressData.address_type || "H",
      default_shipping: addressData.default_shipping || "N",
      default_billing: addressData.default_billing || "N",
      landmark: addressData.landmark,
    };
    const response = await apiRequest(`/customer/address/add`, true, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    console.log("response from addCustomerAddress", response);
    console.log("response.success", response.success);
    // const responseData = await response.json();
    // console.log("responseData", responseData);
    if (response.success) {
      // console.log("response.message", response.message);
      toast.success(response.message);
      return {
        success: true,
        message: response.message || "Address added successfully",
        data: response.data,
      };
    } else {
      if (!response.success) {
        const errorBody = response;

        const errorMessage =
          errorBody?.errors?.[0]?.message ||
          errorBody?.message ||
          "Something went wrong";

        toast.error(errorMessage);
        console.log("errorMessage", errorMessage);
        return {
          success: false,
          message: errorMessage,
        };
      }
    }
  } catch (err) {
    console.error("Error adding address:", err);
    return { success: false, message: "An unexpected error occurred" };
  }
};

//get address
export const getAddress = async () => {
  try {
    const response = await apiRequest("/customer/address/list", true);
    // return response;
    if (response.success) {
      console.log("response from getAddress", response.addresses);
      const allAddresses = response.addresses.map((addr) => ({
        id: addr.id,
        full_name: addr.full_name,
        phone: addr.phone,
        address: addr.address,
        landmark: addr.landmark,
        address_type: addr.address_type,
        city_id: addr.city_id,
        city_name: addr.city?.city || "N/A",
        shipping_cost: addr.city?.shipping_cost || 0,
        province_name: addr.province?.province_name || "N/A",
        province_id: addr.province_id,
        zone_id: addr.zone_id,
        zone_name: addr.zone?.zone_name || "N/A",
        default_billing: addr.default_billing,
        default_shipping: addr.default_shipping,
      }));

      const defaultBillingAddress = response.addresses.find(
        (addr) => addr.default_billing === "Y"
      );
      const defaultShippingAddress = response.addresses.find(
        (addr) => addr.default_shipping === "Y"
      );
      return {
        defaultBillingAddress,
        defaultShippingAddress,
        allAddresses,
      };
    } else {
      return { error: response.message };
    }
  } catch (err) {
    console.error("Error getting address:", err);
    return { error: err.message };
  }
};

//get customer orders
export const getCustomerOrders = async () => {
  try {
    const response = await apiRequest("/customer/order/list", true);
    console.log("response from getCustomerOrders", response);
    if (response.success) {
      return {
        success: true,
        orders: response.orders || [],
      };
    } else {
      return {
        success: false,
        error: response.message || "Failed to fetch orders",
      };
    }
  } catch (err) {
    console.error("Error getting customer orders:", err);
    return {
      success: false,
      error: err.message || "An unexpected error occurred",
    };
  }
};

// Fetch compliances (Company info Business Registration, Medical Certifications, Return & Refund Policy, Privacy Policy)
export const fetchCompliances = async () => {
  try {
    const response = await fetch(`${baseUrl}/compliances`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching compliances:", err);
    return { error: err.message };
  }
};

// Get cancellation reasons
export const getCancellationReasons = async () => {
  try {
    const response = await apiRequest("/customer/order/reasons-list", true);
    if (response.success) {
      return {
        success: true,
        reasons: response.reasons || [],
      };
    } else {
      return {
        success: false,
        error: response.message || "Failed to fetch cancellation reasons",
      };
    }
  } catch (err) {
    console.error("Error getting cancellation reasons:", err);
    return {
      success: false,
      error: err.message || "An unexpected error occurred",
    };
  }
};

// Cancel order
export const cancelOrder = async (
  orderId,
  reasonId,
  reasonDescription,
  iAgree
) => {
  try {
    console.log("Cancelling order with details:");
    console.log(orderId, reasonId, reasonDescription, iAgree);
    const response = await apiRequest("/customer/order/cancel", true, {
      method: "POST",
      body: JSON.stringify({
        order_id: orderId,
        reason_id: reasonId,
        reason_description: reasonDescription,
        policy_checked: iAgree || "Y",
      }),
    });

    if (response.success) {
      // toast.success(response.message || "Order cancelled successfully");
      return {
        success: true,
        message: response.message || "Order cancelled successfully",
        order_id: response.order_id,
      };
    } else {
      console.log("Failed to cancel order:", response);
      toast.error(response?.errors[0].message || "Failed to cancel order");
      return {
        success: false,
        error: response?.errors?.[0]?.message || "Failed to cancel order",
      };
    }
  } catch (err) {
    // console.error("Error cancelling order:", err);
    toast.error("An unexpected error occurred");
    return {
      success: false,
      error: err.message || "An unexpected error occurred",
    };
  }
};

// Get cancelled orders
export const getCancelledOrders = async (status) => {
  console.log("Inside function :", status);
  try {
    const response = await apiRequest(
      `/customer/order/list?status=${status}`,
      true
    );
    if (response.success) {
      return {
        success: true,
        orders: response.orders || [],
      };
    } else {
      return {
        success: false,
        error: response.message || "Failed to fetch cancelled orders",
      };
    }
  } catch (err) {
    console.error("Error getting cancelled orders:", err);
    return {
      success: false,
      error: err.message || "An unexpected error occurred",
    };
  }
};

// Submit grievance form
export const submitGrievance = async (formData) => {
  try {
    const response = await apiRequest("/customer/grievance", true, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    if (response.success) {
      // Optionally show a toast here if you want
      return {
        success: true,
        message: response.message || "Grievance submitted successfully",
        data: response.data,
      };
    } else {
      // Optionally show a toast here if you want
      return {
        success: false,
        message: response.message || "Failed to submit grievance",
        errors: response.errors || [],
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err.message || "An unexpected error occurred",
      errors: [],
    };
  }
};

// Wishlist API helpers
export const getWishlist = async () => {
  try {
    const response = await apiRequest("/customer/wishlist/list", true);
    console.log("response from getWishlist", response);
    if (response.success) {
      return response;
    } else {
      toast.error(response.message || "Failed to fetch wishlist !");
      return [];
    }
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    return [];
  }
};

export const addToWishlist = async (product_code) => {
  try {
    const response = await apiPostRequest(
      "/customer/wishlist/add",
      {
        product_code,
      },
      true
    );
    return response;
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    return { success: false, message: err.message };
  }
};

export const removeFromWishlist = async (item_id) => {
  try {
    const response = await apiRequest("/customer/wishlist/remove-item", true, {
      method: "DELETE",
      body: JSON.stringify({ item_id }),
    });
    return response;
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    return { success: false, message: err.message };
  }
};
