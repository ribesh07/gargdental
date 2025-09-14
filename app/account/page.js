"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/utils/config";
import Cookies from "js-cookie";
import useInfoModalStore from "@/stores/infoModalStore";
import useWarningModalStore from "@/stores/warningModalStore";
import useAccountReload from "./AccountRefresh";
// import toast from "react-hot-toast";
import useCartStore from "@/stores/useCartStore";
import { getFullInfo } from "@/utils/apiHelper";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import GoogleLoginButton from "@/components/GoogleLogin";
// import RefreshOnFirstLoad from "@/components/RefreshOnFirstLoad";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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
      // console.log("Base URL:", baseUrl);

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
        // toast.error(data.message || "Invalid Gmail or Password");
      }
    } catch (error) {
      useWarningModalStore.getState().open({
        title: "Info",
        message: "Something went wrong. Please try again.",
      });
      // toast.error("Something went wrong. Please try again later !");
    } finally {
      setIsLoading(false);
    }
  };

  useAccountReload();

  return isLoading ? (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ) : (
    <>
      {/* <RefreshOnFirstLoad /> */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-md p-8">
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
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter Password"
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-gray-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.757 6.757M9.878 9.878a3 3 0 00-.878 2.122m4.242 4.242L19.123 19.123M14.121 14.121a3 3 0 00.878-2.122m-4.242 4.242l4.242-4.242m0-5.656l-4.242 4.242M6.757 6.757l4.121 4.121"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
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
                className="w-full bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
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