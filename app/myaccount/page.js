"use client";

import { useState, useEffect } from "react";
import {
  User,
  MapPin,
  List,
  Heart,
  MessageSquare,
  RotateCcw,
  Settings,
  Shield,
  Trash2,
} from "lucide-react";
import EditProfileForm from "./EditProfileForm";
import EditAddressForm from "./EditAddressForm";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import RemoveAccountModal from "@/components/RemoveAccountModal";
import FullScreenLoader from "@/components/FullScreenLoader";
import { getCustomerInfo } from "@/utils/customerApi";
import { getFullInfo } from "@/utils/apiHelper";
import useCartStore from "@/stores/useCartStore";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAddressStore } from "@/stores/addressStore";

const sidebarItems = [
  { key: "account", label: "Manage My Account", icon: User },
  { key: "address", label: "Address Book", icon: MapPin },
  { key: "orders", label: "My Orders", icon: List, badge: 0 },
  { key: "wishlist", label: "My Wishlist", icon: Heart },
  { key: "reviews", label: "My Reviews", icon: MessageSquare },
  { key: "cancellations", label: "My Cancellations", icon: RotateCcw },
];

function ManageMyAccount({
  onEditProfile,
  user,
  homeAddress,
  defaultBillingAddress,
  onEditAddress,
  onChangePassword,
  onRemoveAccount,
  provinces,
  cities,
  zones,
}) {
  console.log("homeAddress", homeAddress);
  console.log("defaultBillingAddress", defaultBillingAddress);
  console.log("user", user);
  const provinceName =
    provinces.find((p) => p.id === homeAddress?.province_id)?.name || "";
  const cityName =
    cities.find((c) => c.id === homeAddress?.city_id)?.name || "";
  const zoneName =
    zones.find((z) => z.id === homeAddress?.zone_id)?.zone_name || "";

  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col md:flex-row p-4 sm:p-6">
      {/* Main Content */}
      <div className="flex-1 w-full md:pl-6 flex flex-col ">
        {/* Profile / Address Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Personal Profile */}
          <div className="bg-white rounded-xl shadow p-4 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Personal Profile</span>
              <button
                onClick={onEditProfile}
                className="text-blue-500 text-sm underline"
              >
                EDIT
              </button>
            </div>
            <div className="text-gray-700 text-sm">
              {user.full_name ||
                `${user.firstName || ""} ${user.lastName || ""}`.trim()}
            </div>
            <div className="text-gray-700 text-sm">{user.email}</div>
            <div className="text-gray-700 text-sm">
              {user.phone || user.mobile}
            </div>
          </div>

          {/* Address Book */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Address Book</span>
              <button
                onClick={onEditAddress}
                className="text-blue-500 text-sm underline"
              >
                EDIT
              </button>
            </div>
            <div className="text-gray-700 text-sm">
              {homeAddress?.full_name}
            </div>
            <div className="text-gray-700 text-sm">
              {provinceName} - {cityName} - {zoneName}
            </div>
            <div className="text-gray-700 text-sm">{homeAddress?.phone}</div>
            <div className="text-gray-500 text-sm">
              {homeAddress?.address_type === "H"
                ? "Home"
                : homeAddress?.address_type === "O"
                ? "Office"
                : ""}{" "}
              Address
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="font-semibold mb-2">Default Billing Address</div>
            <div className="text-gray-700 text-sm">
              {defaultBillingAddress?.full_name}
            </div>
            <div className="text-gray-700 text-sm">
              {provinceName} - {cityName} - {zoneName}
            </div>
            <div className="text-gray-700 text-sm">
              {defaultBillingAddress?.phone}
            </div>
          </div>
        </div>

        {/* Account Security Section */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Account Security
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Password</h4>
                  <p className="text-sm text-gray-600">
                    Last changed: {user.lastPasswordChange || "Never"}
                  </p>
                </div>
              </div>
              <button
                onClick={onChangePassword}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Change
              </button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <Trash2 className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Account Removal</h4>
                  <p className="text-sm text-gray-600">
                    Permanently delete your account
                  </p>
                </div>
              </div>
              <button
                onClick={onRemoveAccount}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Order Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow flex flex-col items-center py-6">
            <span className="text-orange-500 text-3xl">🛒</span>
            <div className="text-xl font-bold mt-2">0</div>
            <div className="text-gray-500 text-sm">Orders Placed</div>
          </div>
          <div className="bg-white rounded-xl shadow flex flex-col items-center py-6">
            <span className="text-green-500 text-3xl">❌</span>
            <div className="text-xl font-bold mt-2">0</div>
            <div className="text-gray-500 text-sm">Orders Cancelled</div>
          </div>
          <div className="bg-white rounded-xl shadow flex flex-col items-center py-6">
            <span className="text-blue-500 text-3xl">💙</span>
            <div className="text-xl font-bold mt-2">0</div>
            <div className="text-gray-500 text-sm">Wishlist</div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="text-center mt-auto">
          <h3 className="text-md font-bold text-blue-900 uppercase mb-2">
            Recent Orders
          </h3>
          <div className="text-gray-500 text-sm">No recent orders found.</div>
        </div>
      </div>
    </div>
  );
}

function AddressBook({ homeAddress, officeAddress, onEditHome, onEditOffice }) {
  return (
    
    <div className="bg-white rounded shadow p-6 relative min-h-[calc(65vh-180px)]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-900">Home Address</h2>
        <button
          onClick={onEditHome}
          className="text-blue-500 text-sm underline font-semibold"
        >
          EDIT
        </button>
      </div>
      <div className="space-y-2 text-gray-700 text-sm">
        <p>
          <span className="font-semibold">Name:</span> {homeAddress?.full_name}
        </p>
        <p>
          <span className="font-semibold">Address:</span> {homeAddress?.address}
          , {homeAddress?.zone_id},{" "}
          {homeAddress?.city?.city || homeAddress?.city},{" "}
          {homeAddress?.province_id}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {homeAddress?.phone}
        </p>
        <p className="text-gray-500 pt-2">Default Shipping & Billing Address</p>
      </div>
      <br />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-blue-900">Office Address</h2>
        <button
          onClick={onEditOffice}
          className="text-blue-500 text-sm underline font-semibold"
        >
          EDIT
        </button>
      </div>
      <div className="space-y-2 text-gray-700 text-sm">
        <p>
          <span className="font-semibold">Name:</span>{" "}
          {officeAddress?.full_name}
        </p>
        <p>
          <span className="font-semibold">Address:</span>{" "}
          {officeAddress?.address}, {officeAddress?.zone_id},{" "}
          {officeAddress?.city?.city || officeAddress?.city},{" "}
          {officeAddress?.province_id}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {officeAddress?.phone}
        </p>
      </div>
      <div className="flex justify-end">
        {/* Add Address Button pinned to bottom-right */}
        <button
          onClick={onEditHome}
          className="absolute bottom-6 right-6 text-blue-600 text-lg font-semibold underline hover:text-pink-700 transition"
        >
          Add Address
        </button>
      </div>
    </div>
  );
}






function MyOrders() {
  const orders = useCartStore((state) => state.orders) || [];
  const cancelOrder = useCartStore((state) => state.cancelOrder);
  return (
    <div className="w-full p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-900 mb-8">
        MY ORDERS ({orders.length})
      </h2>
      {orders.length === 0 ? (
        <div className="text-gray-500 text-center text-lg">
          No orders found.
        </div>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-4 mb-6 border"
          >
            {/* Header: Order ID + Status */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-blue-700 font-semibold block">
                  Order #{index + 1}
                </span>
                {order.accountNumber && (
                  <div className="text-xs text-gray-400 mb-1">
                    Account Number:{" "}
                    <span className="font-mono">{order.accountNumber}</span>
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  Placed on {new Date(order.date).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  Pay Amount <strong>{order.total}</strong>
                </div>
                <div className="text-sm text-gray-600">
                  Payment Method <strong>{order.paymentMethod}</strong>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span
                  className={`text-sm font-semibold px-3 py-1 rounded-full ${
                    order.orderStatus === "Cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {order.orderStatus || "Processing"}
                </span>
                {order.orderStatus !== "Cancelled" && (
                  <button
                    className="mt-2 text-red-600 text-sm font-bold underline px-5 py-2 rounded-full"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to cancel this order?"
                        )
                      ) {
                        cancelOrder(index);
                      }
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
            {/* Address */}
            <div className="mb-2 text-sm text-gray-700">
              <div>
                <span className="font-semibold">Name:</span>{" "}
                {order.address?.fullName}
              </div>
              <div>
                <span className="font-semibold">Address:</span>{" "}
                {order.address?.localAddress}, {order.address?.zone},{" "}
                {order.address?.city}, {order.address?.province}
              </div>
              <div>
                <span className="font-semibold">Phone:</span>{" "}
                {order.address?.phone}
              </div>
            </div>
            {/* Product Summary */}
            <div className="border p-4 rounded flex flex-col gap-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 border-b pb-2 last:border-b-0 last:pb-0"
                >
                  <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-800 font-semibold">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-700">
                      Qty:{" "}
                      <span className="text-blue-700 font-bold">
                        {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="text-right font-medium text-green-600">
                    Rs. {item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function MyWishlist() {
  const wishlist = useCartStore((state) => state.wishlist) || [];
  const setWishlist = useCartStore((state) => state.setWishlist);
  const router = useRouter();
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-900 mb-4">
        MY WISHLIST
      </h2>
      {wishlist.length > 0 && (
        <button
          className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => setWishlist([])}
        >
          Clear Wishlist
        </button>
      )}
      {wishlist.length === 0 ? (
        <div className="text-gray-400 text-lg mt-12">No items in wishlist.</div>
      ) : (
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col items-center cursor-pointer hover:shadow-xl hover:ring-2 hover:ring-blue-400 transition"
              onClick={() => {
                if (item.product_code) {
                  router.push(`/dashboard/${item.product_code}`);
                }
              }}
              title="View Product"
            >
              <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center overflow-hidden mb-2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    e.target.src = "/placeholder.png";
                  }}
                />
              </div>
              <div className="font-semibold text-gray-800 text-center text-lg mb-1">
                {item.name}
              </div>
              {item.brand && (
                <div className="text-xs text-gray-500 mb-1">
                  Brand: {item.brand}
                </div>
              )}
              {item.product_code && (
                <div className="text-xs text-gray-500 mb-1">
                  Code: {item.product_code}
                </div>
              )}
              {item.description && (
                <div className="text-xs text-gray-600 mb-2 text-center">
                  {item.description}
                </div>
              )}
              <div className="text-green-700 font-bold mt-1 text-lg">
                Rs. {item.price}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function MyReviews() {
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-900 mb-4">
        MY REVIEWS
      </h2>
      <div className="text-gray-400 text-lg mt-12">No data record.</div>
    </div>
  );
}

function MyCancellations() {
  const cancelledOrders = useCartStore((state) => state.cancelledOrders) || [];
  return (
    <div className="w-full p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-900 mb-8">
        MY CANCELLATIONS
      </h2>
      {cancelledOrders.length === 0 ? (
        <div className="text-gray-500 text-center text-lg">
          No cancelled orders found.
        </div>
      ) : (
        cancelledOrders.map((order, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-4 mb-6 border"
          >
            {/* Header: Order ID + Status */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-blue-700 font-semibold block">
                  Order #{index + 1}
                </span>
                {order.accountNumber && (
                  <div className="text-xs text-gray-400 mb-1">
                    Account Number:{" "}
                    <span className="font-mono">{order.accountNumber}</span>
                  </div>
                )}
                <div className="text-sm text-gray-500">
                  Placed on {new Date(order.date).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">
                  Pay Amount <strong>{order.total}</strong>
                </div>
                <div className="text-sm text-gray-600">
                  Payment Method <strong>{order.paymentMethod}</strong>
                </div>
                <div className="text-sm text-gray-600">
                  Cancelled At{" "}
                  <strong>
                    {new Date(order.cancelledAt).toLocaleString()}
                  </strong>
                </div>
              </div>
              <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
                Cancelled
              </span>
            </div>
            {/* Address */}
            <div className="mb-2 text-sm text-gray-700">
              <div>
                <span className="font-semibold">Name:</span>{" "}
                {order.address?.fullName}
              </div>
              <div>
                <span className="font-semibold">Address:</span>{" "}
                {order.address?.localAddress}, {order.address?.zone},{" "}
                {order.address?.city}, {order.address?.province}
              </div>
              <div>
                <span className="font-semibold">Phone:</span>{" "}
                {order.address?.phone}
              </div>
            </div>
            {/* Product Summary */}
            <div className="border p-4 rounded flex flex-col gap-2">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 border-b pb-2 last:border-b-0 last:pb-0"
                >
                  <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-800 font-semibold">
                      {item.name}
                    </div>
                    <div className="text-sm text-gray-700">
                      Qty:{" "}
                      <span className="text-blue-700 font-bold">
                        {item.quantity}
                      </span>
                    </div>
                  </div>
                  <div className="text-right font-medium text-green-600">
                    Rs. {item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const AccountPage = () => {
  const { provinces, cities, zones, fetchAddressDropdowns } = useAddressStore();

  const [activeTab, setActiveTab] = useState("account");
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showRemoveAccount, setShowRemoveAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    id: "",
    email: "",
    phone: "",
    full_name: "",
    profileImage: "",
    profile_image: "",
  });

  const [address, setAddress] = useState([]);
  const [homeAddress, setHomeAddress] = useState(null);
  const [officeAddress, setOfficeAddress] = useState(null);
  const [defaultBillingAddress, setDefaultBillingAddress] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetchAddressDropdowns();
  }, [fetchAddressDropdowns]);

  //all data here
  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
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
        console.error("Error loading user data:", result.error);
        // router.push("/account");
      }
    } catch (error) {
      toast.error("An error occurred while loading user data");
      console.error("Error fetching user data:", error);
      router.push("/account");
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleUpdateAddress = (updatedData) => {
    // Handle address update logic here
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

  if (isLoading) {
    return <FullScreenLoader />;
  }

  // // Mock address data - replace with actual API call
  // const address = {
  //   fullName: "John Doe",
  //   province: "Bagmati",
  //   city: "Kathmandu",
  //   zone: "Central",
  //   phone: "1234567890",
  //   addressType: "Home",
  // };

  // const homeAddress = {
  //   fullName: "John Doe",
  //   localAddress: "123 Main St",
  //   zone: "Central",
  //   city: "Kathmandu",
  //   province: "Bagmati",
  //   phone: "1234567890",
  // };

  // const officeAddress = {
  //   fullName: "John Doe",
  //   localAddress: "456 Office Ave",
  //   zone: "Central",
  //   city: "Kathmandu",
  //   province: "Bagmati",
  //   phone: "1234567890",
  // };

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
        address={homeAddress}
        onUpdate={handleUpdateAddress}
        onCancel={() => setShowEditAddress(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-8 px-4 sm:px-6 lg:px-8 py-8">
        {/* Sidebar */}
        <aside className="w-full md:w-80 flex-shrink-0">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <img
              src={
                user.profile_image ||
                "https://via.placeholder.com/120x120?text=Profile"
              }
              alt="Profile"
              className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-blue-100 object-cover"
            />
            <h3 className="font-bold text-xl text-gray-800">
              {user.full_name}
            </h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500 mt-1">{user.phone}</p>
          </div>

          <nav className="bg-white rounded-xl shadow p-4 mt-6">
            {sidebarItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex items-center w-full px-4 py-3 my-1 rounded-lg transition-colors text-left font-medium space-x-4
                  ${
                    activeTab === item.key
                      ? "bg-blue-50 text-blue-800 font-bold shadow-sm"
                      : "hover:bg-gray-100 text-gray-700"
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
        <main className="flex-1 min-w-0 bg-white rounded-xl shadow p-4 sm:p-6 lg:p-8">
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
              homeAddress={homeAddress}
              officeAddress={officeAddress}
              onEditHome={() => setShowEditAddress(true)}
              onEditOffice={() => setShowEditAddress(true)}
            />
          )}
          {activeTab === "orders" && <MyOrders />}
          {activeTab === "wishlist" && <MyWishlist />}
          {activeTab === "reviews" && <MyReviews />}
          {activeTab === "cancellations" && <MyCancellations />}
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
