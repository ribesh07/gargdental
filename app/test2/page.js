"use client";
import { useEffect , useState } from "react";
import { useProductStore , useCategoryStore ,useManufacturerStore} from "@/stores/InitdataFetch";
import { useUserStore } from "@/stores/useUserStore";

export default function ProductList() {
  const { products, loading, error } = useProductStore();
  const { categories, loadingcategory, errorcategory } = useCategoryStore();
  const { manufacturers, loadingmanufacturer, errormanufacturer } = useManufacturerStore();
  const { user, addresses, fetchUserData, isloadingUserData } = useUserStore();


  useEffect(() => {
    fetchUserData();
  }, []);


  // console.log("Products from store:", products);
  // console.log("Categories from store:", categories);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!products) return <p>No products available</p>;
  if (loadingcategory) return <p>Loading categories...</p>;
  if (errorcategory) return <p className="text-red-500">Error: {errorcategory}</p>;
  if(!categories) return <p>No categories available</p>;
  if (loadingmanufacturer) return <p>Loading manufacturers...</p>;
  if (errormanufacturer) return <p className="text-red-500">Error
: {errormanufacturer}</p>;
  if(!manufacturers) return <p>No manufacturers available</p>;
  if (isloadingUserData) return <p>Loading user data...</p>;
  if(addresses.length === 0) return <p>No addresses available</p>;
  if(addresses.length > 0) {
    console.log("User addresses:", addresses);
  }
  const [selectedId, setSelectedId] = useState(null);
  const selectedShippingAddress = addresses.find(addr => addr.id === selectedId);

  return (
    <>
    <div>
 {/* <ul>
      {manufacturers.map((p) => (
        <li key={p.id}>
          {p.id} 
        </li>
      ))}

    </ul> */}
    <select
                    className="mb-2 p-2 border rounded text-sm w-full"
                    value={selectedId || ""}
                    onChange={(e) => setSelectedId(Number(e.target.value))}
                  >
                    <option value="" disabled>
                      Select Shipping Address
                    </option>
                    {addresses.map((addr) => (
                      <option key={addr.id} value={addr.id}>
                        {addr.full_name} - {addr.address}, {addr.landmark}, {addr.city}
                      </option>
                    ))}
                  </select>
   
    </div>
    <ul>
      {addresses.map((p) => (
        <li key={p.id}>
          {p.id} 
        </li>
      ))}

    </ul>
    </>
  );
}
