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
