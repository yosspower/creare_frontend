import axiosInstance from "./axiosInstance";

// Products
export const getAllProducts = () => {
  return axiosInstance
    .get("/products")
    .then((res) => {
      return res.data.results;
    })
    .catch((error) => {
      console.log(error.response);
      alert("Error in fetching products");
    });
};

// { category, pricemin, pricemax}
export const searchProducts = (filter, page) => {
  const constructQueryString = (filter) => {
    return Object.keys(filter)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(filter[key])}`,
      )
      .join("&");
  };
  const queryFilter = constructQueryString(filter);
  console.log("page", page);
  return axiosInstance
    .get(`/products/search?${queryFilter}&&page=${page}`)
    .then((res) => {
      return res.data.results;
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const getBestProducts = () => {
  return axiosInstance
    .get("/products/best")
    .then((res) => {
      return res.data.results;
    })
    .catch((error) => {
      console.log(error.response);
    });
};

export const getProductBySlug = (slug) => {
  console.log(slug);
  return axiosInstance
    .get(`/products/uni/${slug}`)
    .then((res) => {
      return res.data.results;
    })
    .catch((err) => {
      console.error(err.response);
      alert("error getting product");
    });
};
