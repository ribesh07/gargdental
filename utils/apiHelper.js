import { useState } from "react";
import { baseUrl } from "./config";
import { apiRequest } from "./ApiSafeCalls";
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
