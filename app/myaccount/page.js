"use client";

import { useState } from "react";
import {
  User,
  MapPin,
  List,
  Heart,
  MessageSquare,
  RotateCcw,
} from "lucide-react";

const sidebarItems = [
  { label: "Manage My Account", icon: User },
  { label: "Address Book", icon: MapPin },
  { label: "My Orders", icon: List, badge: 0 },
  { label: "My Wishlist", icon: Heart },
  { label: "My Reviews", icon: MessageSquare },
  { label: "My Cancellations", icon: RotateCcw },
];
function ManageMyAccount() {
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
              <a href="#" className="text-blue-500 text-sm underline">
                EDIT
              </a>
            </div>
            <div className="text-gray-700 text-sm">Users</div>
            <div className="text-gray-700 text-sm">users@gmail.com</div>
            <div className="text-gray-700 text-sm">9821212332</div>
          </div>

          {/* Address Book */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Address Book</span>
              <a href="#" className="text-blue-500 text-sm underline">
                EDIT
              </a>
            </div>
            <div className="text-gray-700 text-sm">Gaur</div>
            <div className="text-gray-700 text-sm">
              Bagmati Province - Kathmandu Metro 1 - Naxal Area - Durbarmarg
            </div>
            <div className="text-gray-700 text-sm">9821212332</div>
            <div className="text-gray-500 text-sm">
              Default Shipping Address
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="font-semibold mb-2">Default Billing Address</div>
            <div className="text-gray-700 text-sm">Gaur</div>
            <div className="text-gray-700 text-sm">
              Bagmati Province - Kathmandu Metro 1 - Naxal Area - Durbarmarg
            </div>
            <div className="text-gray-700 text-sm">9821212332</div>
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

function AddressBook() {
  return (
    <div className="bg-white rounded shadow p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">Address Book</span>
        <a href="#" className="text-blue-500 text-sm underline">
          EDIT
        </a>
      </div>
      <div className="text-gray-700 text-sm">Gaur</div>
      <div className="text-gray-700 text-sm">
        Bagmati Province - Kathmandu Metro 1 - Naxal Area - Durbarmarg
      </div>
      <div className="text-gray-700 text-sm">9821212332</div>
      <div className="text-gray-500 text-sm">Default Shipping Address</div>
      <div className="text-gray-500 text-sm">Default Billing Address</div>
    </div>
  );
}

function MyOrders() {
  return (
    <div className="w-full p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-900 mb-8">
        MY ORDERS
      </h2>

      {/* Simulated Orders (map over real orders in production) */}
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
            <span className="bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">
              Processing
            </span>
          </div>

          {/* Product Summary */}
          <div className="border p-4 rounded flex flex-col sm:flex-row items-center gap-4">
            <img
              src={
                index === 0
                  ? "https://gargdemo.omsok.com/storage/app/public/backend/productimages/S700001/bausch_articulating_paper_bk_17.jpeg" // replace with your real image
                  : "https://garg.omsok.com/storage/app/public/backend/productimages/HE00005/articulating_paper_200_strips.jpeg"
              } // placeholder image
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
            <button className="text-red-600 text-sm font-semibold flex items-center hover:underline">
              CANCEL <span className="ml-1">❌</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function MyWishlist() {
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-900 mb-4">
        MY WISHLIST
      </h2>
      <div className="text-gray-400 text-lg mt-12">No data record.</div>
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

const AccountPage = () => {
  const [selected, setSelected] = useState(0);

  let mainContent;
  switch (selected) {
    case 0:
      mainContent = <ManageMyAccount />;
      break;
    case 1:
      mainContent = <AddressBook />;
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-4 px-2 sm:px-4 py-6">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0 mb-4 md:mb-0">
          <nav className="bg-white rounded-xl shadow p-2 flex md:flex-col flex-row gap-2 md:gap-0">
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
      </div>
    </div>
  );
};

export default AccountPage;
