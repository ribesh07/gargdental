"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import useInfoModalStore from "@/stores/infoModalStore";
import useWarningModalStore from "@/stores/warningModalStore";
import { baseUrl } from "@/utils/config";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: emailParam,
    resetCode: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      email: emailParam,
    }));
  }, [emailParam]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleResetPassword = async () => {
    if (!formData.email.trim())
      return useInfoModalStore
        .getState()
        .open({ title: "Info", message: "Please enter your email address" });
    if (!formData.resetCode.trim())
      return useInfoModalStore
        .getState()
        .open({ title: "Info", message: "Please enter the reset code" });
    if (!formData.newPassword.trim())
      return useInfoModalStore
        .getState()
        .open({ title: "Info", message: "Please enter a new password" });
    if (!formData.confirmPassword.trim())
      return useInfoModalStore
        .getState()
        .open({ title: "Info", message: "Please confirm your new password" });
    if (formData.newPassword !== formData.confirmPassword)
      return useWarningModalStore
        .getState()
        .open({ title: "Warning", message: "Passwords do not match" });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email))
      return useInfoModalStore
        .getState()
        .open({ title: "Info", message: "Please enter a valid email address" });
    if (formData.newPassword.length < 6)
      return useWarningModalStore.getState().open({
        title: "Warning",
        message: "Password must be at least 6 characters long",
      });
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/auth/reset-password-verify`, {
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
      });
      const data = await response.json();
      setIsLoading(false);
      if (response.ok) {
        useInfoModalStore.getState().open({
          title: "Success",
          message: "Password has been reset successfully. You can now log in.",
          onOkay: () => router.push("/account"),
        });
      } else {
        useWarningModalStore.getState().open({
          title: "Error",
          message: data.errors[0].message || "Verification failed",
        });
      }
    } catch (error) {
      // console.error(error);
      setIsLoading(false);
      useWarningModalStore.getState().open({
        title: "Error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  const handleResendCode = () => router.push("/account/forgot-password");
  const handleCancel = () => router.push("/account");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            RESET YOUR PASSWORD
          </h1>
        </div>

        <div className="border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Reset Password
          </h2>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                E-MAIL *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter E-mail"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
              />
            </div>

            <div>
              <label
                htmlFor="resetCode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                RESET CODE *
              </label>
              <input
                type="text"
                name="resetCode"
                value={formData.resetCode}
                onChange={handleInputChange}
                placeholder="Enter Reset Code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                NEW PASSWORD *
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  placeholder="New Password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showNewPassword ? (
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                CONFIRM PASSWORD *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Re-Enter New Password"
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showConfirmPassword ? (
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

            <div className="pt-4">
              <button
                onClick={handleResetPassword}
                disabled={isLoading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? "RESETTING..." : "RESET PASSWORD"}
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleCancel}
            className="w-full bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 cursor-pointer"
          >
            CANCEL
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Didn't receive the reset code?{" "}
          <button
            className="text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
            onClick={handleResendCode}
          >
            Request a new code
          </button>
        </div>
      </div>
    </div>
  );
}