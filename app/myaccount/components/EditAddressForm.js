"use client";
import { useState } from "react";

const EditAddressForm = ({ address, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: address.fullName || "",
    phone: address.phone || "",
    province: address.province || "",
    city: address.city || "",
    zone: address.zone || "",
    landmark: address.landmark || "",
    localAddress: address.localAddress || "",
    addressType: address.addressType || "Home",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
        EDIT {formData.addressType.toUpperCase()} ADDRESS
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Province */}
          <div>
            <label
              htmlFor="province"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Province
            </label>
            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Koshi Province</option>
              <option>Madhesh</option>
              <option>Bagmati</option>
              <option>Gandaki</option>
              <option>Lumbini</option>
              <option>Karnali</option>
              <option>Sudurpashchim</option>
            </select>
          </div>
          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <select
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Kathmandu</option>
              <option>Pokhara</option>
              <option>Biratnagar</option>
            </select>
          </div>
          {/* Zone */}
          <div>
            <label
              htmlFor="zone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Zone
            </label>
            <select
              id="zone"
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Durbarmarg</option>
              <option>Naxal</option>
              <option>Thamel</option>
            </select>
          </div>
          {/* Landmark */}
          <div>
            <label
              htmlFor="landmark"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Landmark (Optional)
            </label>
            <input
              type="text"
              id="landmark"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Local Address / Tole */}
          <div>
            <label
              htmlFor="localAddress"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Local Address / Tole
            </label>
            <input
              type="text"
              id="localAddress"
              name="localAddress"
              value={formData.localAddress}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Address Type */}
          <div>
            <label
              htmlFor="addressType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address Type
            </label>
            <select
              id="addressType"
              name="addressType"
              value={formData.addressType}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option>Home</option>
              <option>Office</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="bg-blue-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors"
          >
            UPDATE {formData.addressType.toUpperCase()} ADDRESS
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAddressForm; 