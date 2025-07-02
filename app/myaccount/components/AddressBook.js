// import { useAddressStore } from "@/stores/addressStore";
import { Trash2 } from "lucide-react";
import { deleteCustomerAddress } from "@/utils/apiHelper";
import { toast } from "react-hot-toast";
import { useState } from "react";
import AddAddressForm from "./AddAddressForm";
import { useRouter } from "next/navigation";

export default function AddressBook({
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
  const provinceName =
    provinces.find((p) => p.id === homeAddress?.province_id)?.name || "";
  const cityName =
    cities.find((c) => c.id === homeAddress?.city_id)?.name || "";
  const zoneName =
    zones.find((z) => z.id === homeAddress?.zone_id)?.zone_name || "";

  const officeProvinceName =
    provinces.find((p) => p.id === officeAddress?.province_id)?.name || "";
  const officeCityName =
    cities.find((c) => c.id === officeAddress?.city_id)?.name || "";
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
    if (!id) return alert("No address to delete");
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (!confirmDelete) return;

    const response = await deleteCustomerAddress(id);
    console.log("response from handleDelete", response);
    if (response.success) {
      router.refresh();
      window.location.reload();
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      {!showEditAddress && (
        <div className="bg-white rounded shadow p-6 relative min-h-[calc(65vh-180px)]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-900">Home Address</h2>
            <div className="flex gap-4">
              {homeAddress && (
                <>
                  <div className="flex items-center flex-row gap-1 hover:underline">
                    <div className="bg-red-100 p-1 rounded-full">
                      <Trash2 className="w-3 h-3 text-red-600" />
                    </div>
                    <button
                      onClick={() => handleDelete(homeAddress.id)}
                      className="text-red-600 text-sm hover:underline font-semibold"
                    >
                      DELETE
                    </button>
                  </div>
                  <button
                    onClick={() => onEditHome(homeAddress)}
                    className="text-blue-500 text-sm hover:underline font-semibold"
                  >
                    EDIT
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="space-y-2 text-gray-700 text-sm">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {homeAddress?.full_name}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {homeAddress?.landmark}, {zoneName} - {cityName} - {provinceName}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {homeAddress?.phone}
            </p>
            <p className="text-gray-500 pt-2">
              Default Shipping & Billing Address
            </p>
          </div>
          <br />
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-900">Office Address</h2>
            <div className="flex gap-4">
              {officeAddress && (
                <>
                  <div className="flex items-center flex-row gap-1 hover:underline">
                    <div className="bg-red-100 p-1 rounded-full">
                      <Trash2 className="w-3 h-3 text-red-600" />
                    </div>
                    <button
                      onClick={() => handleDelete(officeAddress?.id)}
                      className="text-red-600 text-sm hover:underline font-semibold"
                    >
                      DELETE
                    </button>
                  </div>
                  <button
                    onClick={() => onEditHome(officeAddress)}
                    className="text-blue-500 text-sm hover:underline font-semibold"
                  >
                    EDIT
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="space-y-2 text-gray-700 text-sm">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {officeAddress?.full_name}
            </p>
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {officeAddress?.landmark}, {officeZoneName} {officeCityName}{" "}
              {officeProvinceName}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {officeAddress?.phone}
            </p>
          </div>

          <div className="mt-10">
            <div className="flex justify-end">
              {/* Add Address Button pinned to bottom-right */}
              <button
                onClick={() => setShowEditAddress(true)}
                className="absolute bottom-6 right-6 bg-blue-600 text-white text-sm font-semibold rounded-full px-4 py-2 shadow-lg hover:text-red-600 transition trasntion-duration-300"
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
      )}
      {showEditAddress && (
        <AddAddressForm
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
