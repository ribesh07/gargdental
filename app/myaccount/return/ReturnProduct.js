"use client";
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { baseUrl } from "@/utils/config";
import useCartStore from "@/stores/useCartStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { apiRequest } from "@/utils/ApiSafeCalls";
import { useSearchParams } from "next/navigation";

export default function ReturnProduct() {
  const [reasons, setReasons] = useState([]);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const order_id = searchParams.get("order_id");
  const [formData, setFormData] = useState({
    order_id: "",
    reason_id: "",
    reason_description: "",
    images: [],
  });
  const [data , setData ] = useState([]);

  //   const selectedItems = useCartStore((state) => state.selectedItems);
  const router = useRouter();

  useEffect(() => {
    if (order_id) {
      setFormData((prev) => ({
        ...prev,
        order_id: order_id,
      }));
    }
  }, [order_id]);
  useEffect(() => {
    const fetchReason = async () => {
      try {
        const response = await apiRequest(
          `/customer/order/return-reasons-list`,
          true
        );

        console.log(response);
        if (response.success) {
          const data = await response.reasons;
          setReasons(data);
        } else {
          toast.error(
            response.errors[0].message ||
              "Failed to fetch reason , Try again later !"
          );
        }
      } catch (error) {
        console.log("Error fetching reason:", error);
      }
    };
    fetchReason();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "reason_id" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.reason_id) {
      toast.error("Please select a reason");
      return;
    }

    if (!formData.reason_description.trim()) {
      toast.error("Please enter a description");
      return;
    }

    try {
      setIsSubmitting(true);

      const fd = new FormData();
      fd.append("order_id", formData.order_id);
      fd.append("reason_id", formData.reason_id.toString());
      fd.append("reason_description", formData.reason_description);

      formData.images.forEach((imgObj, index) => {
        fd.append("images[]", imgObj.file || imgObj); // safer: works for both {file} and File
      });
      console.log("fd data :", fd);
      const response = await fetch(`${baseUrl}/customer/order/return`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: fd,
      });

      const data = await response.json();
      console.log("API response:", data);
      
      if (data.success) {
        setData(data);
        toast.success("Return request submitted!");
        setStep(2); // show renderStep2 instead of redirect
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previewFiles = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      images: previewFiles,
    }));
  };

  const removeFile = (indexToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      images: prevData.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const returnReasons = reasons.map((reason) => {
    const { id, reason_name, reason_type, reason_for } = reason;
    console.log(reason);
    return {
      id,
      reason_name,
      reason_type,
      reason_for,
    };
  });
  const renderStep1 = () => (
    <div className="space-y-6 max-w-full">
      <div className="text-center">
        <RefreshCw className="w-16 h-16 mx-auto text-blue-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Return Details
        </h2>
        <p className="text-gray-600">Tell us about your return request</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Return *
          </label>
          <select
            name="reason_id"
            value={formData.reason_id}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select a reason</option>
            {returnReasons
              .filter(
                (reason) =>
                  reason.reason_for === "customer" &&
                  reason.reason_type === "return"
              )
              .map((reason) => (
                <option key={reason.id} value={reason.id}>
                  {reason.reason_name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Descriptions
          </label>
          <textarea
            required
            name="reason_description"
            value={formData.reason_description}
            onChange={handleInputChange}
            placeholder="Please provide details about your return..."
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Attach Documents (Photos / Videos)
          </label>

          {/* Custom Attach File Button */}
          <div className="flex items-center space-x-3 mb-2">
            <label className="inline-block bg-[#0072bc] hover:bg-[#0072bc] text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer">
              Attach File
              <input
                type="file"
                name="images"
                accept="image/*,video/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
            <p className="text-xs text-gray-500">
              Supported: JPG, PNG, MP4. Max: 10MB each.
            </p>
          </div>

          {/* Previews */}
          {formData.images?.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {formData.images.map(({ file, previewUrl }, index) => (
                <div key={index} className="relative group">
                  {/* ❌ Remove button */}
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute top-1 right-1 bg-gray-50 text-red-500 border border-red-300 rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
                    title="Remove file"
                  >
                    ×
                  </button>

                  {/* Image or Video Preview */}
                  {file.type.startsWith("image/") ? (
                    <img
                      src={previewUrl}
                      alt={`preview-${index}`}
                      className="w-full h-24 object-cover rounded-md border border-gray-300"
                    />
                  ) : file.type.startsWith("video/") ? (
                    <video
                      src={previewUrl}
                      controls
                      className="w-full h-24 object-cover rounded-md border border-gray-300"
                    />
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-[#0072bc] text-white py-3 px-4 rounded-lg hover:bg-[#0072bc] transition-colors font-medium disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Processing..." : "Submit Return Request"}
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="text-center space-y-6">
      <CheckCircle className="w-20 h-20 mx-auto text-green-600" />
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Return Request Submitted!
        </h2>
        <p className="text-gray-600 mb-4">
          We've received your return request and will process it within 24
          hours.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>RETURN ID: #</strong> {data.return_id}
          </p>
          <p className="text-sm text-blue-800 mt-1">
            You'll receive an email with return instructions and a prepaid
            shipping label.
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          setFormData({
            orderNumber: "",
            email: "",
            returnReason: "",
            itemsToReturn: [],
            additionalComments: "",
          });
          router.push("/myaccount");
        }}
        className="bg-[#0072bc] text-white py-3 px-6 rounded-lg hover:bg-[#0072bc] transition-colors font-medium cursor-pointer"
      >
        GO TO MY ACCOUNT
      </button>
    </div>
  );

  return (
    <div className="min-h-screen  bg-gray-50">
      {/* Header */}
      <header className="bg-gray-50 shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/myaccount">
              <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">
              Returns & Exchanges
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl flex justify-center align-center mx-auto px-4 py-8">
        <div className="w-full mx-auto px-4 py-8">
          <div className="bg-gray-50 ">
            <div className="bg-gray-50 rounded-xl shadow-sm border p-6">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep2()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
