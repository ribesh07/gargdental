"use client";
import { useState } from "react";

const EditProfileForm = ({ user, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    mobile: user.mobile || "",
    email: user.email || "",
    province: user.province || "Other",
    profileImage: user.profileImage || "",
  });

  const [previewImage, setPreviewImage] = useState(user.profileImage || "");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setPreviewImage(result);
        setFormData((prev) => ({ ...prev, profileImage: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would call an API here to save the data.
    console.log("Updating profile with:", formData);
    onUpdate(formData); // Pass the updated data back to the parent component.
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
        EDIT PROFILE
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="profileImage"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Profile Image
          </label>
          <div className="flex items-center gap-4">
            <img
              src={previewImage}
              alt="Profile Preview"
              className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
            />
            <input
              type="file"
              id="profileImage"
              name="profileImage"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>
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
            <option>Province 1</option>
            <option>Madhesh</option>
            <option>Bagmati</option>
            <option>Gandaki</option>
            <option>Lumbini</option>
            <option>Karnali</option>
            <option>Sudurpashchim</option>
            <option>Other</option>
          </select>
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
            UPDATE PROFILE
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm; 