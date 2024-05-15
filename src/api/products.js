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

export const addProduct = (product) => {
  return axiosInstance
    .post("/products", product)
    .then((res) => {
      return res.data.results;
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response);
        return err.response;
      }
      console.error(err);
    });
};

export const getProductBySlug = (slug) => {
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

export const updateProduct = (slug, updatedProduct) => {
  return axiosInstance
    .put(`/products/${slug}`, updatedProduct)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const { status } = err.response;
      if (status == 400) {
        alert("product does not exists");
      } else {
        alert("error updating product   ");
      }
    });
};

export const deleteProduct = (slug) => {
  return axiosInstance
    .delete(`/products/${slug}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err.response);
      alert("Error deleting the product");
    });
};
