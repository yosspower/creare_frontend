import axiosInstance from "./axiosInstance";

// Products
export const getAllProducts = () => {
  return axiosInstance
    .get("/products")
    .then((res) => res.data?.results ?? [])
    .catch((error) => {
      console.log(error.response);
      return [];
    });
};

// { category, pricemin, pricemax}
export const searchProducts = (filter, page) => {
  const queryFilter = Object.keys(filter)
    .filter(
      (key) =>
        filter[key] !== "" &&
        filter[key] != null &&
        !(key === "category" && filter[key] === "all"),
    )
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`,
    )
    .join("&");

  return axiosInstance
    .get(`/products/search?${queryFilter}&page=${page}`)
    .then((res) => {
      // the API can return either a plain array or a { count, products } object
      const data = res.data?.results ?? res.data ?? [];
      if (Array.isArray(data)) {
        return { products: data, count: data.length };
      }
      return { products: data.products ?? [], count: data.count ?? 0 };
    })
    .catch((error) => {
      console.log(error.response);
      return { products: [], count: 0 };
    });
};

export const getBestProducts = () => {
  return axiosInstance
    .get("/products/best")
    .then((res) => res.data?.results ?? [])
    .catch((error) => {
      console.log(error.response);
      return [];
    });
};

export const getProductBySlug = (slug) => {
  return axiosInstance
    .get(`/products/uni/${slug}`)
    .then((res) => res.data?.results ?? null)
    .catch((err) => {
      console.error(err.response);
      return null;
    });
};
