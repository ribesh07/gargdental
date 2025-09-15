"use client";

import { useState, useEffect } from "react";
import {
  User,
  MapPin,
  List,
  Heart,
  MessageSquare,
  RotateCcw,
  Edit,
} from "lucide-react";

import EditProfileForm from "./components/EditProfileForm";
import EditAddressForm from "./components/EditAddressForm";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import RemoveAccountModal from "@/components/RemoveAccountModal";
import FullScreenLoader from "@/components/FullScreenLoader";
import { getCustomerOrders, getFullInfo } from "@/utils/apiHelper";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAddressStore } from "@/stores/addressStore";
import ManageMyAccount from "./components/ManageMyAccount";
import AddressBook from "./components/AddressBook";
import MyOrders from "./components/MyOrders";
import MyWishlist from "./components/MyWishlist";
import MyReviews from "./components/MyReview";
import Returnlist from "@/app/Return-list/Returnlist";
import Complains from "./components/Complains";
import useInfoModalStore from "@/stores/warningModalStore";
import { getWishlist } from "@/utils/apiHelper";

const AccountPage = () => {
  const { provinces, cities, zones, fetchAddressDropdowns } = useAddressStore();

  const [activeTab, setActiveTab] = useState("account");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showRemoveAccount, setShowRemoveAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [addressToEdit, setAddressToEdit] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderlength, setOrderlength] = useState(0);
  const [user, setUser] = useState({
    id: "",
    email: "",
    phone: "",
    full_name: "",
    profileImage: "",
    profile_image: "",
  });

  const [wishlist, setWishlist] = useState([]);

  const [wishlistlength, setWishlistlength] = useState(0);

  const [address, setAddress] = useState([]);
  const [homeAddress, setHomeAddress] = useState(null);
  const [officeAddress, setOfficeAddress] = useState(null);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState(null);
  const sidebarItems = [
    { key: "account", label: "Manage My Account", icon: User },
    { key: "address", label: "Address Book", icon: MapPin },
    { key: "orders", label: "My Orders", icon: List },
    { key: "wishlist", label: "My Wishlist", icon: Heart },
    { key: "returnlist", label: "Return List", icon: RotateCcw },
    { key: "reviews", label: "My Reviews", icon: MessageSquare },
    { key: "complaint", label: "Complaint", icon: RotateCcw },
  ];

  const router = useRouter();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      useInfoModalStore.getState().open({
        title: "Info",
        message: "Please login to continue.",
      });
      router.push("/account");
    }

    fetchAddressDropdowns();
  }, [fetchAddressDropdowns]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const result = await getFullInfo();
      console.log("response", result);

      if (result.success) {
        const {
          data: userData,
          allAddresses,
          homeAddress,
          defaultBillingAddress,
          officeAddress,
        } = result;

        setUser({
          id: userData.id || "",
          full_name: userData.full_name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          profileImage: userData.image_full_url || "",
          profile_image: userData.image_full_url || "",
        });
        console.log("defaultBillingAddress", defaultBillingAddress);

        setAddress(allAddresses);
        setHomeAddress(homeAddress);
        setDefaultBillingAddress(defaultBillingAddress);
        setOfficeAddress(officeAddress);
      } else {
        toast.error("Failed to load user data");
        // console.error("Error loading user data:", result.error);
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An error occurred while loading user data");
      // console.error("Error fetching user data:", error);
      router.push("/account");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getCustomerOrders();

      console.log("API Response:", result);

      if (result.success) {
        console.log("Orders data:", result.orders);

        // Log the first order's complete structure
        if (result.orders.orders && result.orders.orders.length > 0) {
          // console.log(
          //   "First order complete structure:",
          //   JSON.stringify(result.orders.orders[0], null, 2)
          // );

          if (result.orders.orders[0].items) {
            console.log("First order items:", result.orders.orders[0].items);
            if (result.orders.orders[0].items.length > 0) {
              console.log(
                "First item complete structure:",
                JSON.stringify(result.orders.orders[0].items[0], null, 2)
              );
            }
          }
        }

        setOrderlength(result.orders.count || 0);
        console.log("orderlength", result.orders.count);
        // setOrders(result.orders.orders);
      } else {
        setError(result.error);
        toast.error(result.error);
      }
    } catch (err) {
      // console.error("Error fetching orders:", err);
      setError("Failed to load orders");
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  //   const fetchWishlist = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const wishlistItems = await getWishlist();

  //     setWishlist(wishlistItems);
  //     setWishlistlength(wishlistItems.length || 0);

  //     if (wishlistItems.length > 0) {
  //       console.log(
  //         "First wishlist item:",
  //         JSON.stringify(wishlistItems[0], null, 2)
  //       );
  //     }
  //   } catch (err) {
  //     console.error("Error fetching wishlist:", err);
  //     setError("Failed to load wishlist");
  //     toast.error("Failed to load wishlist");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  //all data here
  useEffect(() => {
    fetchUserData();
    fetchOrders();
  }, []);
  // //   try {
  // //     setLoading(true);
  // //     setError(null);
  // //     const result = await fetchReview();

  // //     console.log("Reviews API Response:", result);

  // //     if (result.success) {
  // //       const reviewItems = result.reviews || [];

  // //       setReviews(reviewItems);
  // //       setReviewlength(reviewItems.length || 0);

  // //       if (reviewItems.length > 0) {
  // //         console.log(
  // //           "First review item:",
  // //           JSON.stringify(reviewItems[0], null, 2)
  // //         );
  // //       }
  // //     } else {
  // //       setError(result.error);
  // //       toast.error(result.error);
  // //     }
  // //   } catch (err) {
  // //     console.error("Error fetching reviews:", err);
  // //     setError("Failed to load reviews");
  // //     toast.error("Failed to load reviews");
  // //   } finally {
  // //     setLoading(false);
  // //   }
  // // };
  //   useEffect(() => {
  //     fetchWishlist();

  //   }, []);

  //update profile
  const handleUpdateProfile = (updatedData) => {
    setUser({
      id: updatedData.id,
      full_name: updatedData.full_name || "",
      email: updatedData.email || "",
      phone: updatedData.phone || "",
      profileImage:
        updatedData.image_full_url || updatedData.profile_photo_path || "",
      profile_image:
        updatedData.image_full_url || updatedData.profile_photo_path || "",
      created_at: updatedData.created_at,
    });
    setShowEditProfile(false);
    toast.success("Profile updated successfully!");
  };

  const handleAddAddress = (newAddress) => {
    console.log("newAddress", newAddress);
    fetchUserData();
    setShowEditAddress(false);
    toast.success("Address added successfully!");
  };

  const handleUpdateAddress = (updatedData) => {
    console.log("updatedData", updatedData);
    fetchUserData();
    setAddressToEdit(null);
    setShowEditAddress(false);
    toast.success("Address updated successfully!");
  };

  const handleChangePassword = () => {
    setShowChangePassword(true);
  };

  const handlePasswordChangeSuccess = () => {
    setShowChangePassword(false);
    toast.success("Password changed successfully!");
  };

  const handleRemoveAccount = () => {
    setShowRemoveAccount(true);
  };

  const handleEditHomeAddress = () => {
    setShowEditAddress(true);
  };

  const handleEditOfficeAddress = () => {
    setShowEditAddress(true);
  };

 

  if (isLoading || loading) {
    return <FullScreenLoader />;
  }

  if (showEditProfile) {
    return (
      <EditProfileForm
        user={user}
        onUpdate={handleUpdateProfile}
        onCancel={() => setShowEditProfile(false)}
      />
    );
  }

  if (showChangePassword) {
    return (
      <ChangePasswordForm
        onCancel={() => setShowChangePassword(false)}
        onSuccess={handlePasswordChangeSuccess}
      />
    );
  }

  if (showEditAddress) {
    return (
      <EditAddressForm
        address={addressToEdit}
        onUpdate={handleUpdateAddress}
        onCancel={() => setShowEditAddress(false)}
        provinces={provinces}
        cities={cities}
        zones={zones}
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto bg-gray-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 px-4 sm:px-6 lg:px-8 py-8">
        {/* Sidebar */}
        <aside className="w-full md:w-80 flex-shrink-0">
          <div className="bg-gray-50 rounded-xl shadow p-6 text-center">
            <img
              src={user.profile_image || '/assets/logo.png'}
              alt="Profile"
              className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-blue-100 object-contain"
            />
            <h3 className="font-bold text-xl text-gray-800">
              {user.full_name}
            </h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">{user.phone}</p>
          </div>

          

          <nav className="bg-gray-50 rounded-xl shadow p-4 mt-6">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActiveTab(item.key);
                  scrollToTop();
                }}
                className={`flex items-center w-full px-4 py-3 my-1 rounded-lg transition-colors text-left font-medium space-x-4 cursor-pointer
                  ${
                    activeTab === item.key
                      ? "bg-blue-50 text-blue-800 font-bold shadow-sm"
                      : "hover:bg-gray-50 text-gray-700"
                  }
                `}
              >
                <item.icon className="w-6 h-6" />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="ml-auto bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 bg-gray-50 rounded-xl shadow p-4 sm:p-6 lg:p-8">
          {activeTab === "account" && (
            <ManageMyAccount
              onEditProfile={() => setShowEditProfile(true)}
              user={user}
              homeAddress={homeAddress}
              defaultBillingAddress={defaultBillingAddress}
              onEditAddress={() => setActiveTab("address")}
              onChangePassword={handleChangePassword}
              onRemoveAccount={handleRemoveAccount}
              provinces={provinces}
              cities={cities}
              zones={zones}
            />
          )}
          {activeTab === "address" && (
            <AddressBook
              address={address}
              homeAddress={homeAddress}
              officeAddress={officeAddress}
              onEditHome={(value) => {
                setAddressToEdit(value);
                setShowEditAddress(true);
              }}
              provinces={provinces}
              cities={cities}
              zones={zones}
            />
          )}
          {activeTab === "orders" && <MyOrders />}
          {activeTab === "wishlist" && <MyWishlist />}
          {activeTab === "returnlist" && <Returnlist/>}
          {activeTab === "reviews" && <MyReviews />}
          {activeTab === "complaint" && <Complains />}
        </main>
      </div>

      

      {/* Remove Account Modal */}
      <RemoveAccountModal
        isOpen={showRemoveAccount}
        onClose={() => setShowRemoveAccount(false)}
      />
    </div>
  );
};

export default AccountPage;
