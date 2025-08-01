"use client";
import { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import {
  changeCustomerPassword,
  validatePasswordData,
} from "@/utils/customerApi";
import { toast } from "react-hot-toast";

const ChangePasswordForm = ({ onCancel, onSuccess }) => {
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [errors, setErrors] = useState({});
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);

    // Validate form data
    const validation = validatePasswordData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      console.log("Validation errors:", validation.errors);
      return;
    }

    setIsLoading(true);

    try {
      const result = await changeCustomerPassword(formData);
      console.log("Change password result:", result);
      console.log("Change password inside fun form data:", formData);

      if (result.success) {
        toast.success(result.message || "Password changed successfully!");
        setFormData({
          current_password: "",
          new_password: "",
          new_password_confirmation: "",
        });
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(result.error || "Failed to change password");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      // console.error("Password change error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md mx-auto">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-blue-100 p-3 rounded-full">
          <Lock className="w-6 h-6 text-blue-600" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Password */}
        <div>
          <label
            htmlFor="current_password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Current Password *
          </label>
          <div className="relative">
            <input
              type={showPasswords.current ? "text" : "password"}
              id="current_password"
              name="current_password"
              value={formData.current_password || ""}
              onChange={handleChange}
              className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.current_password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter current password"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("current")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPasswords.current ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.current_password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.current_password}
            </p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label
            htmlFor="new_password"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            New Password *
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? "text" : "password"}
              id="new_password"
              name="new_password"
              value={formData.new_password || ""}
              onChange={handleChange}
              className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.new_password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter new password"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPasswords.new ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.new_password && (
            <p className="text-red-500 text-sm mt-1">{errors.new_password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="new_password_confirmation"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirm New Password *
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? "text" : "password"}
              id="new_password_confirmation"
              name="new_password_confirmation"
              value={formData.new_password_confirmation || ""}
              onChange={handleChange}
              className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.new_password_confirmation
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Confirm new password"
              required
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPasswords.confirm ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {errors.new_password_confirmation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.new_password_confirmation}
            </p>
          )}
        </div>

        {/* Password Requirements */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Password Requirements:
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• At least 6 characters long</li>
            <li>• Should be different from current password</li>
            <li>• Use a combination of letters, numbers, and symbols</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center items-center gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            CANCEL
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                UPDATING...
              </>
            ) : (
              "CHANGE PASSWORD"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
