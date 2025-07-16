"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { submitGrievance } from "@/utils/apiHelper";

const Complains = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    remarks: "",
    returnFiles: [],
  });
  const [submitting, setSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const previewFiles = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setFormData((prev) => ({
      ...prev,
      returnFiles: [...prev.returnFiles, ...previewFiles],
    }));
  };

  const removeFile = (indexToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      returnFiles: prevData.returnFiles.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.city ||
      !formData.remarks
    ) {
      toast.error("Please fill all required fields.");
      return;
    }
    setSubmitting(true);
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      remarks: formData.remarks,
      // File upload not sent yet
    };
    const res = await submitGrievance(payload);
    setSubmitting(false);
    if (res.success) {
      toast.success(res.message || "Grievance submitted successfully");
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        remarks: "",
        returnFiles: [],
      });
    } else {
      if (res.errors && res.errors.length > 0) {
        toast.error(res.errors[0].message || res.message);
      } else {
        toast.error(res.message || "Failed to submit grievance");
      }
    }
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto py-10 px-4 flex flex-col items-center mt-2">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          Customer Grievance Form
        </h2>
        <div className="mx-auto">
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number *
              </label>
              <input
                type="text"
                name="phone"
                required
                value={formData.phone}
                onChange={handleInputChange}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={10}
                placeholder="Enter 10-digit phone number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">City *</label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleInputChange}
                placeholder="Enter your city"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Grievance Details *
              </label>
              <textarea
                name="remarks"
                required
                value={formData.remarks}
                onChange={handleInputChange}
                placeholder="Any additional information"
                className="w-full px-4 py-2 border border-gray-300 rounded-md h-24"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attach Documents
              </label>
              {/* Custom Attach File Button */}
              <div className="flex items-center space-x-2 mb-2">
                <label className="inline-block py-2 bg-[#0072bc] hover:bg-[#005f9e] text-white text-sm font-semibold px-4  rounded-lg cursor-pointer ">
                  Add +
                  <input
                    type="file"
                    name="returnFiles"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                <p className="text-xs text-gray-500">
                  Supported: JPG, PNG, JPEG, . Max: 2MB each.
                </p>
              </div>
              {/* Previews */}
              {formData.returnFiles.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4">
                  {formData.returnFiles.map(({ file, previewUrl }, index) => (
                    <div key={index} className="relative group">
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-1 right-1 bg-white text-red-500 border border-red-300 rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
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
          </form>
        </div>
        <div className="text-center mt-8">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-[#0072bc] text-white px-6 py-3 rounded-full hover:opacity-90 transition-all cursor-pointer"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Complains;
