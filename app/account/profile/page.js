"use client";
import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Edit,
  Shield,
  Trash2,
} from "lucide-react";
import { getCustomerInfo } from "@/utils/customerApi";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import RemoveAccountModal from "@/components/RemoveAccountModal";
import EditProfileForm from "@/app/myaccount/components/EditProfileForm";
import FullScreenLoader from "@/components/FullScreenLoader";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CustomerProfilePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showRemoveAccount, setShowRemoveAccount] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const result = await getCustomerInfo();
      console.log("Fetched user profile:", result);

      if (result.success) {
        setUser(result.data);
      } else {
        toast.error("Failed to load profile");
        // console.error("Error loading profile:", result.error);
      }
    } catch (error) {
      toast.error("An error occurred while loading profile");
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
    setShowEditProfile(false);
    fetchUserProfile();
    toast.success("Profile updated successfully!");
  };

  const handlePasswordChange = () => {
    setShowChangePassword(false);
    toast.success("Password changed successfully!");
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.success) {
        // Clear localStorage
        localStorage.removeItem("token");

        // Clear cart store
        const useCartStore = await import("@/stores/useCartStore");
        useCartStore.default.getState().clearCart();

        toast.success("Logged out successfully");
        router.push("/dashboard");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("An error occurred during logout");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Profile Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Unable to load your profile information.
          </p>
          <button
            onClick={() => router.push("/account")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Back to Account
          </button>
        </div>
      </div>
    );
  }

  if (showEditProfile) {
    return (
      <EditProfileForm
        user={user}
        onUpdate={handleProfileUpdate}
        onCancel={() => setShowEditProfile(false)}
      />
    );
  }

  if (showChangePassword) {
    return (
      <ChangePasswordForm
        onCancel={() => setShowChangePassword(false)}
        onSuccess={handlePasswordChange}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-50 shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-blue-900">
              Customer Profile
            </h1>
            <button
              onClick={() => router.push("/myaccount")}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to My Account
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Personal Information
                </h2>
                <div className="flex">
                  <button
                    onClick={() => setShowEditProfile(true)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium cursor-pointer"
                  >
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                </div>
                <div className="bg-red-500 text-white rounded-lg mb-3 p-2 relative hover:underline hover:scale-105 transition-all duration-300 cursor-pointer">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              </div>

              {/* Profile Image */}
              <div className="flex items-center gap-6 mb-8">
                <img
                  src={user.image_full_url || "/assets/logo.png"}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
                />
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {user.full_name}
                  </h3>
                  <p className="text-gray-600">Customer ID: #{user.id}</p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="max-w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium text-gray-800">
                      {user.full_name}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="max-w-[150px] break-words">
                    <p className="text-[12px] text-gray-500">Email Address</p>
                    <p className="font-medium text-gray-800 break-words whitespace-normal">
                      {user.email || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Phone className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="font-medium text-gray-800">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium text-gray-800">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>

                
              </div>
            </div>
          </div>

          {/* Security & Actions */}
          <div className="space-y-6">
            {/* Security Card */}
            <div className="bg-gray-50 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Account Security
              </h3>

              {user.login_medium === "manual" && (
                // <button>Google</button>
                <div className="space-y-4 mb-2">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-800">Password</h4>
                    </div>
                    <button
                      onClick={() => setShowChangePassword(true)}
                      className="text-white bg-red-600 p-2 rounded-2xl text-sm font-medium cursor-pointer"
                    >
                      Change
                    </button>
                  </div>
                </div>
              )}

              {/* Danger Zone */}
              <div className="bg-gray-50 rounded-xl shadow-lg p-6 border border-red-200">
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">
                      Delete Account
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                    <button
                      onClick={() => setShowRemoveAccount(true)}
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Remove Account Modal */}
        <RemoveAccountModal
          isOpen={showRemoveAccount}
          onClose={() => setShowRemoveAccount(false)}
        />
      </div>
    </div>
  );
}
