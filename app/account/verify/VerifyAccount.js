"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { baseUrl } from "@/utils/config";
import useInfoModalStore from "@/stores/infoModalStore";
import useWarningModalStore from "@/stores/warningModalStore";
import toast from "react-hot-toast";
// import { baseUrl } from "@/utils/config";

export default function VerifyAccountPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerify = () => {
    if (!verificationCode.trim()) {
      useInfoModalStore
        .getState()
        .open({ title: "Info", message: "Please enter the verification code" });
      return;
    }
    setIsLoading(true);
    console.log("Verification attempt:", { email, code: verificationCode });

    // Simulate API call
    setTimeout(async () => {
      setIsLoading(false);
      // verification api
      try {
        const response = await fetch(`${baseUrl}/verify-account`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email: email,
            user_verification_code: verificationCode,
          }),
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          useInfoModalStore.getState().open({
            title: "Success",
            message: "Account verified successfully!",
            onOkay: () => router.push("/account"),
          });
        } else {
          useWarningModalStore.getState().open({
            title: "Error",
            message: data.errors[0].message + "  Verification failed !",
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

  const handleResendCode = () => {
    setIsLoading(true);
    console.log("Resending verification code to:", email);

    // Simulate API call
    setTimeout(async () => {
      setIsLoading(false);
      // alert("Verification code has been resent to your email");
      // resend code api here
      try {
        const response = await fetch(`${baseUrl}/resend-code`, {
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
        console.log(data);
        if (response.ok) {
          // alert(
          //   `Verification code has been resent to your email ${data.code}!`
          // );
        } else {
          toast.error(data.errors[0].message || "Resend failed");
        }
      } catch (error) {
        // console.error("Error:", error);
        alert("Something went wrong. Please try again.");
      }
    }, 1000);
  };

  const handleLoginNow = () => {
    console.log("Redirecting to login page");
    router.push("/account");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-gray-50 rounded-2xl shadow-2xl w-full max-w-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">
            VERIFY YOUR ACCOUNT
          </h1>
        </div>

        {/* Verification Form */}
        <div className="border border-gray-200 rounded-xl p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Account verification
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
                readOnly
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-blue-50 text-gray-700 cursor-not-allowed"
              />
            </div>

            {/* Verification Code Field */}
            <div>
              <label
                htmlFor="verification-code"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                VERIFICATION CODE *
              </label>
              <input
                type="text"
                id="verification-code"
                value={verificationCode}
                onChange={handleVerificationCodeChange}
                placeholder="Enter Verification Code"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-gray-50"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4">
              <button
                onClick={handleVerify}
                disabled={isLoading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "VERIFYING..." : "VERIFY"}
              </button>

              <button
                onClick={handleResendCode}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Resend Code?
              </button>
            </div>
          </div>
        </div>

        {/* Already Verified Section */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 ">
            ACCOUNT ALREADY VERIFIED?
          </h3>

          <button
            onClick={handleLoginNow}
            className="w-full bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
          >
            LOGIN NOW
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Didn't receive the verification code? Check your spam folder or
            click "Resend Code" above.
          </p>
        </div>
      </div>
    </div>
  );
}
