"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/utils/config";
import useInfoModalStore from "@/stores/infoModalStore";
import useWarningModalStore from "@/stores/warningModalStore";
// import toast from "react-hot-toast";

export default function AuthPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: "",
    phone: "",
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "").slice(0, 10);
      setFormData((prev) => ({
        ...prev,
        [name]: numericValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  //account creation
  const handleCreateAccount = async () => {
    try {
      const response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          first_name: formData.firstname,
          last_name: formData.lastname,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Register Response:", data);

      if (response.ok) {
        useInfoModalStore.getState().open({ title: "Success", message: `Account created. Move to Verification ${data.code}!`, onOkay: () => router.push(`/account/verify?email=${encodeURIComponent(data.email)}`) });
      } else {
        useWarningModalStore.getState().open({ title: "Error", message: data.message || "Registration failed" });
      }
    } catch (error) {
      console.error("Error:", error);
      useWarningModalStore.getState().open({ title: "Error", message: "Something went wrong. Please try again." });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600 mb-2">
            CREATE ACCOUNT
          </h1>
        </div>
        <div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="register-firstname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name *
              </label>
              <input
                required
                type="text"
                id="register-firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                placeholder="Enter First Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-gray-50"
              />
            </div>
            <div>
              <label
                htmlFor="register-lastname"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name *
              </label>
              <input
                required
                type="text"
                id="register-lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                placeholder="Enter Last Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-gray-50"
              />
            </div>
            <div>
              <label
                htmlFor="register-email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                E-MAIL *
              </label>
              <input
                required
                type="email"
                id="register-email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter E-mail"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-gray-50"
              />
            </div>
            <div>
              <label
                htmlFor="register-phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mobile Number *
              </label>
              <input
                required
                type="tel"
                id="register-phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter Mobile Number"
                maxLength={10}
                pattern="[0-9]*"
                inputMode="numeric"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-gray-50"
              />
            </div>

            <div>
              <label
                htmlFor="register-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                PASSWORD *
              </label>
              <input
                required
                type="password"
                id="register-password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-gray-50"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                CONFIRM PASSWORD *
              </label>
              <input
                required
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-gray-50"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={handleCreateAccount}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                CREATE ACCOUNT
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/account")}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
