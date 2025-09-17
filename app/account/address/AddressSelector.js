"use client";
import { useEffect, useState } from "react";
// import { sortAddressDropdowns } from "@/utils/apiHelper";
import { useAddressStore } from "@/stores/addressStore";

export default function AddressSelector() {
  

  const { provinces, cities, zones, loading, error, fetchAddressDropdowns } =
    useAddressStore();
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedCityId, setSelectedCityId] = useState("");
  const [selectedZoneId, setSelectedZoneId] = useState("");

  
  useEffect(() => {
    fetchAddressDropdowns();
  }, [fetchAddressDropdowns]);

  const handleProvinceChange = (e) => {
    setSelectedProvinceId(e.target.value);
    setSelectedCityId("");
    setSelectedZoneId("");
  };

  const handleCityChange = (e) => {
    setSelectedCityId(e.target.value);
    setSelectedZoneId("");
  };

  const handleZoneChange = (e) => {
    setSelectedZoneId(e.target.value);
  };

  return (
    <div className="space-y-4 max-w-md mx-auto mt-10">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {/* Province Dropdown */}
      <select onChange={handleProvinceChange} className="border p-2 w-full">
        <option value="">Select Province</option>
        {provinces.map((province) => (
          <option key={province.id} value={province.id}>
            {province.name}
          </option>
        ))}
      </select>

      {/* City Dropdown */}
      {selectedProvinceId && (
        <select onChange={handleCityChange} className="border p-2 w-full">
          <option value="">Select City</option>
          {cities
            .filter((city) => city.province_id === parseInt(selectedProvinceId))
            .map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
        </select>
      )}

      {/* Zone Dropdown */}
      {selectedCityId && (
        <select onChange={handleZoneChange} className="border p-2 w-full">
          <option value="">Select Zone</option>
          {zones
            .filter((zone) => zone.city_id === parseInt(selectedCityId))
            .map((zone) => (
              <option key={zone.id} value={zone.id}>
                {zone.zone_name}
              </option>
            ))}
        </select>
      )}

      {/* Selected Values */}
      {selectedZoneId && (
        <div className="mt-4 p-4 border rounded">
          <p>
            <strong>Selected Province ID:</strong> {selectedProvinceId}
          </p>
          <p>
            <strong>Selected City ID:</strong> {selectedCityId}
          </p>
          <p>
            <strong>Selected Zone ID:</strong> {selectedZoneId}
          </p>
        </div>
      )}
    </div>
  );
}
