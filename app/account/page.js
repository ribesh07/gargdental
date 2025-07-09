"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/utils/config";
import Cookies from "js-cookie";
import useInfoModalStore from "@/stores/infoModalStore";
import useWarningModalStore from "@/stores/warningModalStore";
// import toast from "react-hot-toast";
import useCartStore from "@/stores/useCartStore";
import { getFullInfo } from "@/utils/apiHelper";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { userProfile, setUserProfile } = useCartStore();
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

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log("Base URL:", baseUrl);

      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        console.log("Login successful:", data);

        if (data.token) {
          localStorage.setItem("token", data.token);
          await fetch("/api/auth/set-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: data.token }),
          });
          const result = await getFullInfo();
          setUserProfile(result.data);
          //Feature removed
          // useInfoModalStore
          //   .getState()
          //   .open({ title: "Info", message: "Login successful" });
          toast.success("Login successful !");

          console.log("Token saved:", data.token);
        }

        // success
        router.push("/dashboard");
      } else {
        // console.error("Login failed:", data);
        useWarningModalStore.getState().open({
          title: "Error",
          message: data.message || "Invalid Gmail and Password",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      useInfoModalStore.getState().open({
        title: "Info",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600 mb-2">
            ALREADY REGISTERED?
          </h1>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-6">SIGN IN</h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                E-MAIL *
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter E-mail"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-gray-50"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                PASSWORD *
              </label>
              <input
                required
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-gray-50"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={handleSignIn}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
              >
                LOGIN
              </button>
              <button
                type="button"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors cursor-pointer"
                onClick={() => router.push("/account/forgot-password")}
              >
                Lost Your Password?
              </button>
            </div>

            {/* Google Auth */}
            <div>
              <button
                type="button"
                onClick={() => signIn("google")}
                className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3 mb-6 shadow hover:bg-gray-50 transition-colors"
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
                  Sign in with Google
                </span>
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              I'M NEW CUSTOMER
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              By creating an account with our store, you will be able to move
              through the checkout process faster, store shipping addresses,
              view and track your orders in your account and more.
            </p>
            <button
              onClick={() => router.push("/account/signup")}
              className="w-full bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            >
              CREATE AN ACCOUNT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
