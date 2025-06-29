"use client";

import { useState, useEffect } from "react";
import {
  User,
  MapPin,
  List,
  Heart,
  MessageSquare,
  RotateCcw,
} from "lucide-react";
import EditProfileForm from "./EditProfileForm";
import EditAddressForm from "./EditAddressForm";
import useCartStore from "@/stores/useCartStore";
import { useRouter } from "next/navigation";
import { AddressBook } from "./component/AddressBook";
import FullScreenLoader from "@/components/FullScreenLoader";
import { MyOrders } from "./component/MyOders";
import { MyWishlist } from "./component/MyWishlist";

function ManageMyAccount({ onEditProfile, user, address, onEditAddress }) {
  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col md:flex-row p-4 sm:p-6">
      {/* Sidebar placeholder if needed */}
      {/* <div className="w-full md:w-1/4">Sidebar here</div> */}

      {/* Main Content */}
      <div className="flex-1 w-full md:pl-6 flex flex-col">
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
              {user.firstName} {user.lastName}
            </div>
            <div className="text-gray-700 text-sm">{user.email}</div>
            <div className="text-gray-700 text-sm">{user.mobile}</div>
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
            <div className="text-gray-700 text-sm">{address.fullName}</div>
            <div className="text-gray-700 text-sm">
              {address.province} - {address.city} - {address.zone}
            </div>
            <div className="text-gray-700 text-sm">{address.phone}</div>
            <div className="text-gray-500 text-sm">
              {address.addressType} Address
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="font-semibold mb-2">Default Billing Address</div>
            <div className="text-gray-700 text-sm">{address.fullName}</div>
            <div className="text-gray-700 text-sm">
              {address.province} - {address.city} - {address.zone}
            </div>
            <div className="text-gray-700 text-sm">{address.phone}</div>
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
  const cancelledOrders = useCartStore((state) => state.cancelledOrders);
  return (
    <div className="w-full p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-900 mb-8">
        MY CANCELLATIONS
      </h2>
      {cancelledOrders.length === 0 ? (
        <div className="text-gray-500 text-center text-lg">No cancelled orders found.</div>
      ) : (
        cancelledOrders.map((order, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 mb-6 border">
            {/* Header: Order ID + Status */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-blue-700 font-semibold block">Order #{index + 1}</span>
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
                  Cancelled At <strong>{new Date(order.cancelledAt).toLocaleString()}</strong>
                </div>
              </div>
              <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
                Cancelled
              </span>
            </div>
            {/* Address */}
            <div className="mb-2 text-sm text-gray-700">
              <div><span className="font-semibold">Name:</span> {order.address?.fullName}</div>
              <div><span className="font-semibold">Address:</span> {order.address?.localAddress}, {order.address?.zone}, {order.address?.city}, {order.address?.province}</div>
              <div><span className="font-semibold">Phone:</span> {order.address?.phone}</div>
            </div>
            {/* Product Summary */}
            <div className="border p-4 rounded flex flex-col gap-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 border-b pb-2 last:border-b-0 last:pb-0">
                  <div className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded" />
                  </div>
                  <div className="flex-1">
                    <div className="text-gray-800 font-semibold">{item.name}</div>
                    <div className="text-sm text-gray-700">Qty: <span className="text-blue-700 font-bold">{item.quantity}</span></div>
                  </div>
                  <div className="text-right font-medium text-green-600">Rs. {item.price * item.quantity}</div>
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
  const [selected, setSelected] = useState(0);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingHomeAddress, setIsEditingHomeAddress] = useState(false);
  const [isEditingOfficeAddress, setIsEditingOfficeAddress] = useState(false);
  const [editingAddressType, setEditingAddressType] = useState(null);

  const orders = useCartStore((state) => state.orders);
  const cancelledOrders = useCartStore((state) => state.cancelledOrders);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    province: "",
    profileImage: "",
  });


  const [homeAddressData, setHomeAddressData] = useState({
    fullName: "Gyanendra Sah",
    phone: "9821212332",
    province: "Bagmati",
    city: "Kathmandu",
    zone: "Naxal",
    landmark: "Near Temple",
    localAddress: "Durbar Marg, Street 1",
    addressType: "Home",
  });

  const [officeAddressData, setOfficeAddressData] = useState({
    fullName: "Gyanendra Sah",
    phone: "9821212332",
    province: "Bagmati",
    city: "Kathmandu",
    zone: "Durbarmarg",
    landmark: "Near Office Building",
    localAddress: "New Road, Street 5",
    addressType: "Office",
  });

  const handleUpdateProfile = (updatedData) => {
    setUserData((prev) => ({
      ...prev,
      ...updatedData,
    }));
    setIsEditingProfile(false); // Go back to the main view
  };

  const handleUpdateAddress = (updatedData) => {
    if (editingAddressType === "home") {
      setHomeAddressData((prev) => ({
        ...prev,
        ...updatedData,
      }));
      setIsEditingHomeAddress(false);
    } else if (editingAddressType === "office") {
      setOfficeAddressData((prev) => ({
        ...prev,
        ...updatedData,
      }));
      setIsEditingOfficeAddress(false);
    }
    setEditingAddressType(null);
  };

  const handleEditHomeAddress = () => {
    setEditingAddressType("home");
    setIsEditingHomeAddress(true);
  };

  const handleEditOfficeAddress = () => {
    setEditingAddressType("office");
    setIsEditingOfficeAddress(true);
  };

  const sidebarItems = [
    { label: "Manage My Account", icon: User },
    { label: "Address Book", icon: MapPin },
    { label: "My Orders", icon: List, badge: orders.length },
    { label: "My Wishlist", icon: Heart },
    { label: "My Reviews", icon: MessageSquare },
    { label: "My Cancellations", icon: RotateCcw, badge: cancelledOrders.length },
  ];

  let mainContent;
  switch (selected) {
    case 0:
      mainContent = isEditingProfile ? (
        <EditProfileForm
          user={userData}
          onUpdate={handleUpdateProfile}
          onCancel={() => setIsEditingProfile(false)}
        />
      ) : (
        <ManageMyAccount
          onEditProfile={() => setIsEditingProfile(true)}
          user={userData}
          address={homeAddressData}
          onEditAddress={() => {
            setSelected(1); // Switch to AddressBook tab
            handleEditHomeAddress(); // Open edit form for home address
          }}
        />
      );
      break;
    case 1:
      mainContent =
        isEditingHomeAddress || isEditingOfficeAddress ? (
          <EditAddressForm
            address={
              editingAddressType === "home"
                ? homeAddressData
                : officeAddressData
            }
            onUpdate={handleUpdateAddress}
            onCancel={() => {
              setIsEditingHomeAddress(false);
              setIsEditingOfficeAddress(false);
              setEditingAddressType(null);
            }}
          />
        ) : (
          <AddressBook
            homeAddress={homeAddressData}
            officeAddress={officeAddressData}
            onEditHome={handleEditHomeAddress}
            onEditOffice={handleEditOfficeAddress}
          />
        );
      break;
    case 2:
      mainContent = <MyOrders />;
      break;
    case 3:
      mainContent = <MyWishlist />;
      break;
    case 4:
      mainContent = <MyReviews />;
      break;
    case 5:
      mainContent = <MyCancellations />;
      break;
    default:
      mainContent = null;
  }

  useEffect(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const details = await userDetails();
      setUserData(details);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-4 px-2 sm:px-4 py-6">
        <FullScreenLoader />
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 mb-4 md:mb-0">
          {/* Profile Section in Sidebar */}
          <div className="bg-white rounded-xl shadow p-4 text-center mb-4">
            <img
              src={userData.profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-100 object-cover"
            />
            <h3 className="font-bold text-lg text-gray-800">
              {userData.firstName} {userData.lastName}
            </h3>
            <p className="text-sm text-gray-500">{userData.email}</p>
          </div>
          <nav className="bg-white rounded-xl shadow p-2 flex flex-col gap-1">
            {sidebarItems.map((item, idx) => (
              <button
                key={item.label}
                onClick={() => setSelected(idx)}
                className={`flex items-center w-full px-4 py-2 my-1 rounded-lg transition-colors text-left text-sm font-medium space-x-3
                  ${selected === idx
                    ? "bg-blue-50 text-blue-900 font-bold shadow"
                    : "hover:bg-blue-100 text-gray-700"
                  }
                `}
              >
                <item.icon className="w-5 h-5 mr-2" />
                <span>{item.label}</span>
                {item.badge !== undefined && (
                  <span className="ml-auto bg-blue-600 text-white text-xs rounded px-2 py-0.5">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 min-w-0">{mainContent}</main>
      </div>
    </div>
  );
};

export default AccountPage;
