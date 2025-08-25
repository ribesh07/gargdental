"use client";
import { Suspense } from "react";

function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductAPIRequest />
    </Suspense>
  );
}



import React, { useState, useEffect } from "react";
import {
  Search,
  Package,
  ChevronDown,
  Tag,
  Loader2,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import useSelectedProductStore from "@/stores/sendingProduct";
import { BuyNow } from "@/components/BuyNow";
// import MainTopBar from "@/components/mainTopbar";
import { usePathname } from "next/navigation";
import { useSearchParams } from "next/navigation";
// import HeaderBarNew from "@/components/HeaderBarNew";
import { baseUrl } from "@/utils/config";
// import HtmlDataConversion from "@/components/HtmlDataConversion";
import { apiRequest } from "@/utils/ApiSafeCalls";
import ProductImageZoom from "@/components/ProductImageZoom";

import { AddToCart, ViewProducts } from "@/components/addtocartbutton";
import MultiLevelDropdown from "./MultiLevelDropDown";
import { useProductStore , useCategoryStore ,useManufacturerStore} from "@/stores/InitdataFetch";


const ProductAPIRequest = () => {
  
     const { products, loading, error } = useProductStore();
  // const [products, setProducts] = useState([]);
  const [loadings, setLoading] = useState(false);
  const [errors, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { categories, loadingcategory, errorcategory } = useCategoryStore();

  const pathname = usePathname();
  const router = useRouter();
  const setSelectedProduct = useSelectedProductStore(
    (state) => state.setSelectedProduct
  );

  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get("category");
  const manufacturerFromUrl = searchParams.get("manufacturer");
  const queryFromUrl = searchParams.get("query");

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);

  // const [manufacturers, setManufacturers] = useState([]);
  const { manufacturers, loadingmanufacturer, errormanufacturer } = useManufacturerStore();

  const [offset, setOffset] = useState(0);
    const [filterON, setfilterON] = useState(false);

  //  set initial category from URL
  useEffect(() => {
    if (categoryFromUrl) {
      const selected = categories
        .flatMap((cat) => [cat, ...(cat.active_children || [])])
        .flatMap((c) => [c, ...(c.active_children || [])])
        .find((c) => c.id === parseInt(categoryFromUrl));
      setSelectedCategory(selected || null);
    }
  }, [categoryFromUrl, categories]);

  useEffect(() => {
    if (queryFromUrl) {
      setSearchTerm(queryFromUrl);
    }
  }, [queryFromUrl]);

  //  set initial manufacturer from URL
useEffect(() => {
  if (manufacturerFromUrl && manufacturers.length > 0) {
    // Find manufacturer by ID
    const selected = manufacturers.find(
      (m) => m.id.toString() === manufacturerFromUrl // convert to string
    );
    if (selected) {
      setSelectedManufacturer(selected);
      setFilters((prev) => ({ ...prev, brand: selected.brand_name })); // set select value
    }
  }
}, [manufacturerFromUrl, manufacturers]);


  const CACHE_KEY = "productsCache";
  const CACHE_DURATION = 5 * 60 * 1000;

  // const fetchProducts = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     if (typeof window !== "undefined") {
  //       const cached = localStorage.getItem(CACHE_KEY);
  //       const { data, expiry } = JSON.parse(cached);
  //       if (cached && data.length > 0) {
  //         if (Date.now() < expiry) {
  //           console.log("Returning cached data");
  //           console.log(data);
  //           setProducts(data);
  //           return;
  //         }
  //       }
  //     }
  //     console.log("Fetching new data from API");

  //     const data = await apiRequest(`/products/all`, false);
  //     const transformedProducts =
  //       data.products?.map((product) => ({
  //         id: product.id,
  //         product_name: product.product_name,
  //         stock_quantity: product.stock_quantity,
  //         available_quantity: product.available_quantity,
  //         product_code: product.product_code,
  //         has_variations: product.has_variations,
  //         starting_price: product.starting_price,
  //         brand: product.brand?.brand_name || "No Brand",
  //         category: product.category?.category_name || "Uncategorized",
  //         category_id: product.category?.id || null,
  //         parent_id: product.category?.parent_id || null,
  //         item_number: `#${product.product_code}`,
  //         actual_price: product.actual_price,
  //         sell_price: product.sell_price,
  //         image_url:
  //           product.main_image_full_url ||
  //           product.image_full_url ||
  //           `assets/logo.png`,
  //         description: product.product_description,
  //         unit_info: product.unit_info,
  //         flash_sale: product.flash_sale,
  //         delivery_days: product.delivery_target_days,
  //       })) || [];

  //     if (typeof window !== "undefined") {
  //       localStorage.setItem(
  //         CACHE_KEY,
  //         JSON.stringify({
  //           data: transformedProducts,
  //           expiry: Date.now() + CACHE_DURATION,
  //         })
  //       );
  //     }

  //     setProducts(transformedProducts);
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, []);


// Recursive mapper function
//map category and its children
const mapCategory = (category) => {
  return {
    id: category.id,
    name: category.category_name,
    parent_id: category.parent_id,
    image: category.image_full_url,
    children: category.active_children?.map(mapCategory) || [],
  };
};

// Main mapper for the API response
const mapCategories = (categories) => {
  return categories.map(mapCategory);
};



  // Fetch categories
  // useEffect(() => {
  //   const fetchCategories = async () => {

  //     const response = await apiRequest("/categories", false);
  //     if (response.success) {
       
  //       const mappedCategories = mapCategories(response.categories);
  //       console.log("mappedCategories", mappedCategories);
  //       setCategories(mappedCategories);
  //     }
  //   };
  //   fetchCategories();
  // }, []);


  // Fetch manufacturers
  
  // const fetchManufacturers = async () => {
  //    setLoading(true);
  //   try{
  //     const response = await apiRequest("/brands", false);
  //     if (response.success) {
  //       console.log("response.brands", response);
  //       const simplifiedBrands = response.brands.map((brand) => ({
  //         id: brand.id,
  //         brand_name: brand.brand_name,
  //       }));
  //       setManufacturers(simplifiedBrands);
  //       console.log("simplifiedBrands", simplifiedBrands);
  //     }
  //   }catch(err){
  //     setError(err.message);
  //     setLoading(false);
  //   }finally{
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
   
  //   fetchManufacturers();
  // }, []);

  // Recursive function: collect selected category + its children ids
  const getAllChildCategoryIds = (category) => {
  if (!category) return [];
  let ids = [category.id];
  category.children.forEach((child) => {
    ids = [...ids, ...getAllChildCategoryIds(child)];
  });
  return ids;
};


  const handleFilterChange = (filterType, value) => {
    setfilterON(true);
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };
   const [filters, setFilters] = useState({
      category: "",
      brand: "",
    });

  // Filtering products
//  const filteredProducts = products.filter((product) => {
//   const matchesSearch =
//     product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.product_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     product.brand.toLowerCase().includes(searchTerm.toLowerCase());

//   const matchesBrand =
//     !filters.brand || product.brand === filters.brand;

//   if (!selectedCategory) return matchesSearch && matchesBrand;

//   const allowedCategoryIds = getAllChildCategoryIds(selectedCategory);
//   return (
//     matchesSearch &&
//     matchesBrand &&
//     allowedCategoryIds.includes(product.category_id)
//   );
// });

const categoryMap = useMemo(() => {
  const map = {};
  const fillMap = (cat) => {
    map[cat.id] = [cat.id, ...(cat.children.flatMap((c) => fillMap(c)))];
    return map[cat.id];
  };
  categories.forEach(fillMap);
  return map;
}, [categories]);


const filteredProducts = useMemo(() => {
  return products.filter((product) => {
    const matchesSearch =
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBrand = !filters.brand || product.brand === filters.brand;

    if (!selectedCategory) return matchesSearch && matchesBrand;

    // const allowedCategoryIds = getAllChildCategoryIds(selectedCategory);
    const allowedCategoryIds = selectedCategory ? categoryMap[selectedCategory.id] : [];

    return matchesSearch && matchesBrand && allowedCategoryIds.includes(product.category_id);
  });
}, [products, searchTerm, filters.brand, selectedCategory]);


   

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl my-6 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Package className="h-8 w-8 text-blue-600" />
              Product Catalog
            </h1>
            {/* <button
              onClick={() => fetchProducts()}
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RotateCcw className="h-4 w-4" />
              )}
              Refresh
            </button> */}
          </div>
        </div>

        {/* Filters  part*/}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-300 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products, codes, or brands..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300  focus:border-transparent"
              />
            </div>

           
         {/* Category Filter */}
            <div className="relative w-full sm:w-auto flex flex-row  border-gray-300 rounded border-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent ">


           <MultiLevelDropdown
            categories={categories}
            onSelect={(cat) => {
              setSelectedCategory(cat); // set selected category state
              handleFilterChange("category", cat.id); // apply your filter
            }}
          />
            
              {/* <ChevronDown className=" transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" /> */}
            </div>


                  {/* Brand Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange("brand", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Brands</option>
                {manufacturers.map((brand) => (
                  <option key={brand.id} value={brand.brand_name}>
                    {brand.brand_name}
                  </option>
                ))}
              </select>

             
            </div>           


            {/* <select
              value={selectedCategory?.id || ""}
              onChange={(e) => {
                const selected = categories
                  .flatMap((cat) => [cat, ...(cat.active_children || [])])
                  .flatMap((c) => [c, ...(c.active_children || [])])
                  .find((c) => c.id === parseInt(e.target.value));
                setSelectedCategory(selected || null);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <React.Fragment key={category.id}>
                  <option value={category.id}>{category.name}</option>
                  {category.active_children.map((sub) => (
                    <React.Fragment key={sub.id}>
                      <option value={sub.id}>-- {sub.name}</option>
                      {sub.active_children.map((subsub) => (
                        <option key={subsub.id} value={subsub.id}>
                          ---- {subsub.name}
                        </option>
                      ))}
                    </React.Fragment>
                  ))}
                </React.Fragment>
              ))}
            </select> */}


            

          </div>
          <br />
          <p className="text-sm text-gray-600">
            Total Products:{" "}
            <span className="font-semibold text-blue-600">
              {filteredProducts.length}
            </span>
          </p>
        </div>


        {/* Loading */}
        { (loading || loadings || loadingcategory || loadingmanufacturer) && (
              <div className="flex justify-center items-center h-48">
                <Loader2 className="flex justify-center self-center h-4 w-4 animate-spin" />
                <span className="ml-2">Loading products...</span>
              </div>
            )}

        {/* Product Grid */}
        {!loading && !loadings && !loadingcategory && !loadingmanufacturer && (
          <div className="max-w-7xl mx-auto px-4 mt-10">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-4 gap-y-4">
              {filteredProducts.map((product) => (
                <ProductCardMain
                  key={product.id}
                  product={product}
                  showDiscount={
                    parseFloat(product.actual_price) >
                    parseFloat(product.sell_price)
                  }
                />
              ))}
            </div>
          </div>
        )}

        {/* No Products */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

function ProductCardMain({ product, showDiscount }) {
  const router = useRouter();
  return (
    <div className="flex flex-col sm-h-[250px] h-full min-h-[340px] bg-gray-50 rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 p-2 sm:p-3 lg:p-4">
      <div
        className="flex-1 flex flex-col cursor-pointer"
        onClick={() => router.push(`/dashboard/${product.product_code}`)}
      >
        <div className="relative mb-2 sm:mb-3 lg:mb-4">
          <ProductImageZoom
            imageUrl={product.image_url}
            alt={product.product_name}
          />
          {product.flash_sale === 1 && (
            <div className="absolute top-0 sm:top-0 right-1 sm:right-2 border-2 border-red-500 rounded-full bg-red-500 text-white text-xs px-1 sm:px-2 py-0.5 sm:py-0.5 animate-pulse">
              <span className="text-xs">Flash Sale</span>
            </div>
          )}
          {showDiscount && product.actual_price && (
            <div className="absolute top-8 sm:top-8 right-1 sm:right-2 bg-red-500 text-white text-xs px-1 sm:px-2 py-0.5 sm:py-0.5 animate-bounce rounded-2xl">
              OFFER
            </div>
          )}
        </div>
        <p className="text-[14px] text-gray-500 uppercase">{product.brand}</p>
        <h3 className="text-[14px] sm:text-sm font-medium text-gray-800 line-clamp-2 mb-1">
          {product.product_name}
        </h3>
        {/* <HtmlContent
          html={product.description}
          className="text-gray-500 text-[14px] mb-0.5 flex-grow line-clamp-1"
        /> */}
        {/* <HtmlDataConversion description={product.description} /> */}

        {!product.has_variations && (
          <div className="mt-2 justify-center">
            <div className="flex items-center space-x-1 sm:space-x-2 mb-0.5 cursor-pointer">
              {product.actual_price &&
                product.actual_price !== "0.00" &&
                parseFloat(product.actual_price) >
                parseFloat(product.sell_price) && (
                  <span className="text-[14px] text-gray-400 line-through">
                    Rs.{" "}
                    {Number(product.actual_price).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                )}
              <span className="text-[14px] sm:text-base font-bold text-red-600">
                Rs.{" "}
                {Number(product.sell_price).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        )}
      </div>

      {product.has_variations === 1 && (
        <div className="mt-auto w-full">
          <div className="mt-2 justify-center flex flex-col items-start">
            <span className="text-[16px] text-gray-400">Starting at</span>
            <span className="text-[14px] sm:text-base font-bold text-red-600">
              Rs.{" "}
              {Number(product.sell_price).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <ViewProducts product={product} />
        </div>
      )}

      {!product.has_variations &&
        product.stock_quantity > 0 &&
        product.available_quantity > 0 && (
          <>
            <div className="mt-auto w-full">
              <BuyNow product={product} />
            </div>
            <div className="mt-auto w-full">
              <AddToCart product={product} />
            </div>
          </>
        )}
      {product.stock_quantity === 0 &&
        product.available_quantity === 0 &&
        !product.has_variations && (
          <p className="font-semibold text-[18px] text-red-600">
            Out of stock !
          </p>
        )}
    </div>
  );
}

export default Page;
