import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
    updateProductState: (state, action) => {
      const index = state.data.findIndex(
        (product) => product.slug === action.payload.slug,
      );

      if (index !== -1) {
        state.data[index] = action.payload.product;
      }
    },
    deleteProductState: (state, action) => {
      const index = state.data.findIndex(
        (product) => product.slug === action.payload,
      );
      if (index !== -1) {
        state.data.splice(index, 1);
      }
    },
  },
});
export const { setProducts, deleteProductState, updateProductState } =
  productsSlice.actions;
export default productsSlice.reducer;
