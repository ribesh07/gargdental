"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/utils/ApiSafeCalls";
// import { userDetails } from "@/utils/apiHelper";

export default function Profile() {
  const [userData, setUserData] = useState({
    id: null,
    full_name: "",
    phone: "",
    email: "",
    image_full_url: "",
    created_at: "",
  });
  const [d1, setD1] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/account");
      return;
    }
    getInfo();
  }, []);

  const getInfo = async () => {
    try {
      const response = await apiRequest("/customer/info");

      if (response && response.data) {
        const { id, full_name, phone, email, image_full_url, created_at } =
          response.data;

        setUserData({
          id,
          full_name,
          phone,
          email,
          image_full_url: image_full_url || "",
          created_at,
        });
      } else {
        alert("Invalid response from server " + response.message);
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again. Error: " + err.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <p>
        <strong>Full Name:</strong> {userData.full_name}
      </p>
      <p>
        <strong>Email:</strong> {userData.email}
      </p>
      <p>
        <strong>Phone:</strong> {userData.phone}
      </p>
      <p>
        <strong>Joined:</strong> {userData.created_at}
      </p>
    </div>
  );
}
