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
import GoogleLoginButton from "@/components/GoogleLogin";
import RefreshOnFirstLoad from "@/components/RefreshOnFirstLoad";

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
      console.log(data.message);

      if (data.success) {
        router.replace("/dashboard");
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
          toast.success("Login successful !");

          console.log("Token saved:", data.token);
        }
        // router.push("/dashboard");
        // router.replace("/dashboard");

        // success
      } else {
        console.warn("Login failed:", data);
        useWarningModalStore.getState().open({
          title: "Error",
          message: data.message || "Invalid Gmail or Password",
        });
      }
    } catch (error) {
      // console.error("Error during login:", error);
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
    <>
      <RefreshOnFirstLoad />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
          <div className="text-center mb-1">
            <h1 className="text-2xl font-bold text-blue-600">
              ALREADY REGISTERED?
            </h1>
          </div>

          <div>
            {/* Google Auth */}
            <div className="flex flex-col justify-center my-2">
              {/* <h1>Login with Google</h1> */}
              <div className="max-w-full w-full flex -mb-2 mt-1 justify-center align-center">
                <GoogleLoginButton />
              </div>
              <span className="text-center font-bold text-[18px] mt-2 text-gray-700">
                or,
              </span>
            </div>

            <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-1">
              SIGN IN
            </h2>

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
    </>
  );
}
