import axiosInstance from "./axiosInstance";

export const getAllCategories = () => {
  return axiosInstance
    .get("/categories")
    .then((res) => {
      return res.data.results;
    })
    .catch((error) => {
      console.log(error.response);
      alert("Error in fetching products");
    });
};
export const getOneCategories = (category) => {
  return axiosInstance
    .get(`/categories/uni/${category}`)
    .then((res) => {
      return res.data.results;
    })
    .catch((error) => {
      console.log(error);
      alert("Error in fetching category");
    });
};
