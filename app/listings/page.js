"use client";
import React, { useState, useMemo, useEffect } from "react";
import { ChevronDown, ShoppingCart, TicketPercent } from "lucide-react";
// import useCartStore from "@/stores/useCartStore";
// import useToastStore from "@/stores/toastStore";/
import useSelectedProductStore from "@/stores/sendingProduct";
// import { baseUrl } from "@/utils/config";
import { apiRequest } from "@/utils/ApiSafeCalls";
// import HtmlDataConversion from "@/components/HtmlDataConversion";
// import productRequest from "@/components/product";
import { useRouter } from "next/navigation";
import { AddToCart, ViewProducts } from "@/components/addtocartbutton";
// import { ProductCard } from "@/components/FeaturedProduct";
import ProductImageZoom from "@/components/ProductImageZoom";
import { BuyNow } from "@/components/BuyNow";
// import { HtmlContent } from "@/components/HtmlDataConversion";
import { Loader2 } from "lucide-react";
import WishListHeart from "@/components/WishListHeart";
import Link from "next/link";
import MultiLevelDropdown from "./CategoryDropdown";
import { useProductStore, useCategoryStore } from "@/stores/InitdataFetch";

const DentalSuppliesListing = () => {
  // const [products, setProducts] = useState([]);
  const { products, loading, error } = useProductStore();

  const { categories, loadingcategory, errorcategory } = useCategoryStore();
  const [loadings, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isReady, setIsReady] = useState(false);
  const [visibleCount, setVisibleCount] = useState(16); // Number of products to display initially
  var visibleProducts = [];
  // const [categories, setCategories] = useState([]);

  const [manufacturers, setManufacturers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [filterON, setfilterON] = useState(false);
  //  const [selected, setSelected] = useState(null);

  const CACHE_KEY = "productsCache";
  const CACHE_DURATION = 2 * 60 * 1000;
  // console.warn(`Base Api Url: ${baseUrl}`);

  // const API_URL = `${baseUrl}/products/latest`;

  //handle load more
  const handleLoadMore = () => {
    //update later
    // setOffset((prev) => prev + 6);
    setVisibleCount((prev) => prev + 8);
    // router.push("/product");
  };

  // Recursive mapper function

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

  // Fetch manufacturers
  const fetchManufacturers = async () => {
    const response = await apiRequest("/brands", false);
    if (response.success) {
      console.log("response.brands", response);
      const simplifiedBrands = response.brands.map((brand) => ({
        id: brand.id,
        brand_name: brand.brand_name,
      }));
      setManufacturers(simplifiedBrands);
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    fetchManufacturers();
  }, []);

  const router = useRouter();
  const setSelectedProduct = useSelectedProductStore(
    (state) => state.setSelectedProduct
  );

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    router.push(`/dashboard/${product.product_code}`);
  };
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.product_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    priceRange: "",
  });

  const [sortBy, setSortBy] = useState("price-low-high");

  // Get unique values for filter options
  // const categories = [...new Set(products.map((p) => p.category))];
  // const brands = [...new Set(products.map((p) => p.brand))];
  const priceRanges = [
    { label: "Under Rs.1000", min: 0, max: 1000 },
    { label: "Rs.1000 - Rs.5000", min: 1000, max: 5000 },
    { label: "Rs.5000 - Rs.10000", min: 5000, max: 10000 },
    { label: "Rs.10000 - Rs.50000", min: 10000, max: 50000 },
    { label: "Rs.50000 - Rs.100000", min: 50000, max: 100000 },
    { label: "Above Rs.100000", min: 100000, max: Infinity },
  ];

  // Collect all descendant ids of a category
  const getAllChildCategoryIds = (category) => {
    if (!category) return [];
    let ids = [category.id];
    category.children.forEach((child) => {
      ids = [...ids, ...getAllChildCategoryIds(child)];
    });
    return ids;
  };

  // Apply filters and sorting
  // const filteredAndSortedProducts = useMemo(() => {
  //   let filtered = products.filter((product) => {
  //     if (filters.category) {
  //       // find the category object first
  //       const findCategoryById = (cats, id) => {
  //         for (let c of cats) {
  //           if (String(c.id) === String(id)) return c;
  //           const found = findCategoryById(c.children || [], id);
  //           if (found) return found;
  //         }
  //         return null;
  //       };

  //       const selectedCat = findCategoryById(categories, filters.category);

  //       if (selectedCat) {
  //         const allowedIds = getAllChildCategoryIds(selectedCat);
  //         if (!allowedIds.includes(product.category_id)) {
  //           return false;
  //         }
  //       }
  //     }

  //     if (
  //       filters.brand &&
  //       product.brand.toLowerCase() !== filters.brand.toLowerCase()
  //     ) {
  //       return false;
  //     }

  //     if (filters.priceRange) {
  //       const priceRange = priceRanges.find(
  //         (range) => range.label === filters.priceRange
  //       );
  //       const price = parseFloat(product.sell_price);
  //       if (priceRange && (price < priceRange.min || price > priceRange.max)) {
  //         return false;
  //       }
  //     }

  //     return true;
  //   });

  //   // sorting
  //   filtered.sort((a, b) => {
  //     switch (sortBy) {
  //       case "price-low-high":
  //         return parseFloat(a.sell_price) - parseFloat(b.sell_price);
  //       case "price-high-low":
  //         return parseFloat(b.sell_price) - parseFloat(a.sell_price);
  //       case "name-a-z":
  //         return a.product_name.localeCompare(b.product_name);
  //       case "name-z-a":
  //         return b.product_name.localeCompare(a.product_name);
  //       default:
  //         return 0;
  //     }
  //   });

  //   return filtered;
  // }, [products, filters, sortBy, categories]);

  const categoryMap = useMemo(() => {
    const map = {};
    const fillMap = (cat) => {
      map[cat.id] = [cat.id, ...cat.children.flatMap((c) => fillMap(c))];
      return map[cat.id];
    };
    categories.forEach(fillMap);
    return map;
  }, [categories]);

  // Replace the filteredAndSortedProducts useMemo with this fixed version:

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      // ✅ ADD SEARCH TERM FILTERING (this was missing!)
      const matchesSearch =
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.product_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase());

      // ✅ Category filter using categoryMap
      const matchesCategory =
        !filters.category ||
        (categoryMap[filters.category] || []).includes(product.category_id);

      // ✅ Brand filter
      const matchesBrand =
        !filters.brand ||
        product.brand.toLowerCase() === filters.brand.toLowerCase();

      // ✅ Price range filter
      let matchesPrice = true;
      if (filters.priceRange) {
        const priceRange = priceRanges.find(
          (range) => range.label === filters.priceRange
        );
        const price = parseFloat(product.sell_price);
        matchesPrice =
          priceRange && price >= priceRange.min && price <= priceRange.max;
      }

      // Return true only if ALL conditions match
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });

    // ✅ Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low-high":
          return parseFloat(a.sell_price) - parseFloat(b.sell_price);
        case "price-high-low":
          return parseFloat(b.sell_price) - parseFloat(a.sell_price);
        case "name-a-z":
          return a.product_name.localeCompare(b.product_name);
        case "name-z-a":
          return b.product_name.localeCompare(a.product_name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, filters, sortBy, categoryMap, priceRanges]); // Added searchTerm to dependencies

  const handleFilterChange = (filterType, value) => {
    setfilterON(true);
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setfilterON(false);
    setFilters({
      category: "",
      brand: "",
      priceRange: "",
    });
    setSelectedCategory(null); 
  };
 

  const formatPrice = (price) => {
    return `Rs.${parseFloat(price).toFixed(2)}`;
  };

  const renderCategoryOptions = (categories, level = 0) => {
    return categories.flatMap((category) => [
      <option key={category.id} value={category.id}>
        {"— ".repeat(level)}
        {category.name}
      </option>,
      ...renderCategoryOptions(category.children, level + 1),
    ]);
  };

  // if (!isReady) return null; //check for persist zustand to load
  // if(loadingcategory) return  (
  //   <div className="flex justify-center items-center h-48">
  //         <Loader2 className=" flex justify-center self-center h-4 w-4 animate-spin" />
  //         </div>
  //         );

  return (
    <>
      <div className="max-w-7xl mx-auto sm:-ml-8 -my-3 sm:-my-4 lg:-my-6 p-2 sm:p-4 lg:p-6 ">
        {/* Header */}
        <div className="bg-gray-50 p-3 sm:p-4 lg:p-5 rounded-lg mb-3 sm:mb-4 lg:mb-5 shadow">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-900 mb-2 sm:mb-2.5">
            Browse Supplies Results
          </h1>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
            <span className="text-gray-600 text-sm sm:text-base">
              Showing dental supplies and equipment
            </span>
            {/* <div className="flex items-center w-full sm:w-auto">
              <span className="mr-2 m-1 text-sm">Sort by :</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none border border-gray-300 rounded-lg px-2 sm:px-4 py-1 sm:py-2 pr-6 sm:pr-8 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50 text-sm flex-1 sm:flex-none"
              >
                <option>Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Name: A to Z</option>
              </select>
            </div> */}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 sm:mb-8  pb-4 sm:pb-6 border-b">
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-2 sm:gap-4">
            <span className="text-gray-700 font-medium text-sm sm:text-base">
              Refine by:
            </span>

            {/* Category Filter */}
            {/* <div className="relative w-full sm:w-auto"> */}
              {/* <select
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
            className="appearance-none border border-gray-300 rounded-lg px-3 sm:px-4 py-2 pr-6 sm:pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm w-full sm:w-auto"
          >
            <option value="">All Categories</option>
            {categories.length === 0 ? (
              <option disabled>Loading...</option>
            ) : (
              renderCategoryOptions(categories)
            )}
          </select> */}
          <div className="relative w-full sm:w-auto flex flex-row  border-gray-300 rounded border-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent ">


              {/* <MultiLevelDropdown
                categories={categories}
               onSelect={(cat) => {
                    setSelectedCategory(cat); // set selected category state
                    handleFilterChange("category", cat.id); // apply your filter
                  }}
                selectedValue={filters.category} // Pass the current filter value
                placeholder="All Categories"
              /> */}
              
                <MultiLevelDropdown
                  categories={categories}
                  value={selectedCategory?.id || null} // Pass the selected category ID
                  onSelect={(cat) => {
                    setSelectedCategory(cat); // set selected category state
                    handleFilterChange("category", cat.id); // apply your filter
                  }}
                />
              {/* <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" /> */}
            </div>

            {/* Brand Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                value={filters.brand}
                onChange={(e) => handleFilterChange("brand", e.target.value)}
                className="appearance-none border border-gray-300 rounded-lg px-3 sm:px-4 py-2 pr-6 sm:pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm w-full sm:w-auto"
              >
                <option value="">All Brands</option>
                {manufacturers.map((brand) => (
                  <option key={brand.id} value={brand.brand_name}>
                    {brand.brand_name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Price Range Filter */}
            <div className="relative w-full sm:w-auto">
              <select
                value={filters.priceRange}
                onChange={(e) =>
                  handleFilterChange("priceRange", e.target.value)
                }
                className="appearance-none border border-gray-300 rounded-lg px-3 sm:px-4 py-2 pr-6 sm:pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 text-sm w-full sm:w-auto"
              >
                <option value="">All Prices</option>
                {priceRanges.map((range) => (
                  <option key={range.label} value={range.label}>
                    {range.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            {/* Clear Filters */}
            {(filters.category || filters.brand || filters.priceRange) && (
              <button
                onClick={clearFilters}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base w-full sm:w-auto text-left sm:text-center"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {(loading || loadings || loadingcategory) && (
          <div className="flex justify-center items-center h-48">
            <Loader2 className="flex justify-center self-center h-4 w-4 animate-spin" />
            <span className="ml-2">Loading products...</span>
          </div>
        )}

        {!loading &&
          !loadings &&
          !loadingcategory &&
          filteredAndSortedProducts.length > 0 && (
            <div>
              {/* Results Count */}
              <div className="mb-4 sm:mb-6">
                {/* <p className="text-gray-600 text-sm sm:text-base">
                Showing {visibleCount} products
              </p> */}
              </div>

              {/* Product Grid */}
              <div className="max-w-7xl mx-auto px-2 sm:px-4">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 sm-gap-x-6 gap-x-4 gap-y-4 ">
                  {filteredAndSortedProducts
                    .slice(0, visibleCount)
                    .map((product, index) =>
                      // product.has_variations ? null : 
                    (
                        <ProductCardMain
                          key={product.id || index}
                          product={product}
                          showDiscount={
                            parseFloat(product.actual_price) >
                            parseFloat(product.sell_price)
                          }
                        />
                      )
                    )}
                </div>
              </div>

              {/* load more */}
              {filteredAndSortedProducts.length > visibleCount && (
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleLoadMore}
                    className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Load More
                  </button>
                </div>
              )}

              {/* No Results */}
              {filteredAndSortedProducts.length === 0 && (
                <div className="text-center py-8 sm:py-12">
                  <p className="text-gray-500 text-base sm:text-lg">
                    No products found matching your filters.
                  </p>
                  <button
                    onClick={() => clearFilters}
                    className="mt-3 sm:mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                  >
                    Clear all filters to see all products
                  </button>
                </div>
              )}
            </div>
          )}
      </div>
    </>
  );
};

// Styled product card for main listing (copy style from featured, but only show main listing fields)
function ProductCardMain({ product, showDiscount }) {
  const router = useRouter();
  return (
    <div className="flex flex-col sm-h-[250px] h-full min-h-[340px] bg-gray-50 rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition-transform duration-300 p-2 sm:p-3 lg:p-4">
      <div className="flex-1 flex flex-col cursor-pointer">
        <div className="relative mb-2 sm:mb-3 lg:mb-4">
          <div className="absolute top-1  z-10 p-1 rounded-full bg-gray-50/70 backdrop-blur-sm  hover:scale-105 transition-transform duration-200">
            <WishListHeart product={product} />
          </div>

          <Link href={`/dashboard/${product.product_code}`}>
            <ProductImageZoom
              imageUrl={product.image_url}
              alt={product.product_name}
            />
          </Link>
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

        <Link href={`/dashboard/${product.product_code}`}>
          <>
            <p className="text-[14px] text-gray-500 uppercase">
              {product.brand}
            </p>
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
          </>
        </Link>
      </div>

      {product.has_variations === 1 && (
        <div className="mt-auto w-full">
          <div className="mt-2 justify-center flex flex-col items-start">
            <span className="text-[16px] text-gray-400">Starting at</span>
            <span className="text-[14px] sm:text-base font-bold text-red-600">
              Rs. {product.starting_price}
            </span>
          </div>
          <ViewProducts product={product} />
        </div>
      )}

      {!product.has_variations &&
        product.available_quantity > 0 &&
        product.stock_quantity > 0 && (
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

export default DentalSuppliesListing;
