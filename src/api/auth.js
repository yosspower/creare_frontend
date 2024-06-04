import axiosInstance from "./axiosInstance";

// Products
export const CustomerLogin = (loginInfo) => {
  return axiosInstance
    .post("/auth/login", loginInfo)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      }
    });
};
export const getProfile = () => {
  return axiosInstance
    .get("/customers/me")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error);
      if (error.response) {
        return error.response.data;
      }
    });
};
export const CustomerRegister = (registerInfo) => {
  return axiosInstance
    .post("/auth/signup", registerInfo)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      }
    });
};
export const CustomerUpdate = (updatedInfo) => {
  const { id } = updatedInfo;
  return axiosInstance
    .put(`/customers/${id}`, updatedInfo)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response) {
        return error.response.data;
      }
    });
};
