import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { Checkbox, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import { setFilter, setPage, setProducts } from "../../Toolkit/productSlice";
import { getAllProducts, searchProducts } from "../../api/products";
import { getAllCategories } from "../../api/categories";
import ProductsPlaceHolder from "../../components/placeholders/ProductsPlaceHolder";
import FilterSidebarPlaceholder from "../../components/placeholders/FilterSidebarPlaceholder";
export default function Shop() {
  const [categories, setCategories] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);
  const products = useSelector((state) => state.products.data);
  const { filter, page } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { products: productsList, count } = await searchProducts(
          filter,
          page,
        );
        const categoriesList = await getAllCategories();

        setCategories(categoriesList);
        setResultsCount(count);
        dispatch(setProducts(productsList));
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);

  const handleFilterChange = (event) => {
    dispatch(setFilter(event.target));
  };

  const applyFilter = async () => {
    dispatch(setPage(1));
    const { products: productsList, count } = await searchProducts(filter, 1);
    dispatch(setProducts(productsList));
    setResultsCount(count);
  };

  const handlePageChange = async (nextPage) => {
    const { products: productsList, count } = await searchProducts(
      filter,
      nextPage,
    );

    dispatch(setPage(nextPage));
    dispatch(setProducts(productsList));
    setResultsCount(count);
  };

  return (
    <>
      <div className="grid relative  lg:grid-cols-[300px_1fr] md:grid-cols-[200px_1fr] gap-8 px-4 md:px-6 mt-24 py-8">
        {categories.length > 0 ? (
          <div className="bg-white  rounded-lg shadow-md p-4 md:p-6 ">
            <h2 className="text-3xl font-bold  mb-4">Filters</h2>
            <div className="grid gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Category</h3>
                <div className="grid gap-2">
                  <label className="flex items-center gap-2 font-normal">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={filter.category === "all"}
                      onChange={handleFilterChange}
                      className="form-radio text-blue-600 focus:ring-blue-500"
                    />
                    All
                  </label>
                  {categories.map((category) => (
                    <label
                      className="flex items-center gap-2 font-normal"
                      key={category.id}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={filter.category === category.id}
                        onChange={handleFilterChange}
                        className="form-radio text-blue-600 focus:ring-blue-500"
                      />
                      {category.name}
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2 ">Price Range</h3>

                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-gray-700"
                      htmlFor="min-price"
                    >
                      Min Price
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        className="focus:ring-primary focus:border-primary block w-full pl-7 py-3 pr-12 sm:text-sm border-gray-300 rounded-md "
                        onChange={handleFilterChange}
                        value={filter.pricemin}
                        name="pricemin"
                        placeholder="0"
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      className="text-sm font-medium text-gray-700"
                      htmlFor="max-price"
                    >
                      Max Price
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        className="focus:ring-primary focus:border-primary py-3 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md  "
                        name="pricemax"
                        value={filter.pricemax}
                        placeholder="1000"
                        onChange={handleFilterChange}
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex ">
                <button
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-md font-medium rounded-sm shadow-sm text-white bg-[#1F2937]  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary w-full"
                  type="button"
                  onClick={applyFilter}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        ) : (
          <FilterSidebarPlaceholder />
        )}

        {/* filter placeholder  */}
        {Array.isArray(products) ? (
          products.length === 0 ? (
            <>
              <div class="flex flex-col gap-8">
                <div class="flex flex-col items-center justify-center gap-4 py-24">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-16 w-16 text-gray-400"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
                    <line x1="9" x2="9.01" y1="9" y2="9"></line>
                    <line x1="15" x2="15.01" y1="9" y2="9"></line>
                  </svg>
                  <h2 class="text-2xl font-bold">No Products Found</h2>
                  <p class="text-gray-500">
                    Sorry, we couldn't find any products that match your
                    selected filters. Please try adjusting your filters to see
                    more results.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="grid gap-10">
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  ">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="flex justify-center lg:text-end w-auto">
                <Pagination
                  current={page}
                  total={resultsCount}
                  pageSize={8}
                  size="meduim"
                  onChange={handlePageChange}
                />
              </div>
            </div>
          )
        ) : (
          <div className="grid grid-cols-2  lg:grid-cols-3   xl:grid-cols-4">
            <ProductsPlaceHolder />
          </div>
        )}
      </div>
    </>
  );
}
