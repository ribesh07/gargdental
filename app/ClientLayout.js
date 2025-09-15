"use client";
import { useEffect } from "react";
import { useProductStore, useCategoryStore , useManufacturerStore } from "@/stores/InitdataFetch";
import { apiRequest } from "@/utils/ApiSafeCalls";
import { toast } from "react-hot-toast";
import {useFreeShippingStore} from "@/stores/ShippingThreshold"

export default function ClientLayout({ children }) {
  const fetchProducts = useProductStore((s) => s.fetchProducts);
  const fetchCategories = useCategoryStore((s) => s.fetchCategories);
   const { fetchManufacturers } = useManufacturerStore();
  const { setInsideOfValleyThreshold, setOutOfValleyThreshold } = useFreeShippingStore();

    useEffect(() => {
    const fetchSettings = async () => {
      const response = await apiRequest("/settings", false);
      if (response.success) {
       
        const {
          free_shipping_threshold_inside_of_valley,
          free_shipping_threshold_out_of_valley,
        } = response.settings;


        // const freeShippingThreshold = free_shipping_threshold?.value || null;
        const freeShipping_threshold_inside_of_valley = free_shipping_threshold_inside_of_valley?.value || null;
        const freeShipping_threshold_out_of_valley = free_shipping_threshold_out_of_valley?.value || null;
        if (freeShipping_threshold_inside_of_valley && freeShipping_threshold_out_of_valley && !isNaN(parseFloat(freeShipping_threshold_out_of_valley)) && !isNaN(parseFloat(freeShipping_threshold_inside_of_valley))) {
          const thresholdInside = parseFloat(freeShipping_threshold_inside_of_valley);
          const thresholdOutside = parseFloat(freeShipping_threshold_out_of_valley);
          setInsideOfValleyThreshold(thresholdInside);
          setOutOfValleyThreshold(thresholdOutside);
          console.log("Inside of valley threshold from API:", thresholdInside);
          console.log("Outside of valley threshold from API:", thresholdOutside);
        } 
      } else {
        // console.error("Failed to fetch settings:", response.error);
        toast.error(response?.errors[0]?.message || "Failed to fetch settings");

      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    fetchManufacturers(); 
  }, [fetchManufacturers]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []); 

  return <div className="w-full">{children}</div>;
}
