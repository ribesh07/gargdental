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
import FullScreenLoader from "@/components/FullScreenLoader";
import { userDetails } from "@/utils/apiHelper";
import { useRouter } from "next/navigation";
import useCartStore from "@/stores/useCartStore";

const sidebarItems = [
  { label: "Manage My Account", icon: User },
  { label: "Address Book", icon: MapPin },
  { label: "My Orders", icon: List, badge: 0 },
  { label: "My Wishlist", icon: Heart },
  { label: "My Reviews", icon: MessageSquare },
  { label: "My Cancellations", icon: RotateCcw },
];
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
            <div className="text-gray-700 text-sm">{user.full_name}</div>
            <div className="text-gray-700 text-sm">{user.email}</div>
            <div className="text-gray-700 text-sm">{user.phone}</div>
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

function AddressBook({ homeAddress, officeAddress, onEditHome, onEditOffice }) {
  return (
    <div className="bg-white rounded shadow p-6">
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
          <span className="font-semibold">Name:</span> {homeAddress.fullName}
        </p>
        <p>
          <span className="font-semibold">Address:</span>{" "}
          {homeAddress.localAddress}, {homeAddress.zone}, {homeAddress.city},{" "}
          {homeAddress.province}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {homeAddress.phone}
        </p>
        <p className="text-gray-500 pt-2">Default Shipping & Billing Address</p>
      </div>
      <br></br>

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
          <span className="font-semibold">Name:</span> {officeAddress.fullName}
        </p>
        <p>
          <span className="font-semibold">Address:</span>{" "}
          {officeAddress.localAddress}, {officeAddress.zone},{" "}
          {officeAddress.city}, {officeAddress.province}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {officeAddress.phone}
        </p>
      </div>
    </div>
  );
}

function MyOrders() {
  const orders = useCartStore((state) => state.orders);
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
  const wishlist = useCartStore((state) => state.wishlist);
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
          {wishlist.map((item) => {
            return (
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
            );
          })}
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
  return (
    <div className="w-full p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-900 mb-8">
        MY CANCELLATIONS
      </h2>
      {/* Simulated Cancellations (map over real cancellations in production) */}
      {[1, 2].map((order, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-4 mb-6 border">
          {/* Header: Order ID + Status */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <a
                href="#"
                className="text-blue-700 font-semibold block hover:underline"
              >
                Order #ORD20250625{index === 0 ? "0003" : "0002"}
              </a>
              <div className="text-sm text-gray-500">
                Placed on 25 Jun 2025 {index === 0 ? "14:34:50" : "13:45:58"}
              </div>
              <div className="text-sm text-gray-600">
                Pay Amount <strong>970.00</strong>
              </div>
              <div className="text-sm text-gray-600">
                Shipping Cost <strong>70.00</strong>
              </div>
            </div>
            <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded-full">
              Cancelled
            </span>
          </div>

          {/* Product Summary */}
          <div className="border p-4 rounded flex flex-col sm:flex-row items-center gap-4">
            <img
              src={
                index === 0
                  ? "https://gargdemo.omsok.com/storage/app/public/backend/productimages/S700001/bausch_articulating_paper_bk_17.jpeg"
                  : "https://garg.omsok.com/storage/app/public/backend/productimages/HE00005/articulating_paper_200_strips.jpeg"
              }
              alt="Product"
              className="w-20 h-20 object-cover rounded-full"
            />
            <div className="flex-1">
              <div className="text-gray-800 font-semibold">
                {index === 0
                  ? "Teeth Maintain"
                  : "Articulating Paper 200 strips"}
              </div>
              <div className="text-sm text-gray-700">
                Total: <span className="text-blue-700 font-bold">900.00</span>{" "}
                &nbsp; Qty:
                <span className="text-blue-700 font-bold">1</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const AccountPage = ({ token }) => {
  const router = useRouter();
  const [selected, setSelected] = useState(0);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingHomeAddress, setIsEditingHomeAddress] = useState(false);
  const [isEditingOfficeAddress, setIsEditingOfficeAddress] = useState(false);
  const [editingAddressType, setEditingAddressType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserData] = useState({
    full_name: "",
    phone: "",
    email: "",
    image_full_url: null,
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

  useEffect(() => {
    setIsLoading(true);

    if (token) {
      (async () => {
        const details = await userDetails();
        setUserData(details);
        setIsLoading(false);
      })();
    } else {
      setIsLoading(false);
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-4 px-2 sm:px-4 py-6">
        {isLoading && <FullScreenLoader />}
        {!isLoading && (
          <>
            {/* Sidebar */}
            <aside className="w-full md:w-64 flex-shrink-0 mb-4 md:mb-0">
              {/* Profile Section in Sidebar */}
              <div className="bg-white rounded-xl shadow p-4 text-center mb-4">
                {userData.image_full_url && (
                  <img
                    src={userData.image_full_url}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-100 object-cover"
                  />
                )}
                {!userData.image_full_url && (
                  <User className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-blue-100 object-cover" />
                )}
                <h3 className="font-bold text-lg text-gray-800">
                  {userData.full_name}
                </h3>
                <p className="text-sm text-gray-500">{userData.phone}</p>
              </div>
              <nav className="bg-white rounded-xl shadow p-2 flex flex-col gap-1">
                {sidebarItems.map((item, idx) => (
                  <button
                    key={item.label}
                    onClick={() => setSelected(idx)}
                    className={`flex items-center w-full px-4 py-2 my-1 rounded-lg transition-colors text-left text-sm font-medium space-x-3
                  ${
                    selected === idx
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
          </>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
