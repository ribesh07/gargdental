"use client";
// import { useAddressStore } from "@/stores/addressStore";
import { Trash2 } from "lucide-react";
import { deleteCustomerAddress } from "@/utils/apiHelper";
import { toast } from "react-hot-toast";
import { useState } from "react";
import AddAddressForm from "./AddAddressForm";
import { useRouter } from "next/navigation";
import useConfirmModalStore from "@/stores/confirmModalStore";
import useInfoModalStore from "@/stores/infoModalStore";
import { apiRequest } from "@/utils/ApiSafeCalls";

export default function AddressBook({
  address,
  homeAddress,
  officeAddress,
  onEditHome,
  provinces,
  cities,
  zones,
}) {
  const [showEditAddress, setShowEditAddress] = useState(false);
  const router = useRouter();

  console.log("officeAddress", officeAddress);
  console.log("homeAddress", homeAddress);
  console.log("address", address);
  const provinceName =
    provinces.find((p) => p.id === homeAddress?.province_id)?.name || "";
  const cityName = homeAddress?.city?.city || "";
  const zoneName =
    zones.find((z) => z.id === homeAddress?.zone_id)?.zone_name || "";

  const officeProvinceName =
    provinces.find((p) => p.id === officeAddress?.province_id)?.name || "";
  const officeCityName = officeAddress?.city?.city || "";
  const officeZoneName =
    zones.find((z) => z.id === officeAddress?.zone_id)?.zone_name || "";

  const handleAddAddress = (newAddress) => {
    console.log("newAddress", newAddress);
    // fetchUserData();
    setShowEditAddress(false);
    window.location.reload();
    router.refresh();
    toast.success("Address added successfully!");
  };

  const handleDelete = async (id) => {
    console.log("delete", id);
    if (!id)
      return useInfoModalStore
        .getState()
        .open({ title: "Info", message: "No address to delete" });
    useConfirmModalStore.getState().open({
      title: "Delete Address",
      message: "Are you sure you want to delete this address?",
      onConfirm: async () => {
        const response = await deleteCustomerAddress(id);
        console.log("response from handleDelete", response);
        if (response.success) {
          router.refresh();
          window.location.reload();
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      },
      onCancel: () => {},
    });
  };

  // Function to set an address as default shipping and billing
  const setDefaultAddressAndBilling = async (id) => {
    const payload = {
      default_billing: "Y",
    };
    const [shipRes, billRes] = await Promise.all([
      apiRequest(`/customer/address/set-default-address/${id}`, true, {
        method: "POST",
        body: JSON.stringify({ default_shipping: "Y" }),
      }),
      apiRequest(`/customer/address/set-default-billing/${id}`, true, {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    ]);

    return {
      success: shipRes.success && billRes.success,
      message:
        shipRes.success && billRes.success
          ? "Address set as default successfully"
          : shipRes.message ||
            billRes.message ||
            "Failed to set default address",
      shipRes,
      billRes,
    };
  };

  const handleSetDefaultBilling = async (id) => {
    console.log("set default address", id);
    if (!id)
      return useInfoModalStore
        .getState()
        .open({ title: "Info", message: "No address to set as default" });
    // const response = await setDefaultAddressAndBilling(id);
    const response = await apiRequest(
      `/customer/address/set-default-billing/${id}`,
      true,
      { method: "POST", body: JSON.stringify({}) }
    );
    const { success, message } = response;
    console.log("response from handleSetDefault", response);
    if (success) {
      router.refresh();
      window.location.reload();
      toast.success(message);
    } else {
      toast.error(
        message || "Failed to set default address , Please try again later"
      );
    }
  };
  const handleSetDefaultShipping = async (id) => {
    console.log("set default address", id);
    if (!id)
      return useInfoModalStore
        .getState()
        .open({ title: "Info", message: "No address to set as default" });
    // const response = await setDefaultAddressAndBilling(id);
    const response = await apiRequest(
      `/customer/address/set-default-shipping/${id}`,
      true,
      { method: "POST", body: JSON.stringify({}) }
    );
    const { success, message } = response;
    console.log("response from handleSetDefault", response);
    if (success) {
      router.refresh();
      window.location.reload();
      toast.success(message);
    } else {
      toast.error(
        message || "Failed to set default address , Please try again later"
      );
    }
  };

  return (
    <>
      {!showEditAddress && (
        <div className="bg-gray-50 rounded shadow p-6 relative min-h-[calc(65vh-180px)]">
          <h1 className="text-2xl font-bold text-blue-900 mb-6">
            Address Book
          </h1>

          {address &&
            address.length > 0 &&
            address.map((addr) => (
              <div
                className="border rounded-2xl border-gray-200 px-4 py-4 my-4"
                key={addr.id}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-blue-900">Address</h2>
                  <div className="flex gap-4">
                    <div className="flex items-center flex-row gap-1 hover:underline">
                      <div className="bg-red-100 p-1 rounded-full">
                        <Trash2 className="w-3 h-3 text-red-600" />
                      </div>
                      <button
                        onClick={() => handleDelete(addr.id)}
                        className="text-red-600 text-sm hover:underline font-semibold cursor-pointer"
                      >
                        DELETE
                      </button>
                    </div>
                    <button
                      onClick={() => onEditHome(addr)}
                      className="text-blue-500 text-sm hover:underline font-semibold cursor-pointer"
                    >
                      EDIT
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-gray-700 text-sm">
                  <p>
                    <span className="font-semibold">Name:</span>{" "}
                    {addr.full_name}
                  </p>
                  <p>
                    <span className="font-semibold">Address Type:</span>{" "}
                    {addr.address_type === "H" ? "Home" : "Office"}
                  </p>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {addr.landmark}, {addr.zone_name} - {addr.city} -{" "}
                    {addr.province}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span> {addr.phone}
                  </p>
                  <div className="flex items-center gap-2">
                    {addr.default_shipping?.trim().toUpperCase() === "Y" &&
                      addr.default_billing?.trim().toUpperCase() === "Y" && (
                        <p className="text-gray-500 pt-2">
                          Default Shipping & Billing Address
                        </p>
                      )}
                    {addr.default_shipping?.trim().toUpperCase() === "Y" &&
                      addr.default_billing?.trim().toUpperCase() !== "Y" && (
                        <p className="text-gray-500 pt-2">
                          Default Shipping Address
                        </p>
                      )}
                    {addr.default_shipping?.trim().toUpperCase() !== "Y" &&
                      addr.default_billing?.trim().toUpperCase() === "Y" && (
                        <p className="text-gray-500 pt-2">
                          Default Billing Address
                        </p>
                      )}
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    {addr.default_shipping?.trim().toUpperCase() !== "Y" && (
                      <button
                        onClick={() => handleSetDefaultShipping(addr.id)}
                        className="text-blue-500 text-sm hover:underline font-semibold cursor-pointer"
                      >
                        SET AS DEFAULT SHIPPING
                      </button>
                    )}
                    {addr.default_billing?.trim().toUpperCase() !== "Y" && (
                      <button
                        onClick={() => handleSetDefaultBilling(addr.id)}
                        className="text-blue-500 text-sm hover:underline font-semibold cursor-pointer"
                      >
                        SET AS DEFAULT BILLING
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

          {address.length === 0 && (
            <div className="text-gray-500 text-center py-4">
              No addresses found. Please add an address.
            </div>
          )}

          <div className="mt-10">
            <div className="flex justify-end">
              {/* Add Address Button pinned to bottom-right */}
              <button
                onClick={() => setShowEditAddress(true)}
                className="absolute bottom-6 right-6 bg-blue-600 text-white text-sm font-semibold rounded-full px-4 py-2 shadow-lg hover:text-red-600 transition trasntion-duration-300 cursor-pointer"
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditAddress && (
        <AddAddressForm
          address={address}
          onUpdate={handleAddAddress}
          onCancel={() => setShowEditAddress(false)}
          provinces={provinces}
          cities={cities}
          zones={zones}
        />
      )}
    </>
  );
}
