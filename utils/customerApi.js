import { apiRequest, apiPostRequest } from "./ApiSafeCalls";

/**
 * Customer API Service
 * Handles all customer-related API calls with authentication
 */

// Get customer information
export const getCustomerInfo = async () => {
  try {
    const response = await apiRequest("/customer/info", true);
    return {
      success: true,
      data: response.data || response,
    };
  } catch (error) {
    console.error("Error fetching customer info:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch customer information",
    };
  }
};

// Update customer profile
export const updateCustomerProfile = async (profileData) => {
  try {
    const response = await apiPostRequest(
      "/customer/update-profile",
      profileData,
      true
    );
    console.log("Update profile response:", response);
    console.log("Update profile data:", profileData);
    // const res = await apiPostRequest("/customer/update-profile", profileData, true);
    if (response.success) {
      return {
        success: true,
        data: response.data || response,
        message: response.message || "Profile updated successfully",
      };
    } else {
      return {
        success: false,
        error: response?.message || "Failed to update profile",
      };
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      error: error.message || "Failed to update profile",
    };
  }
};

// Change customer password
export const changeCustomerPassword = async (passwordData) => {
  try {
    const response = await apiPostRequest(
      "/customer/change-password",
      passwordData,
      true
    );
    console.log("Change password response:", response);
    console.log("Change password data:", passwordData);
    return {
      success: true,
      data: response,
      message: response.message || "Password changed successfully",
    };
  } catch (error) {
    console.error("Error changing password:", error);
    return {
      success: false,
      error: error.message || "Failed to change password",
    };
  }
};

// Remove customer account
export const removeCustomerAccount = async () => {
  try {
    const response = await apiRequest("/customer/remove-account", true, {
      method: "DELETE",
    });
    return {
      success: true,
      data: response.data || response,
      message: response.message || "Account removed successfully",
    };
  } catch (error) {
    console.error("Error removing account:", error);
    return {
      success: false,
      error: error.message || "Failed to remove account",
    };
  }
};

// Helper function to validate profile data
export const validateProfileData = (data) => {
  const errors = {};

  if (!data.full_name || data.full_name.trim().length < 2) {
    errors.full_name = "Full name must be at least 2 characters long";
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.phone || data.phone.length < 10) {
    errors.phone = "Please enter a valid phone number";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Helper function to validate password data
export const validatePasswordData = (data) => {
  const errors = {};

  if (!data.current_password || data.current_password.length < 6) {
    errors.current_password = "Current password is required";
  }

  if (!data.new_password || data.new_password.length < 6) {
    errors.new_password = "New password must be at least 6 characters long";
  }

  if (
    !data.new_password_confirmation ||
    data.new_password_confirmation !== data.new_password
  ) {
    errors.new_password_confirmation = "Passwords do not match";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
