"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const searchParams = useSearchParams();
export default function ResetPasswordPage() {
  const email = searchParams.get("email");
  const code = searchParams.get("code");
  const [formData, setFormData] = useState({
    email: email || "",
    resetCode: code || "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetPassword = () => {
    // Validation
    if (!formData.email.trim()) {
      alert("Please enter your email address");
      return;
    }

    if (!formData.resetCode.trim()) {
      alert("Please enter the reset code");
      return;
    }

    if (!formData.newPassword.trim()) {
      alert("Please enter a new password");
      return;
    }

    if (!formData.confirmPassword.trim()) {
      alert("Please confirm your new password");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Password strength validation
    if (formData.newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    setIsLoading(true);
    console.log("Resetting password for:", formData.email);

    // Simulate API call
    setTimeout(async () => {
      setIsLoading(false);

      try {
        const response = await fetch(
          `https://garg.omsok.com/api/v1/auth/reset-password-verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
              reset_code: formData.resetCode,
              new_password: formData.newPassword,
              confirm_new_password: formData.confirmPassword,
            }),
          }
        );
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          alert(
            `Password has been reset successfully! \n
        You can now log in with your new password.`
          );
          router.push("/account");
        } else {
          alert(data.message + "  Verification failed");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
      setFormData({
        email: "",
        resetCode: "",
        newPassword: "",
        confirmPassword: "",
      });
    }, 1500);
  };

  const handleResendCode = () => {
    router.push("/account/forgot-password");
  };

  const handleCancel = () => {
    console.log("Cancelling password reset");
    router.push("/account");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            RESET YOUR PASSWORD
          </h1>
        </div>

        {/* Reset Password Form */}
        <div className="border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Reset Password
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
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter E-mail"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-gray-50"
              />
            </div>

            {/* Reset Code Field */}
            <div>
              <label
                htmlFor="resetCode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                RESET CODE *
              </label>
              <input
                type="text"
                id="resetCode"
                name="resetCode"
                value={formData.resetCode}
                onChange={handleInputChange}
                placeholder="Enter Reset Code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-gray-50"
              />
            </div>

            {/* New Password Field */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                NEW PASSWORD *
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="New Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-gray-50"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                CONFIRM PASSWORD *
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Re-Enter New Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-gray-50"
              />
            </div>

            {/* Reset Password Button */}
            <div className="pt-4">
              <button
                onClick={handleResetPassword}
                disabled={isLoading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "RESETTING..." : "RESET PASSWORD"}
              </button>
            </div>
          </div>
        </div>

        {/* Cancel Button */}
        <div className="text-center">
          <button
            onClick={handleCancel}
            className="w-full bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            CANCEL
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Didn't receive the reset code? Check your spam folder or
            <button
              className="text-blue-600 hover:text-blue-800 font-medium ml-1 transition-colors"
              onClick={() => handleResendCode()}
            >
              request a new code
            </button>
          </p>
        </div>

        {/* Password Requirements */}
        <div className="mt-4 bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Password Requirements:
          </h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• At least 6 characters long</li>
            <li>• Mix of uppercase and lowercase letters (recommended)</li>
            <li>• Include numbers and special characters (recommended)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
