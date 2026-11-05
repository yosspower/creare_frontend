import axiosInstance from "./axiosInstance";

export const makeOrder = (
  items,
  shippingAddress = "",
  paymentMethod = "card",
) => {
  const payload = {
    items: items.map((item) => ({
      product_id: item.id,
      design: item.design ?? item.image ?? null,
      variants: item.variants,
      quantity: Number(item.quantity) || 1,
    })),
    shipping_address: shippingAddress,
    payment_method: paymentMethod,
  };

  return axiosInstance
    .post("/orders", payload)
    .then((res) => ({ ok: true, data: res.data }))
    .catch((error) => {
      console.log(error);
      return {
        ok: false,
        message: error.response?.data?.message || "Failed to place order",
      };
    });
};
