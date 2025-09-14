"use client";
import { useState, useEffect } from "react";
import {
  updateCustomerProfile,
  validateProfileData,
} from "@/utils/customerApi";
import { toast } from "react-hot-toast";

const EditProfileForm = ({ user, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    full_name: user.full_name || "",
    email: user.email || "",
    phone: user.phone || user.mobile || "",
    profile_photo_path: user.image_full_url || user.profile_image || null,
  });

  const [previewImage, setPreviewImage] = useState(
    user.image_full_url || user.profile_image || null
  );
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setPreviewImage(result);
        setFormData((prev) => ({ ...prev, profile_photo_path: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Profile Photo : ",formData.profile_photo_path)
    // Validate form data
    const validation = validateProfileData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsLoading(true);

    try {
      const result = await updateCustomerProfile(formData);

      if (result.success) {
        toast.success(result.message || "Profile updated successfully!");

        // Transform data back to match the expected format
        const updatedUser = {
          ...user,
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          profile_photo_path: formData.profile_photo_path,
          image_full_url: formData.profile_photo_path,
        };

        onUpdate(updatedUser);
      } else {
        toast.error(result.error || "Failed to update profile");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      // console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("user", user);

    setFormData({
      full_name: user.full_name || "",
      email: user.email || "",
      phone: user.phone || user.mobile || "",
      profile_photo_path: user.image_full_url || user.profile_image || null,
    });
    setPreviewImage(user.image_full_url || user.profile_image || null);
  }, [user]);

  return (
    <div className="bg-gray-50 rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
        EDIT PROFILE
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="profile_photo_path"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Profile Image
          </label>
          <div className="flex items-center gap-4">
            <img
              src={previewImage}
              alt="Profile Preview"
              className="w-24 h-24 min-w-24 min-h-24 rounded-full border-4 border-blue-100 object-cover shrink-0"
            />
            <input
              type="file"
              id="profile_photo_path"
              name="profile_photo_path"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="full_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.full_name ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Enter your full name"
            required
          />
          {errors.full_name && (
            <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Mobile Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${errors.phone ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Enter your mobile number"
            required
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            readOnly
            className={`w-full px-4 py-2 border rounded-lg bg-gray-50 text-gray-700 cursor-not-allowed ${errors.email ? "border-red-500" : "border-gray-300"
              }`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>


        <div className="flex justify-center items-center gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 cursor-pointer"
          >
            CANCEL
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                UPDATING...
              </>
            ) : (
              "UPDATE PROFILE"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
