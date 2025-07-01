// import { useAddressStore } from "@/stores/addressStore";

export default function AddressBook({
  homeAddress,
  officeAddress,
  onEditHome,
  onEditOffice,
  provinces,
  cities,
  zones,
}) {
  const provinceName =
    provinces.find((p) => p.id === homeAddress?.province_id)?.name || "";
  const cityName =
    cities.find((c) => c.id === homeAddress?.city_id)?.name || "";
  const zoneName =
    zones.find((z) => z.id === homeAddress?.zone_id)?.zone_name || "";

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
          , {zoneName} - {cityName} - {provinceName}
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
          {officeAddress?.address}, {zoneName} - {cityName} - {provinceName}
        </p>
        <p>
          <span className="font-semibold">Phone:</span> {officeAddress?.phone}
        </p>
      </div>

      <div className="mt-10">
        <div className="flex justify-end">
          {/* Add Address Button pinned to bottom-right */}
          <button
            onClick={onEditHome}
            className="absolute bottom-6 right-6 bg-blue-600 text-white text-sm font-semibold rounded-full px-4 py-2 shadow-lg hover:text-red-600 transition trasntion-duration-300"
          >
            Add Address
          </button>
        </div>
      </div>
    </div>
  );
}
