import { Shield, Trash2, LogOut} from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ManageMyAccount({
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

  
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter(); 

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
      localStorage.removeItem("token");

      const useCartStore = await import("@/stores/useCartStore");
      useCartStore.default.getState().clearCart();

      toast.success("Logged out successfully");
      router.push("/dashboard"); 
    } else {
      toast.error("Logout failed");
    }
  } catch (error) {
    console.error("Logout error:", error);
    toast.error("An error occurred during logout");
  } finally {
    setIsLoading(false);
  }
};







  return (
    <div className="min-h-screen w-full bg-gray-50 flex flex-col px-4 sm:px-6 py-6">
      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto flex flex-col space-y-6">
        {/* Profile / Address Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Personal Profile */}
          <div className="bg-gray-50 rounded-xl shadow p-4 hover:shadow-lg transition-shadow duration-300">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Personal Profile</span>
              <button
                onClick={onEditProfile}
                className="text-blue-500 text-sm underline cursor-pointer"
              >
                EDIT
              </button>
            </div>
            <div className="text-gray-700 text-sm">
              {user.full_name ||
                `${user.firstName || ""} ${user.lastName || ""}`.trim()}
            </div>
            <div className="text-gray-700 text-sm max-w-[50px]">
              {user.email}
            </div>
            <div className="text-gray-700 text-sm">
              {user.phone || user.mobile}
            </div>
          </div>

          {/* Address Book */}
          <div className="bg-gray-50 rounded-xl shadow p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Address Book</span>
              <button
                onClick={onEditAddress}
                className="text-blue-500 text-sm underline cursor-pointer"
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
          <div className="bg-gray-50 rounded-xl shadow p-4">
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
        <div className="bg-gray-50 rounded-xl shadow p-4 md:p-6 w-full">
          <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Account Security
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
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
                className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
              >
                Change
              </button>
            </div>


            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <LogOut className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Account logout</h4>
                  <p className="text-sm text-gray-600">
                    
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer"
              >
                Logout
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
                className="text-red-600 hover:text-red-800 text-sm font-medium cursor-pointer"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        {/* Order Stats */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-xl shadow flex flex-col items-center py-6">
            <span className="text-orange-500 text-3xl">🛒</span>
            <div className="text-xl font-bold mt-2">0</div>
            <div className="text-gray-500 text-sm">Orders Placed</div>
          </div>
          <div className="bg-gray-50 rounded-xl shadow flex flex-col items-center py-6">
            <span className="text-green-500 text-3xl">❌</span>
            <div className="text-xl font-bold mt-2">0</div>
            <div className="text-gray-500 text-sm">Orders Cancelled</div>
          </div>
          <div className="bg-gray-50 rounded-xl shadow flex flex-col items-center py-6">
            <span className="text-blue-500 text-3xl">💙</span>
            <div className="text-xl font-bold mt-2">0</div>
            <div className="text-gray-500 text-sm">Wishlist</div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
