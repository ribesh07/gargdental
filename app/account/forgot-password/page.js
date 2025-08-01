"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import useWarningModalStore from "@/stores/warningModalStore";
import { baseUrl } from "@/utils/config";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);

  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSendVerificationCode = () => {
    if (!email.trim()) {
      useInfoModalStore
        .getState()
        .open({ title: "Info", message: "Please enter your email address" });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      useInfoModalStore
        .getState()
        .open({ title: "Info", message: "Please enter a valid email address" });
      return;
    }
    setIsLoading(true);
    setTimeout(async () => {
      setIsLoading(false);
      try {
        const response = await fetch(`${baseUrl}/auth/forgot-password-code`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        });
        const data = await response.json();
        if (data.success) {
          setIsCodeSent(true);
          console.log("Verification code sent successfully");
          console.log(data.code);
          router.push(
            `/account/forgot-password/verify?email=${encodeURIComponent(email)}`
          );
        } else {
          useWarningModalStore.getState().open({
            title: "Error",
            message:
              data.errors[0].message || "Failed to send verification code",
          });
        }
      } catch (error) {
        // console.error("Error:", error);
        useWarningModalStore.getState().open({
          title: "Error",
          message: "Something went wrong. Please try again.",
        });
      }
    }, 1500);
  };

  const handleCancel = () => {
    console.log("Cancelling password reset");
    router.push("/account");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            FORGOT PASSWORD?
          </h1>
        </div>

        {/* Password Reset Form */}
        <div className="border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Password Reset
          </h2>

          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                E-MAIL *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter E-mail"
                className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-gray-50 text-lg"
              />
            </div>

            {/* Send Verification Code Button */}
            <div className="pt-4">
              <button
                onClick={handleSendVerificationCode}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? "SENDING..." : "SEND VERIFICATION CODE"}
              </button>
            </div>

            {/* Success Message */}
            {isCodeSent && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      Verification code has been sent to your email address.
                      Please check your inbox and spam folder.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cancel Button */}
        <div className="text-center">
          <button
            onClick={handleCancel}
            className="w-full bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
          >
            CANCEL
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Remember your password?
            <button
              onClick={handleCancel}
              className="text-blue-600 hover:text-blue-800 font-medium ml-1 transition-colors cursor-pointer"
            >
              Back to Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
