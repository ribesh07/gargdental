import { useEffect, useState } from "react";
import { addCustomerAddress } from "@/utils/apiHelper";
import { toast } from "react-hot-toast";
import { apiRequest } from "@/utils/ApiSafeCalls";

export default function AddAddressForm({
  address,
  onUpdate,
  onCancel,
  provinces,
  cities,
  zones,
}) {
  const [formData, setFormData] = useState({
    full_name: "",
    phone: "",
    province_id: "",
    city_id: "",
    zone_id: "",
    landmark: "",
    address: "",
    address_type: "H",
  });
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedZoneId, setSelectedZoneId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNameChange = (e) => {
    setFormData((prev) => ({ ...prev, full_name: e.target.value }));
  };

  const handleProvinceChange = (e) => {
    setSelectedProvinceId(e.target.value);
    setFormData((prev) => ({ ...prev, province_id: e.target.value }));
    setSelectedCityId("");
    setSelectedZoneId("");
  };

  const handleCityChange = (e) => {
    setSelectedCityId(e.target.value);
    setFormData((prev) => ({ ...prev, city_id: e.target.value }));
    setSelectedZoneId("");
  };

  const handleZoneChange = (e) => {
    setSelectedZoneId(e.target.value);
    setFormData((prev) => ({ ...prev, zone_id: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("formData", formData);
    if (address.length === 0) {
      formData.default_shipping = "Y";
      formData.default_billing = "Y";
      const response = await addCustomerAddress(formData);
      console.log("response from handleSubmit", response);
      if (response.success === true) {
        toast.success(response.message);
        onUpdate(response.data);
      } else if (response.success === false) {
        toast.error(response.message);
      }
    } else {
      const response = await addCustomerAddress(formData);
      console.log("response from handleSubmit", response);
      if (response.success === true) {
        toast.success(response.message);
        onUpdate(response.data);
      } else if (response.success === false) {
        toast.error(response.message);
      }
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">
        ADD ADDRESS
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="full_name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleNameChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Phone */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          {/* Province */}
          <div>
            <label
              htmlFor="province"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Province
            </label>
            <select
              required
              id="province"
              name="province"
              value={formData.province_id}
              onChange={handleProvinceChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Province</option>
              {provinces.map((province) => (
                <option key={province.id} value={province.id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          {/* City */}
          <div>
            <label
              htmlFor="city"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              City
            </label>
            <select
              required
              id="city"
              name="city"
              value={formData.city_id}
              onChange={handleCityChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select City</option>
              {cities
                .filter(
                  (city) => city.province_id === parseInt(selectedProvinceId)
                )
                .map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
            </select>
          </div>
          {/* Zone */}
          <div>
            <label
              htmlFor="zone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Area
            </label>
            <select
              required
              id="zone"
              name="zone"
              value={formData.zone_id}
              onChange={handleZoneChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Area</option>
              {zones
                .filter((zone) => zone.city_id === parseInt(selectedCityId))
                .map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.zone_name}
                  </option>
                ))}
            </select>
          </div>
          {/* Landmark */}
          <div>
            <label
              htmlFor="landmark"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Landmark (Optional)
            </label>
            <input
              type="text"
              id="landmark"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Local Address / Tole */}
          <div>
            <label
              required
              htmlFor="localAddress"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Local Address / Tole
            </label>
            <input
              required
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {/* Address Type */}
          <div>
            <label
              htmlFor="address_type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address Type
            </label>
            <select
              id="address_type"
              name="address_type"
              value={formData.address_type}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="H">Home</option>
              <option value="O">Office</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
          >
            CANCEL
          </button>
          <button
            type="submit"
            className="bg-blue-900 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-800 transition-colors cursor-pointer"
          >
            ADD ADDRESS
          </button>
        </div>
      </form>
    </div>
  );
}
