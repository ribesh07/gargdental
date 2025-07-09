"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/utils/config";
import useInfoModalStore from "@/stores/infoModalStore";
import useWarningModalStore from "@/stores/warningModalStore";
import { signIn } from "next-auth/react";
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
        useInfoModalStore.getState().open({
          title: "Success",
          message: `Account created. Move to Verification ${data.code}!`,
          onOkay: () =>
            router.push(
              `/account/verify?email=${encodeURIComponent(data.email)}`
            ),
        });
      } else {
        useWarningModalStore.getState().open({
          title: "Error",
          message: data.message || "Registration failed",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      useWarningModalStore.getState().open({
        title: "Error",
        message: "Something went wrong. Please try again.",
      });
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
            {/* Google Auth */}
            <div>
              <button
                type="button"
                onClick={() => signIn("google")}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3 mb-6 shadow hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <g>
                    <path
                      fill="#4285F4"
                      d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C36.45 2.36 30.6 0 24 0 14.82 0 6.73 5.8 2.69 14.09l7.98 6.2C12.13 13.36 17.57 9.5 24 9.5z"
                    />
                    <path
                      fill="#34A853"
                      d="M46.1 24.55c0-1.64-.15-3.22-.43-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.59C43.98 37.13 46.1 31.36 46.1 24.55z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.67 28.29c-1.13-3.36-1.13-6.97 0-10.33l-7.98-6.2C.7 16.36 0 20.07 0 24c0 3.93.7 7.64 2.69 12.24l7.98-6.2z"
                    />
                    <path
                      fill="#EA4335"
                      d="M24 48c6.6 0 12.15-2.18 16.19-5.95l-7.19-5.59c-2.01 1.35-4.6 2.15-7.5 2.15-6.43 0-11.87-3.86-13.33-9.29l-7.98 6.2C6.73 42.2 14.82 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </g>
                </svg>
                <span className="text-gray-700 font-medium">
                  Signup with Google
                </span>
              </button>
            </div>
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
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
              >
                CREATE ACCOUNT
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/account")}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
