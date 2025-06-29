"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { sortAddressDropdowns } from "@/utils/apiHelper";
import { usePathname } from "next/navigation";

export default function ClientComponent({ token }) {
  const router = useRouter();
  const [addressDropdowns, setAddressDropdowns] = useState({});
  const pathname = usePathname();
  console.log("Token received in ClientComponent:", token);
  if (token !== null) {
    console.log("Token found in ClientComponent and it is not null");
  } else {
    console.log("Token not found in ClientComponent");
  }

  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  useEffect(() => {
    const fetchAddressDropdowns = async () => {
      const response = await sortAddressDropdowns();
      // console.log("response from fetchAddressDropdowns", response);
      setAddressDropdowns(response);
    };
    fetchAddressDropdowns();
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    localStorage.removeItem("token");
    router.push("/dashboard");
    console.log("Logged out successfully");
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
      <p className="text-sm text-red-600 mt-5 max-w-7xl">
        Token received: {token}
      </p>
      <button className="btn btn-primary" onClick={handleLogout}>
        Logout
      </button>
      {addressDropdowns && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold text-red-600">Address Dropdowns</h1>
          <p className="text-sm text-red-500 mt-5">
            Province:{" "}
            {addressDropdowns.provinces
              ? addressDropdowns.provinces
                  .map(
                    (province) =>
                      province.name +
                      " " +
                      province.id +
                      " " +
                      province.province_id
                  )
                  .join(", ")
              : "No provinces available"}
          </p>
          <p className="text-sm text-blue-500 mt-5">
            City:{" "}
            {addressDropdowns.cities
              ? addressDropdowns.cities
                  .map(
                    (city) => city.name + " " + city.id + " " + city.province_id
                  )
                  .join(", ")
              : "No cities available"}
          </p>
          <p className="text-sm text-gray-500 mt-5">
            Zone:{" "}
            {addressDropdowns.zones
              ? addressDropdowns.zones
                  .map(
                    (zone) =>
                      zone.zone_name +
                      " " +
                      zone.id +
                      " " +
                      zone.city_id +
                      " " +
                      zone.province_id
                  )
                  .join(", ")
              : "No zones available"}
          </p>
        </div>
      )}
    </div>
  );
}
