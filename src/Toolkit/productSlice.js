import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bestProducts: [],
  filter: { category: "all" },
  page: 1,
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setFilter: (state, action) => {
      const { name, value } = action.payload;
      state.filter = { ...state.filter, [name]: value };
    },
    setBestProducts: (state, action) => {
      state.bestProducts = action.payload;
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
export const {
  setProducts,
  deleteProductState,
  setPage,
  updateProductState,
  setBestProducts,
  setFilter,
} = productsSlice.actions;
export default productsSlice.reducer;
