"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Complains = () => {
  const [formData, setFormData] = useState({
    returnFiles: [],
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const previewFiles = files.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      returnFiles: [...prev.returnFiles, ...previewFiles], // Append new files
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

  return (
    <div>
      <div className="max-w-6xl mx-auto py-10 px-4 flex flex-col items-center mt-2">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          Customer Complaint Form
        </h2>
        <div className="mx-auto">
          <form className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-xl shadow">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
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
                required
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
                required
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
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                placeholder="Enter your city"
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Remarks</label>
              <textarea
                placeholder="Any additional information"
                className="w-full px-4 py-2 border border-gray-300 rounded-md h-24"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attach Documents (Photos / Videos)
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
                  Supported: JPG, PNG, MP4. Max: 10MB each.
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
            onClick={() => toast.success("Under Development!")}
            className="bg-[#0072bc] text-white px-6 py-3 rounded-full hover:opacity-90 transition-all cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Complains;
