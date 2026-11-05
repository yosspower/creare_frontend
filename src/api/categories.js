import axiosInstance from "./axiosInstance";

export const getAllCategories = () => {
  return axiosInstance
    .get("/categories")
    .then((res) => res.data?.results ?? [])
    .catch((error) => {
      console.log(error.response);
      return [];
    });
};

export const getOneCategories = (category) => {
  return axiosInstance
    .get(`/categories/uni/${encodeURIComponent(category)}`)
    .then((res) => res.data?.results ?? null)
    .catch((error) => {
      console.log(error);
      return null;
    });
};
