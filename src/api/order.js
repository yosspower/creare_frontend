import axiosInstance from "./axiosInstance";

export const makeOrder = (items) => {
  return axiosInstance
    .post("/orders",{items})
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
        if (error.response) {
            return error.response.data
        }
     
      console.log(error.response);
      alert("Error in fetching products");
    });
};